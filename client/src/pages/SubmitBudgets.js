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
  const [infoCards, setInfoCards] = useState([]);
  const [hasSubmitedInfo, setHasSubmitedInfo] = useState(false);
  const [clickEdit, setClickEdit] = useState(false);

  const [editCard, setEditCard] = useState({});
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
  ]);

  const [hasFinishedEdit, setHasFinishedEdit] = useState(false);
  const [valueVar, setValueVar] = useState(0);

  // State for the input
  const [task, setTask] = useState("");

  useEffect(() => {
    getInfoCards(); // this by itself causes an infinite loop but solve if useEffect is only called once
  }, [hasSubmitedInfo]);

  const updateFieldChanged = (index, e) => {
    console.log("index: " + index);
    console.log("property name: " + e.target.name);
    let newArr = [...editBudgets]; // copying the old datas array
    newArr[index].budget_amount = e.target.value; // replace e.target.value with whatever you want to change it to

    setEditBudgets(newArr); // ??
    console.log(editBudgets);
  };

  const changeTripBudgetAmount = (newvalue, key) => {
    // >>> NEW:
    // console.log(key, newvalue);
    // setEditCard((editCard) => ({
    //   // console.log("PREV STATE" + editBudgets.budgets);
    //   budgets: editCard.budgets.map((budget) =>
    //     budget.key === key ? { ...budget, budget_amount: newvalue } : budget
    //   ),
    // }));
    // console.log(editCard);
    // >>> OLD:
    console.log(key, newvalue);
    setEditBudgets((editBudgets) => ({
      // console.log("PREV STATE" + editBudgets.budgets);
      budgets: editBudgets.budgets.map((budget) =>
        budget.key === key ? { ...budget, budget_amount: newvalue } : budget
      ),
    }));
    console.log(editBudgets);
    setValueVar(newvalue);

    // TESTING:
    if (editBudgets && editCard) {
      editBudgets.budgets.map((element) => {
        console.log("Hello 0");

        editCard.budgets.map((budget) => {
          if (element.budget_category === budget.budget_category) {
            const valuebudgetEditable = element.budget_amount;
            console.log("Hello");
          } else {
            const valuebudgetEditable = 0;
            console.log("Hello 2");
          }
        });
      });
    }
  };
  const handleFinishEdit = (event) => {
    event.preventDefault();
  };
  const handlesubmitInfo = () => {
    setHasSubmitedInfo(!hasSubmitedInfo);
  };

  const handleClickEdit = (infoCard) => {
    console.log(infoCard);
    setClickEdit(true);
    setEditCard(infoCard);
    setEditTripName(infoCard.trip_name);
  };

  const getInfoCards = async () => {
    //repeated code >>>> I am getting the documents from the budget collection whith budgetService.js
    let res = await getAll();
    setInfoCards(res); //this does not work
    console.log("infoCardssss");
    console.log(res);
    console.log(infoCards);
  };

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
      {/* DELETE DIV LATER */}
      <div className="editable-component">
        {/* <Editable text={task} placeholder="Write a task name" type="input">
          <input
            type="text"
            name="task"
            placeholder="Write a task name"
            value={task} //state
            onChange={(e) => setTask(e.target.value)}
          />
        </Editable> */}
      </div>

      <div>
        {clickEdit && (
          <form
            className="info-form-edit"
            style={{ backgroundColor: "yellow" }}
            onSubmit={(e) => handleFinishEdit(e)}
          >
            {/* <Grid>
              <TextField
                id="Trip Name"
                color="secondary"
                label={"Trip Name" + ":" + editCard.trip_name}
                value={editCard.trip_name}
                onChange={(e) => setTripName(e.target.value)}
              />
            </Grid> */}
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
              //---BUG: valuebudgetEditable should be the value of budget_amount of the state editBudgets
              const valuebudgetEditable = 0;
              // if (editBudgets && editCard) {
              //   editBudgets.budgets.map((element) => {
              //     console.log("Hello 0");

              //     if (element.budget_category === budget.budget_category) {
              //       const valuebudgetEditable = element.budget_amount;
              //       console.log("Hello");
              //     } else {
              //       const valuebudgetEditable = 0;
              //       console.log("Hello 2");
              //     }
              //   });
              // }
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
                      value={budget.budget_category} //state
                      // onChange={(e) => setEditTripName(e.target.value)}
                    />
                  </Editable>
                  <Editable
                    text={
                      editBudgets[index].budget_amount || budget.budget_amount
                    }
                    // text={valueVar}
                    placeholder={
                      editBudgets[index].budget_amount || budget.budget_amount
                    }
                    type="input"
                  >
                    <input
                      type="text"
                      name="task"
                      placeholder="Write a task name"
                      // defaultValue={budget.budget_amount} //--BUG: this should be comming from editBudgetstate
                      // value={valuebudgetEditable}
                      value={
                        editBudgets[index].budget_amount === 0
                          ? budget.budget_amount
                          : editBudgets[index].budget_amount
                      }
                      onChange={
                        (e) => {
                          updateFieldChanged(index, e);
                        }
                        // changeTripBudgetAmount(
                        //   e.target.value,
                        //   budget.budget_category
                        // )
                      }
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

// Previous code

export default SubmitBudgetPage;
