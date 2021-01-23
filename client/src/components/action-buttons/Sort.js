import React, { useState } from "react";
// Material-ui
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
  const [sortType, setSortType] = useState("");

  //   functions:
  const handleSortClick = (event) => {
    setDisplayMenuItems(event.target);
  };

  const handleMenuClose = () => {
    setDisplayMenuItems(null);
  };

  const sortTransactions = (type) => {
    const sortedTransactions = [...props.transactions].sort(function (a, b) {
      if (type === "transaction_date") {
        return new Date(b[type]).getTime() - new Date(a[type]).getTime();
      } else {
        return b[type] - a[type];
      }
    });
    props.setTransactions(sortedTransactions);
  };

  const handleMenuItemclick = (sortType) => {
    handleMenuClose();
    sortTransactions(sortType);
    setSortType(sortType);
    props.clearFilters();
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

      <Menu
        anchorEl={displayMenuItems}
        open={Boolean(displayMenuItems)}
        onClose={handleMenuClose}
        elevation={1}
      >
        <MenuItem
          onClick={() => {
            handleMenuItemclick("transaction_value");
          }}
        >
          Transaction value
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuItemclick("transaction_date");
          }}
        >
          {" "}
          Transaction date{" "}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuItemclick("trip_name");
          }}
        >
          {" "}
          Trip Name{" "}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuItemclick("budget_category");
          }}
        >
          {" "}
          Budget Category{" "}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Sort;
