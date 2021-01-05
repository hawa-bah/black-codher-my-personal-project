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

  // State for the input
  const [task, setTask] = useState("");

  useEffect(() => {
    getInfoCards(); // this by itself causes an infinite loop but solve if useEffect is only called once
  }, [hasSubmitedInfo]);

  const handlesubmitInfo = () => {
    setHasSubmitedInfo(!hasSubmitedInfo);
  };

  const handleClickEdit = (infoCard) => {
    console.log(infoCard);
    setClickEdit(true);
    setEditCard(infoCard);
    setEditTripName(infoCard.trip_name);
    // BUG: this does not get displayed
    // return (
    //   <form
    //     className="info-form-edit"
    //     style={{ backgroungColor: "blue", position: "relative" }}
    //   >
    //     <Grid>
    //       <TextField
    //         id="Trip Name"
    //         color="secondary"
    //         label="Trip Name"
    //         value={infoCard.trip_name}
    //       />
    //     </Grid>
    //   </form>
    // );
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
      {/* DELETE LATER */}
      <div className="editable-component">
        <Editable text={task} placeholder="Write a task name" type="input">
          <input
            type="text"
            name="task"
            placeholder="Write a task name"
            value={task} //state
            onChange={(e) => setTask(e.target.value)}
          />
        </Editable>
      </div>
      <div>
        {clickEdit && (
          <form
            className="info-form-edit"
            style={{ backgroundColor: "yellow" }}
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
