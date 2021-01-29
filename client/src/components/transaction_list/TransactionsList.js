import React, { useState, useEffect } from "react";
import Moment from "react-moment";
// components
import Sort from "../action-buttons/Sort";
import Filter from "../action-buttons/Filter";
// services
import { getAll } from "../../services/transactionService";
import { deleteOne } from "../../services/transactionService";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const TransactionsList = (props) => {
  // >>> we are passing as props renderBalance() and others but only using the first
  const { auth } = props;

  const [transactions, setTransactions] = useState(null);

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (!transactions) {
      getTransactionsList();
    }
    if (props.hasSubmitedTransaction) {
      getTransactionsList();
      props.setHasSubmitedTransaction(false);
    }
  }, [props.hasSubmitedTransaction]);

  const getTransactionsList = async () => {
    let res = await getAll(auth.user.email);
    setTransactions(res);
  };
  // transaction is deleted from the database AND in the front end
  const deleteTransaction = async (transaction) => {
    await deleteOne(transaction);
    getTransactionsList(); //>>>>>>>>>>>>>>>>>>>>>> !!!! ask Tanya why we shouldn't make so may requests to the back-end
    props.setHasSubmitedTransaction(true);
  };

  const renderTransaction = (transaction) => {
    return (
      <>
        <div>{`${transaction.transaction_value}`}</div>
        <div>{`${transaction.description}`}</div>
        <div>
          <Moment format="DD/MM/yyyy">{`${transaction.transaction_date}`}</Moment>
        </div>
        <div>{` ${transaction.budget_category}`}</div>
        <div>{` ${transaction.trip_name}`}</div>
        {/* the button can be transformed to an icon later */}
        <div>
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => {
              deleteTransaction(transaction);
            }}
          ></Button>
        </div>
      </>
    );
  };
  // label is state, also the things that will be filtered
  const filterMethod = (categorySelected, tripSelected) => {
    setIsFiltered(true);
    filterTransactions(categorySelected, tripSelected);
  };

  const filterTransactions = (categorySelected, tripSelected) => {
    const filteredTransactions = (
      transactionsArray,
      categoriesSelectedArray,
      tripsSelectedArray
    ) => {
      const filteredCategories = transactionsArray.filter((el) => {
        return categoriesSelectedArray.indexOf(el.budget_category) >= 0;
      });

      const secondFilter = filteredCategories.filter((el) => {
        return tripsSelectedArray.indexOf(el.trip_name) >= 0;
      });
      return secondFilter;
    };
    const test = filteredTransactions(
      transactions,
      categorySelected,
      tripSelected
    );

    setFilteredTransactions(test);
  };

  const clearFilters = () => {
    setIsFiltered(false);
  };

  return (
    <div>
      <div className="filter-sort-actions-div">
        <Sort
          transactions={transactions}
          setTransactions={setTransactions}
          clearFilters={clearFilters}
        ></Sort>
        <Filter
          transactions={transactions}
          setTransactions={setTransactions}
          filterMethod={filterMethod}
          clearFilters={clearFilters}
        ></Filter>
      </div>

      <div className="transactions-container">
        <h5>Amount</h5>
        <h5>Description</h5>
        <h5>Date</h5>
        <h5>Category</h5>
        <h5>Trip</h5>
        <h5>Actions</h5>

        {transactions && transactions.length > 0 ? (
          isFiltered && filteredTransactions ? (
            filteredTransactions.length > 0 ? (
              filteredTransactions.map(
                (transaction) => renderTransaction(transaction) // this creates <li>
              )
            ) : (
              <p>There are no transactions matching the filters</p>
            )
          ) : (
            transactions.map((transaction) => renderTransaction(transaction))
          )
        ) : (
          <p>No transactions made</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
