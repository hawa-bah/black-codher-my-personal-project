import react, { useEffect, useState } from "react";
import axios from "axios";
import { deleteOne, getAll } from "../services/budgetService";

// Material-ui
import { Grid, MenuItem, TextField, Button } from "@material-ui/core";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import Editable from "../components/budgetInfo/Editable";
import SubmitInfoForm from "../components/budgetInfo/SubmitInfo";
// import DeleteInfoCard from "../components/budgetInfo/DeleteInfoCard";

// MATERIAL-UI:
const ButtonSubmitPage = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
    borderRadius: "20px",
    maxWidth: "fit-content",
    position: "left",
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
}));

const SubmitBudgetPage = (props) => {
  const classes = useStyles;
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
    let newArr = [...editBudgets]; // copying the old datas array
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
    let res = await getAll();
    setInfoCards(res);
    console.log("infoCardssss :");
    console.log(res);
    console.log(infoCards);
  }; //

  const renderInfoCard = (infoCard) => {
    return (
      <div className="info-card-item">
        <h2 style={{ position: "absolute" }}>{infoCard.trip_name}</h2>
        <ButtonSubmitPage
          variant="contained"
          color="primary"
          label=""
          className={classes.margin}
          startIcon={<EditIcon />}
          onClick={() => handleClickEdit(infoCard)}
        ></ButtonSubmitPage>
        <ButtonSubmitPage
          onClick={() => {
            setClickDelete(true);
            setCardToDelete(infoCard);
          }}
          style={{ background: "black" }}
          startIcon={<DeleteIcon />}
        />
        <h3>BUDGETS:</h3>
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
    );
  };

  return (
    <div>
      <div>
        {clickDelete && (
          <div>
            <h2>
              Are you sure you want to delete the card {cardToDelete.trip_name}?
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
          <div className="finished-edit-div">
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
        )}
        {clickEdit && (
          <form
            className="info-form-edit"
            style={{ backgroundColor: "yellow" }}
            onSubmit={(e) => handleFinishEdit(e)}
          >
            <Editable
              text={editTripName}
              placeholder="Write a task name"
              type="input"
            >
              <input
                type="text"
                name="task"
                placeholder="Write a task name"
                value={editTripName} //state
                onChange={(e) => setEditTripName(e.target.value)}
              />
            </Editable>

            {editCard.budgets.map((budget, index) => {
              return (
                <div>
                  <Editable
                    text={budget.budget_category}
                    placeholder="Write a task name"
                    type="input"
                  >
                    <input
                      type="text"
                      name="task"
                      placeholder="Write a task name"
                      value={budget.budget_category}
                    />
                  </Editable>
                  <Editable
                    text={
                      editBudgets[index].budget_amount || budget.budget_amount
                    }
                    placeholder={
                      editBudgets[index].budget_amount || budget.budget_amount
                    }
                    type="input"
                  >
                    <input
                      type="text"
                      name="task"
                      placeholder="Write a task name"
                      value={
                        !editBudgets[index].budget_amount
                          ? budget.budget_amount
                          : editBudgets[index].budget_amount
                      }
                      onChange={(e) => {
                        updateFieldChanged(index, e);
                      }}
                    />
                  </Editable>
                </div>
              );
            })}
            <button type="submit">Finish editing</button>
          </form>
        )}
      </div>
      <div className="submit-Info-button">
        <ButtonSubmitPage // to submit NEW info (not edit)
          onClick={() => setWantsToSubmitInfo(true)}
          startIcon={<AddIcon />}
        ></ButtonSubmitPage>
      </div>
      <div className="info-cards-container">
        {infoCards && infoCards.map((infoCard) => renderInfoCard(infoCard))}
      </div>
    </div>
  );
};

export default SubmitBudgetPage;
