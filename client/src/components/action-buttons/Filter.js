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

  return (
    <div>
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
        <MenuItem>Accomodation</MenuItem>
        <MenuItem>Transport</MenuItem>
        <MenuItem disabled={true}>Transaction Date</MenuItem>
        <MenuItem disabled={true}>Trip Name</MenuItem>
      </Menu>
    </div>
  );
};

export default Filter;
