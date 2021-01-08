import react, { useEffect, useState } from "react";
import axios from "axios";
import { getAll } from "../services/budgetService";

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

import Editable from "../components/budgetInfo/Editable";

// MATERIAL-UI:
const EditButton = withStyles((theme) => ({
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

  const [editCard, setEditCard] = useState({}); //>>>> the card we clicked to edit
  const [editTripName, setEditTripName] = useState("");
  const [editBudgets, setEditBudgets] = useState([
    {
      budget_category: "Accomodation",
      budget_amount: 0,
    },
    {
      budget_category: "Transport",
      budget_amount: 0,
    },
    {
      budget_category: "Food",
      budget_amount: 0,
    },
    {
      budget_category: "Others",
      budget_amount: 0,
    },
    {
      budget_category: "Shopping",
      budget_amount: 0,
    },
    {
      budget_category: "Entertainment",
      budget_amount: 0,
    },
  ]); //

  const [hasFinishedEdit, setHasFinishedEdit] = useState(false);

  useEffect(() => {
    getInfoCards(); // this by itself causes an infinite loop but solve if useEffect is only called once
  }, [hasSubmitedInfo, hasFinishedEdit]);

  const updateFieldChanged = (index, e) => {
    console.log("index: " + index);
    console.log("property name: " + e.target.name);
    let newArr = [...editBudgets]; // copying the old datas array
    newArr[index].budget_amount = e.target.value; // we are changing the values of the objects of editBudgets[] to the new values(e.target)
    if (newArr[index].budget_amount === 0) {
      newArr[index].budget_amount = editCard.budgets[index].budget_amount;
    }
    setEditBudgets(newArr); //
  }; //

  const handleFinishEdit = (event) => {
    event.preventDefault();
    const newArr = [...editBudgets];
    let index = 0;
    for (index = 0; index < editBudgets.length; index++) {
      if (newArr[index].budget_amount === 0) {
        newArr[index].budget_amount = editCard.budgets[index].budget_amount;
      }
    }
    setEditBudgets(newArr);

    axios.put(`/api/edit/card/${editCard._id}`, {
      trip_name: editTripName,
      budgets: editBudgets,
    });
    setHasFinishedEdit(!hasFinishedEdit);
  };
  const handlesubmitInfo = () => {
    setHasSubmitedInfo(!hasSubmitedInfo);
  };

  const handleClickEdit = (infoCard) => {
    console.log(infoCard);
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
        <EditButton
          variant="contained"
          color="primary"
          label=""
          className={classes.margin}
          startIcon={<EditIcon />}
          onClick={() => handleClickEdit(infoCard)}
        ></EditButton>

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
                        editBudgets[index].budget_amount === 0
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
      <div className="submit-Info-Form">
        <button onClick={() => handlesubmitInfo()}>
          Submit New Info (not to edit)
        </button>
      </div>
      <div className="info-cards-container">
        {infoCards && infoCards.map((infoCard) => renderInfoCard(infoCard))}
      </div>
    </div>
  );
};

export default SubmitBudgetPage;
