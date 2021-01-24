import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAll } from "../../services/budgetService.js";

import TransactionsList from "../transaction_list/TransactionsList";
import TransactionForm from "../expense_tab/TransactionForm";

import NumberFormat from "react-number-format";
import { Button, MenuItem } from "@material-ui/core";
// Material-ui
import budgetCategoriesArry from "../../budgetCategoriesArray";

import BudgetCategories from "../BudgetCatgories";
import "./BudgetPage.css";
import "../../App.css";
import { connect, useSelector } from "react-redux";

// >> for the transaction form, numeric input
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="£"
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const BudgetPage = (props) => {
  const auth = useSelector((state) => state.auth);

  // >>>> I'm passing transactions state (the value of a transaction) as a props

  const [viewTransactions, setViewTransactions] = useState(false); //>
  //>>>> The balance is the sum of those values with test for now
  const [hasSubmitedTransaction, setHasSubmitedTransaction] = useState(false);

  const [tripNameList, setTripNameList] = useState(null); // documents from the budget collection from a user

  useEffect(() => {
    if (!tripNameList) {
      getTripNameList();
    }
  }, [tripNameList]);

  const getTripNameList = async () => {
    //>>>> I am getting the documents from the budget collection whith budgetService.js
    let res = await getAll(auth.user.email);
    setTripNameList(res);
  };

  const renderTripNameList = (trip) => {
    return (
      <MenuItem key={trip.trip_name} value={trip.trip_name}>
        {trip.trip_name}
      </MenuItem>
    );
  };

  return (
    <div className="budgetPage-Div">
      <h1>Expense Tracker</h1>

      <TransactionForm
        hasSubmitedTransaction={hasSubmitedTransaction}
        setHasSubmitedTransaction={setHasSubmitedTransaction}
        auth={auth}
        tripNameList={tripNameList}
        renderTripNameList={renderTripNameList}
      />

      <div className="budget categories card">
        <BudgetCategories
          budgetCategoriesArry={budgetCategoriesArry}
          hasSubmitedTransaction={hasSubmitedTransaction}
          setHasSubmitedTransaction={setHasSubmitedTransaction}
          auth={auth}
          tripNameList={tripNameList}
          renderTripNameList={renderTripNameList}
        />
      </div>

      <div
        className="Transactions-div"
        style={{ padding: "20px", marginTop: "10px" }}
      >
        <h2 className="budgetPage-subtitle">TRANSACTIONS LIST</h2>

        <div className="button transaction">
          <Button onClick={() => setViewTransactions(!viewTransactions)}>
            <p>{viewTransactions ? "Click to Hide" : "Click to view"}</p>
          </Button>
        </div>

        <div className="transaction List">
          {viewTransactions ? (
            <div>
              <TransactionsList
                viewTransactions={viewTransactions}
                setViewTransactions={setViewTransactions}
                hasSubmitedTransaction={hasSubmitedTransaction}
                setHasSubmitedTransaction={setHasSubmitedTransaction}
                auth={auth}

                // renderBalance={renderBalance}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(BudgetPage);
