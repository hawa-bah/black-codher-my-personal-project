import React, { useState, useEffect } from "react";
// Material-ui
import Button from "@material-ui/core/Button";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@material-ui/icons/Sort";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Checkbox from "@material-ui/core/Checkbox";

import { getAll } from "../../services/budgetService";

// styling material-ui
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Filter = (props) => {
  const classes = useStyles();

  const [displayMenuItems, setDisplayMenuItems] = useState(null);

  const [tripNames, setTripNames] = useState(null);
  const [tripList, setTripList] = useState(null); //documents from the budget collection

  useEffect(() => {
    if (!tripList) {
      getTripList();
      console.log("heeeey");
    }
  }, [tripList]);

  const getTripList = async () => {
    //>>>> I am getting the documents from the budget collection whith budgetService.js
    let res = await getAll();
    console.log(res.map((item) => item.trip_name));
    let data = res.map((item) => item.trip_name); //array of trip names
    setTripNames(data);
    const stateTrip = data.reduce((a, b) => ((a[b] = false), a), {}); // we obtain an object
    console.log(stateTrip);
    setTripList(stateTrip);
  };

  //   functions:
  const handleFilterClick = (event) => {
    setDisplayMenuItems(event.target);
  };
  const handleMenuClose = () => {
    setDisplayMenuItems(null);
  };

  // with checkbox
  const [state, setState] = React.useState({
    Accomodation: true,
    Transport: false,
    Others: false,
  });

  // change it and make it seperately

  const { Accomodation, Transport, Others } = state;

  const handleChangeCategory = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeTrip = (event) => {
    setTripList({ ...tripList, [event.target.name]: event.target.checked });
  };

  const handleSubmitFilter = () => {
    console.log(tripList);
    const categorySelected = Object.keys(state).filter((item) => state[item]);
    const tripSelected = Object.keys(tripList).filter((item) => tripList[item]);
    //returns the array of the ones that are true
    console.log(tripSelected);

    props.filterMethod(categorySelected, tripSelected);
  };
  console.log(tripNames);
  return (
    <div>
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">choose category</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Accomodation}
                  onChange={handleChangeCategory}
                  name="Accomodation"
                />
              }
              label="Accomodation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Transport}
                  onChange={handleChangeCategory}
                  name="Transport"
                />
              }
              label="Transport"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Others}
                  onChange={handleChangeCategory}
                  name="Others"
                />
              }
              label="Others"
            />
          </FormGroup>
        </FormControl>
        <FormControl
          required
          //   error={error} // this will be used if we want a maximum of checkbox selected
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">Choose the trip</FormLabel>
          <FormGroup>
            {console.log(tripList)}
            {tripNames &&
              tripNames.map((trip) => (
                <FormControlLabel
                  control={<Checkbox onChange={handleChangeTrip} name={trip} />}
                  label={trip}
                />
              ))}
          </FormGroup>
        </FormControl>
        <ColorButton onClick={() => handleSubmitFilter()}>
          Submit Filters
        </ColorButton>
      </div>

      <ColorButton
        variant="contained"
        color="primary"
        className={classes.margin}
        startIcon={<SortIcon />}
        onClick={handleFilterClick}
      >
        Filter
      </ColorButton>

      <Menu
        open={Boolean(displayMenuItems)}
        onClose={handleMenuClose}
        elevation={1}
        anchorEl={displayMenuItems}
      >
        <MenuItem disabled={true}>Category</MenuItem>
        <MenuItem
          onClick={() => props.filterMethod("budget_category", "Accomodation")}
        >
          {"  "}
          Accomodation
          {"  "}
        </MenuItem>
        <MenuItem
          onClick={() => props.filterMethod("budget_category", "Transport")}
        >
          Transport
        </MenuItem>
        <MenuItem disabled={true}>Transaction Date</MenuItem>
        <MenuItem disabled={true}>Trip Name</MenuItem>
        <MenuItem onClick={() => props.filterMethod("trip_name", "Paris")}>
          Paris
        </MenuItem>
        <MenuItem onClick={() => props.filterMethod("trip_name", "Italy")}>
          Italy
        </MenuItem>
        {/* put a third paramenter for the trip name, put null  */}
        <MenuItem onClick={() => props.clearFilters()}>
          Clear all filters
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Filter;
