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

const Sort = (props) => {
  const classes = useStyles();

  const [displayMenuItems, setDisplayMenuItems] = useState(null);

  //   functions:
  const handleSortClick = (event) => {
    setDisplayMenuItems(event.target);
  };

  return (
    <div>
      <ColorButton
        variant="contained"
        color="primary"
        className={classes.margin}
        startIcon={<SortIcon />}
        onClick={handleSortClick}
      >
        Sort
      </ColorButton>

      <Menu>
        <MenuItem>Transaction Date</MenuItem>
      </Menu>
    </div>
  );
};

export default Sort;
