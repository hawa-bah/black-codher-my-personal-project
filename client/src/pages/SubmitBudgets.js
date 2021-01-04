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

  const [tripName, setTripName] = useState("");

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
    // return (
    //   <form className="info-form-edit" style={{ position: "relative" }}>
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
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   handleSubmitBudget();
  // }

  // function handleSubmitBudget() {
  //   const array = [];
  //   const obj = {
  //     budget_category: budget,
  //     budget_amount: budgetAmount,
  //   };
  //   budgetArray.push(obj);
  //   setBudgetArray(budgetArray);
  //   console.log(budgetArray);
  // }

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
      <div>
        {clickEdit && (
          <form
            className="info-form-edit"
            style={{ backgroundColor: "yellow" }}
          >
            <Grid>
              <TextField
                id="Trip Name"
                color="secondary"
                label={"Trip Name" + ":" + editCard.trip_name}
                value={editCard.trip_name}
                onChange={(e) => setTripName(e.target.value)}
              />
            </Grid>
          </form>
        )}
      </div>
      <div className="submit-Info-Form">
        <button onClick={() => handlesubmitInfo()}>Submit Info</button>
      </div>
      <div className="info-cards-container">
        {infoCards && infoCards.map((infoCard) => renderInfoCard(infoCard))}
      </div>
    </div>
  );
};

// Previous code

export default SubmitBudgetPage;
