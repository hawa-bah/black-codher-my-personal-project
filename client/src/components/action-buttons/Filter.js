import React, { useState, useEffect } from "react";
// Material-ui
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import SortIcon from "@material-ui/icons/Sort";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormatHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import { getAll } from "../../services/budgetService";
import { connect, useSelector } from "react-redux";

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

  const auth = useSelector((state) => state.auth);

  const [tripNames, setTripNames] = useState(null);
  const [tripList, setTripList] = useState(null); //documents from the budget collection

  const [errorTrip, setErrorTrip] = useState(true);

  useEffect(() => {
    if (!tripList) {
      getTripList();
    } else {
      getErrorMessage();
    }
  }, [tripList]);

  const getTripList = async () => {
    //>>>> I am getting the documents from the budget collection whith budgetService.js
    let res = await getAll(auth.user.email);
    let data = res.map((item) => item.trip_name); // array of trip names
    setTripNames(data);

    const stateTrip = data.reduce((a, b) => ((a[b] = false), a), {}); // we obtain an object
    setTripList(stateTrip); // TripList is now the state of the trips
  };

  const getErrorMessage = () => {
    let errorNumber = Object.values(tripList).reduce((a, item) => a + item, 0); // >>> counting how many trips have been selected
    let errorTrip = errorNumber < 1;
    setErrorTrip(errorTrip);
  };

  // with checkbox
  // >>> defining the state of categories
  const [state, setState] = React.useState({
    Accomodation: true,
    Transport: false,
    Food: false,
    Shopping: false,
    Entertainment: false,
    Others: false,
  });

  // object destructuring of categories
  const {
    Accomodation,
    Transport,
    Food,
    Shopping,
    Entertainment,
    Others,
  } = state;
  const error =
    [Accomodation, Transport, Food, Shopping, Entertainment, Others].filter(
      (v) => v
    ).length < 1;

  const handleChangeCategory = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeTrip = (event) => {
    setTripList({ ...tripList, [event.target.name]: event.target.checked });
  };

  const handleSubmitFilter = () => {
    const categorySelected = Object.keys(state).filter((item) => state[item]);
    const tripSelected = Object.keys(tripList).filter((item) => tripList[item]);
    //returns the array of the ones that are true

    props.filterMethod(categorySelected, tripSelected);
  };
  return (
    <div>
      <div className={classes.root}>
        <FormControl
          required
          error={error}
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">Choose a category</FormLabel>
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
                  checked={Food}
                  onChange={handleChangeCategory}
                  name="Food"
                />
              }
              label="Food"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Shopping}
                  onChange={handleChangeCategory}
                  name="Shopping"
                />
              }
              label="Shopping"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Entertainment}
                  onChange={handleChangeCategory}
                  name="Entertainment"
                />
              }
              label="Entertainment"
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
          <FormatHelperText>
            Select at least one category to use the filter
          </FormatHelperText>
        </FormControl>

        <FormControl
          required
          error={errorTrip} // this will be used if we want a maximum of checkbox selected
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend">Choose the trip</FormLabel>
          <FormGroup>
            {tripNames &&
              tripNames.map((trip) => (
                <FormControlLabel
                  control={<Checkbox onChange={handleChangeTrip} name={trip} />}
                  label={trip}
                />
              ))}
          </FormGroup>
          <FormatHelperText>
            Select at least one trip to use the filter
          </FormatHelperText>
        </FormControl>
        <ColorButton
          variant="contained"
          color="primary"
          className={classes.margin}
          startIcon={<SortIcon />}
          onClick={() => handleSubmitFilter()}
        >
          Submit Filters
        </ColorButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Filter);
