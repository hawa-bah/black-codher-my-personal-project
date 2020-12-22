import React, { useState } from "react";
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
    Paris: false,
    Italy: false,
  });
  const { Accomodation, Transport, Others, Paris, Italy } = state;
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmitFilter = () => {
    props.filterMethod(Object.keys(state).filter((item) => item === item.true));
  };

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
                  onChange={handleChange}
                  name="Accomodation"
                />
              }
              label="Accomodation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Transport}
                  onChange={handleChange}
                  name="Transport"
                />
              }
              label="Transport"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Others}
                  onChange={handleChange}
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={Paris}
                  onChange={handleChange}
                  name="Paris"
                />
              }
              label="Paris"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Italy}
                  onChange={handleChange}
                  name="Italy"
                />
              }
              label="Italy"
            />
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
