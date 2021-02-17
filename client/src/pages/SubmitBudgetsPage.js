import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { deleteOne, getAll } from "../services/budgetService";

// Material-ui
import { Button, IconButton } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import Editable from "../components/budgetInfo/Editable";
import SubmitInfoForm from "../components/budgetInfo/SubmitInfo";
import { useSelector } from "react-redux";

import "../stylesheets/InfoForm.css";
// MATERIAL-UI:
const ButtonSubmitPage = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
    borderRadius: "30px",
    marginRight: "10px",
  },
}))(Button);

const SubmitBudgetPage = (props) => {
  const auth = useSelector((state) => state.auth);

  const [infoCards, setInfoCards] = useState([]); //>>>> the cards stored in the database will be saved here to display them later
  const [hasSubmitedInfo, setHasSubmitedInfo] = useState(false);

  const [clickEdit, setClickEdit] = useState(false);
  const [hasClickedFinishEdit, setHasClickedFinishEdit] = useState(false);
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

  const getInfoCards = useCallback(async () => {
    // >>>> I am getting the documents from the budget collection whith budgetService.js
    let res;
    if (auth.user.email) {
      res = await getAll(auth.user.email);
    } else {
      res = await getAll();
    }
    setInfoCards(res);
  }, [auth.user.email]);

  useEffect(() => {
    getInfoCards();
  }, [hasSubmitedInfo, hasClickedFinishEdit, hasDeleted, getInfoCards]);

  const handleDelete = async (cardToDelete) => {
    setHasDeleted(!hasDeleted);
    await deleteOne(cardToDelete._id);
  };

  const updateFieldChanged = (index, e) => {
    let newArr = [...editBudgets]; // copying the old data array
    newArr[index].budget_amount = e.target.value; // we are changing the values of the objects of editBudgets[] to the new values(e.target)
    if (!newArr[index].budget_amount) {
      newArr[index].budget_amount = editCard.budgets[index].budget_amount;
    }
    setEditBudgets(newArr); //
  }; //

  const handleFinishEdit = () => {
    // event.preventDefault();
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

    axios.put(
      `/api/edit/transactions/${editCard.trip_name}/${auth.user.email}`,
      {
        trip_name: editTripName,
      }
    );

    getInfoCards();
  };

  const handleClickEdit = (infoCard) => {
    setClickEdit(true);
    setEditCard(infoCard);
    setEditTripName(infoCard.trip_name);
  }; //

  const renderInfoCard = (infoCard) => {
    let totalBudget = 0;
    return (
      <div className="info-card-item">
        <div className="info-card-header">
          <div>
            <p className="info-card-title">{infoCard.trip_name}</p>
          </div>
          <div className="action-buttons-infoCard">
            <IconButton
              style={{ background: "purple" }}
              onClick={() => handleClickEdit(infoCard)}
            >
              <EditIcon style={{ color: "white" }} fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                setClickDelete(true);
                setCardToDelete(infoCard);
              }}
              style={{ background: "black" }}
            >
              <DeleteIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
          </div>
        </div>

        <h5>BUDGETS:</h5>
        <p>
          Total:{" "}
          {infoCard.budgets &&
            infoCard.budgets.forEach((item) => {
              totalBudget = totalBudget + item.budget_amount;
            })}{" "}
          {totalBudget}
        </p>
        <div className="info-card budget-list">
          {infoCard.budgets &&
            infoCard.budgets.map((item) => {
              totalBudget = totalBudget + item.budget_amount;
              return (
                <div>
                  <p>{item.budget_category}:</p>
                  <p>{item.budget_amount}</p>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div className="SubmitBudgetPage-div">
      <div>
        {clickDelete && (
          <div className="pop-up dialog-parent">
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

        {hasClickedFinishEdit && (
          /* {hasFinishedEdit && ( */
          <div className="pop-up dialog-parent">
            <div
              className="finished-edit-div pop-up dialog"
              style={{
                zIndex: 4,
                position: "absolute",
                backgroundColor: "white",
              }}
            >
              <h2>Do you want to apply the new changes?</h2>
              <div className="finished-edit-buttons">
                <ButtonSubmitPage
                  onClick={() => {
                    handleFinishEdit();
                    setHasClickedFinishEdit(false);
                    setClickEdit(false);
                  }}
                >
                  YES
                </ButtonSubmitPage>
                <ButtonSubmitPage
                  onClick={() => {
                    setHasClickedFinishEdit(false);
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
              onSubmit={(e) => {
                e.preventDefault();
                setHasClickedFinishEdit(true);
              }}
            >
              <div className="info-card-item edit">
                <Editable
                  text={editTripName}
                  className="info-card-title"
                  type="input"
                >
                  <input
                    type="text"
                    name="trip"
                    value={editTripName} //state
                    style={{ maxWidth: "200px" }}
                    onChange={(e) => setEditTripName(e.target.value)}
                  />
                </Editable>

                <h5>BUDGETS:</h5>
                <div className="info-card budget-list">
                  {editCard.budgets.map((budget, index) => {
                    return (
                      <div>
                        <b>{budget.budget_category}</b>

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
                            type="number"
                            name="amount"
                            placeholder="Input a new amount"
                            style={{ maxWidth: "140px" }}
                            onChange={(e) => {
                              updateFieldChanged(index, e);
                            }}
                          />
                        </Editable>
                      </div>
                    );
                  })}
                </div>
                <div className="buttons">
                  <ButtonSubmitPage type="submit">
                    Finish editing
                  </ButtonSubmitPage>
                  <ButtonSubmitPage
                    type="cancel"
                    style={{
                      backgroundColor: "grey",
                    }}
                    onClick={() => setClickEdit(false)}
                  >
                    Cancel
                  </ButtonSubmitPage>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="top">
        <h1>Your plans</h1>
        <div className="submit-Info-button">
          <ButtonSubmitPage // to submit NEW info (not edit)
            onClick={() => setWantsToSubmitInfo(true)}
            startIcon={<AddIcon />}
          ></ButtonSubmitPage>
        </div>
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
