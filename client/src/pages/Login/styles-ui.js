import { makeStyles } from "@material-ui/core/styles";

// Mmeterial-ui
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  button: {
    margin: "40px",
  },
  row: {
    margin: "5rem",
    maxWidth: "300px",
  },
  form: {
    padding: 20,
    margin: "auto",
    marginBottom: "20px",
    maxWidth: 300,
  },
}));

export default useStyles;
