import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteOne, getAll } from "../services/budgetService";

// Material-ui
import { Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import Editable from "../components/budgetInfo/Editable";
import SubmitInfoForm from "../components/budgetInfo/SubmitInfo";
import { useSelector } from "react-redux";

import "../components/budgetInfo/InfoForm.css";
// MATERIAL-UI:
const ButtonSubmitPage = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
    borderRadius: "30px",
    // maxWidth: "10px",
    // width: "10px",
    // position: "left",
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
}));

const SubmitBudgetPage = (props) => {
  const auth = useSelector((state) => state.auth);

  const classes = useStyles;

  const [task, setTask] = useState("something");
  const [infoCards, setInfoCards] = useState([]); //>>>> the cards stored in the database will be saved here to display them later
  const [hasSubmitedInfo, setHasSubmitedInfo] = useState(false);

  const [clickEdit, setClickEdit] = useState(false);
  const [hasFinishedEdit, setHasFinishedEdit] = useState(false);
  const [wantsToSubmitInfo, setWantsToSubmitInfo] = useState(false); //>>>>pop up message to confirm if the user wants to continue editing

  const [clickDelete, setClickDelete] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [hasDeleted, setHasDeleted] = useState(false);

  const [editCard, setEditCard] = useState({}); //>>>> the card we clicked to edit
  const [editTripName, setEditTripName] = useState("");
  const [editBudgets, setEditBudgets] = useState([
    {
      budget_category: "Accomodation",
      budget_amount: null,
    },
    {
      budget_category: "Transport",
      budget_amount: null,
    },
    {
      budget_category: "Food",
      budget_amount: null,
    },
    {
      budget_category: "Others",
      budget_amount: null,
    },
    {
      budget_category: "Shopping",
      budget_amount: null,
    },
    {
      budget_category: "Entertainment",
      budget_amount: null,
    },
  ]); //

  useEffect(() => {
    getInfoCards(); // this by itself causes an infinite loop but solve if useEffect is only called once
  }, [hasSubmitedInfo, hasFinishedEdit, hasDeleted]);

  const handleDelete = async (cardToDelete) => {
    setHasDeleted(!hasDeleted);
    await deleteOne(cardToDelete._id);
    console.log("transaction deleted ", cardToDelete.trip_name);
  };

  const updateFieldChanged = (index, e) => {
    console.log("index: " + index);
    console.log("property name: " + e.target.name);
    let newArr = [...editBudgets]; // copying the old data array
    newArr[index].budget_amount = e.target.value; // we are changing the values of the objects of editBudgets[] to the new values(e.target)
    if (!newArr[index].budget_amount) {
      newArr[index].budget_amount = editCard.budgets[index].budget_amount;
    }
    setEditBudgets(newArr); //
  }; //

  const handleFinishEdit = (event) => {
    event.preventDefault();
    const newArr = [...editBudgets];
    let index = 0;
    for (index = 0; index < editBudgets.length; index++) {
      if (!newArr[index].budget_amount) {
        newArr[index].budget_amount = editCard.budgets[index].budget_amount;
      }
    }
    setEditBudgets(newArr);

    axios.put(`/api/edit/card/${editCard._id}`, {
      trip_name: editTripName,
      budgets: editBudgets,
    });
    setHasFinishedEdit(true);
  };

  const handleClickEdit = (infoCard) => {
    console.log("CARD TO EDIT:" + infoCard);
    setClickEdit(true);
    setEditCard(infoCard);
    setEditTripName(infoCard.trip_name);
  }; //

  const getInfoCards = async () => {
    //repeated code >>>> I am getting the documents from the budget collection whith budgetService.js
    let res;
    if (auth.user.email) {
      res = await getAll(auth.user.email);
    } else {
      res = await getAll();
    }
    setInfoCards(res);
    console.log("infoCardssss :");
    console.log(res);
    console.log(infoCards);
  }; //

  const renderInfoCard = (infoCard) => {
    return (
      <div className="info-card-item">
        <div className="info-card-header">
          <div>
            <p className="info-card-title">{infoCard.trip_name}</p>
          </div>
          <div className="action-buttons-infoCard">
            <ButtonSubmitPage
              variant="contained"
              color="primary"
              label=""
              className={classes.margin}
              startIcon={<EditIcon />}
              size="small"
              onClick={() => handleClickEdit(infoCard)}
            ></ButtonSubmitPage>
            <ButtonSubmitPage
              onClick={() => {
                setClickDelete(true);
                setCardToDelete(infoCard);
              }}
              size="small"
              style={{ background: "black" }}
              startIcon={<DeleteIcon />}
            />
          </div>
        </div>
        <h5>BUDGETS:</h5>
        <div className="info-card budget-list">
          {infoCard.budgets &&
            infoCard.budgets.map((item) => {
              return (
                <div>
                  <p>
                    {item.budget_category}: {item.budget_amount}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        {clickDelete && (
          <div class="pop-up dialog-parent">
            <div
              className="pop-up dialog"
              style={{
                zIndex: 1,
                position: "absolute",
                backgroundColor: "white",
              }}
            >
              <h2>
                Are you sure you want to delete the card{" "}
                {cardToDelete.trip_name}?
              </h2>
              <ButtonSubmitPage onClick={() => setClickDelete(false)}>
                Cancel
              </ButtonSubmitPage>
              <ButtonSubmitPage
                style={{ background: "grey" }}
                onClick={() => {
                  setClickDelete(false);
                  handleDelete(cardToDelete);
                }}
              >
                Yes
              </ButtonSubmitPage>
            </div>
          </div>
        )}
        {wantsToSubmitInfo && (
          <SubmitInfoForm
            hasSubmitedInfo={hasSubmitedInfo}
            setHasSubmitedInfo={setHasSubmitedInfo}
            wantsToSubmitInfo={wantsToSubmitInfo}
            setWantsToSubmitInfo={setWantsToSubmitInfo}
          />
        )}

        {hasFinishedEdit && (
          <div class="pop-up dialog-parent">
            <div
              className="finished-edit-div pop-up dialog"
              style={{
                zIndex: 4,
                position: "absolute",
                backgroundColor: "white",
              }}
            >
              <h2>
                {" "}
                The card has been succesfully updated! Do you want to continue
                editing the card?
              </h2>
              <div className="finished-edit-buttons">
                <ButtonSubmitPage onClick={() => setHasFinishedEdit(false)}>
                  YES
                </ButtonSubmitPage>
                <ButtonSubmitPage
                  onClick={() => {
                    setHasFinishedEdit(false);
                    setClickEdit(false);
                  }}
                >
                  NO
                </ButtonSubmitPage>
              </div>
            </div>
          </div>
        )}

        <div>
          {clickEdit && (
            <form
              className="info-form-edit"
              onSubmit={(e) => handleFinishEdit(e)}
            >
              <div className="info-card-item edit">
                <Editable
                  text={editTripName}
                  className="info-card-title"
                  // placeholder="Write a task name"
                  type="input"
                >
                  <input
                    type="text"
                    name="task"
                    // placeholder="Write a task name"
                    value={editTripName} //state
                    onChange={(e) => setEditTripName(e.target.value)}
                  />
                </Editable>

                <h5>BUDGETS:</h5>
                <div className="info-card budget-list">
                  {editCard.budgets.map((budget, index) => {
                    return (
                      <div>
                        <Editable text={budget.budget_category} type="text">
                          <input
                            type="text"
                            name="task"
                            placeholder="Write a task name"
                            value={budget.budget_category}
                          />
                        </Editable>
                        <Editable
                          text={
                            editBudgets[index].budget_amount ||
                            budget.budget_amount
                          }
                          placeholder={
                            editBudgets[index].budget_amount ||
                            budget.budget_amount
                          }
                          type="input"
                        >
                          <input
                            type="text"
                            name="task"
                            placeholder="Input an amount"
                            // value={
                            //   editBudgets[index].budget_amount //the one the user inputs
                            //     ? editBudgets[index].budget_amount
                            //     : budget.budget_amount //this is already set
                            // }
                            onChange={(e) => {
                              updateFieldChanged(index, e);
                            }}
                          />
                        </Editable>
                        {/* <Editable
                          text={task}
                          placeholder="Write a task name"
                          type="input"
                        >
                          <input
                            type="text"
                            name="task"
                            placeholder="Write a task name"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                          />
                        </Editable> */}
                      </div>
                    );
                  })}
                </div>
                <button type="submit">Finish editing</button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div>
        <h2>Your plans</h2>
      </div>
      <div className="submit-Info-button">
        <ButtonSubmitPage // to submit NEW info (not edit)
          onClick={() => setWantsToSubmitInfo(true)}
          startIcon={<AddIcon />}
        ></ButtonSubmitPage>
      </div>
      <div className="info-cards-container">
        {infoCards.length === 0 ? (
          <div>
            <h4>
              click the button
              <ButtonSubmitPage // to submit NEW info (not edit)
                onClick={() => setWantsToSubmitInfo(true)}
                startIcon={<AddIcon />}
              ></ButtonSubmitPage>{" "}
              to create your first card
            </h4>
          </div>
        ) : null}
        <div className="info-cards container">
          {infoCards && infoCards.map((infoCard) => renderInfoCard(infoCard))}
        </div>
      </div>
    </div>
  );
};

export default SubmitBudgetPage;
