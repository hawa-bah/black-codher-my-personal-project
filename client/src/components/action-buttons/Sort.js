import React from 'react'
// Material-ui
import Button from "@material-ui/core/Button";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {  purple } from '@material-ui/core/colors';

import Menu from  "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@material-ui/icons/Sort";



const Sort = (props) =>{
    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(purple[500]),
          backgroundColor: purple[500],
          '&:hover': {
            backgroundColor: purple[700],
          },
        },
      }))(Button);

      const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
      }));
      const classes = useStyles();
return(
    <div>
        <ColorButton variant="contained" color="primary" className={classes.margin} startIcon={<SortIcon />}>
        Sort
      </ColorButton>

    </div>
)
}

export default Sort