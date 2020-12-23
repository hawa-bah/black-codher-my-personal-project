import React, { useState, useEffect } from "react";
// components
import Sort from "../action-buttons/Sort";
import Filter from "../action-buttons/Filter";
// services
import { getAll } from "../../services/transactionService";
// import { deleteOne } from "../../services/userService";
import { deleteOne } from "../../services/transactionService";

const TransactionsList = (props) => {
  // >>> we are passing as props renderBalance() and others but only using the first
  const [transactions, setTransactions] = useState(null);

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterLabel, setFilterLabel] = useState([]);
  const [filterValue, setFilterValue] = useState([]);

  useEffect(() => {
    if (!transactions) {
      getTransactionsList();

      console.log("heeeey transactions");
    }
    if (props.hasSubmitedTransaction) {
      getTransactionsList();
      console.log("heeeey has submited");
      props.setHasSubmitedTransaction(false);
    }
  }, [props.hasSubmitedTransaction]);

  const getTransactionsList = async () => {
    let res = await getAll();
    setTransactions(res);
  };
  // transaction is deleted from the database AND in the front end
  const deleteTransaction = async (transaction) => {
    await deleteOne(transaction);
    getTransactionsList(); //>>>>>>>>>>>>>>>>>>>>>> !!!! ask Tanya why we shouldn't make so may requests to the back-end
    // setTransactions(res);
    props.setHasSubmitedTransaction(!props.hasSubmitedTransaction);
    props.setHasSubmitedTransaction(!props.hasSubmitedTransaction);
  };

  const renderTransaction = (transaction) => {
    return (
      <li key={transaction._id}>
        <h3>
          {`${transaction.transaction_value} 
          ${transaction.description}
          ${transaction.transaction_date}
          ${transaction.budget_category}
          ${transaction.trip_name}`}
          {/* the button can be transformed to an icon later */}
          <button
            onClick={() => {
              deleteTransaction(transaction);
              // props.renderBalance();
            }}
          >
            Delete
          </button>
        </h3>
      </li>
    );
  };
  // label is state, also the things that will be filtered
  const filterMethod = (categorySelected, tripSelected) => {
    setIsFiltered(true);

    // setFilterLabel(label);
    // setFilterValue(value);
    filterTransactions(categorySelected, tripSelected);
  };

  const filterTransactions = (categorySelected, tripSelected) => {
    const filteredTransactions = (
      transactionsArray,
      categoriesSelectedArray,
      tripsSelectedArray
    ) => {
      const filtered = transactionsArray.filter((el) => {
        console.log(categoriesSelectedArray, tripsSelectedArray, el);
        return categoriesSelectedArray.indexOf(el.budget_category) >= 0;
      });
      return filtered;
    };
    const test = filteredTransactions(
      transactions,
      categorySelected,
      tripSelected
    );

    console.log(test);

    setFilteredTransactions(filteredTransactions);
    console.log("filter transactions function clicked");
    console.log(filteredTransactions);
  };

  const clearFilters = () => {
    setIsFiltered(false);
    setFilterLabel([]);
    setFilterValue([]);
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
      {/* <div>
        <ul>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => renderTransaction(transaction))
          ) : (
            <p>No transactions made</p>
          )}
        </ul>
      </div> */}
      <div className="new transaction list">
        {/* {isFiltered &&
        filteredTransactions &&
        filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) =>
            renderTransaction(transaction)
          )
        ) : (
          <p>No transactions made</p>
        )} */}
        <p>Transactions:</p>
        {transactions && transactions.length > 0 ? (
          <div>
            <ul>
              {isFiltered &&
              filteredTransactions &&
              filteredTransactions.length > 0
                ? filteredTransactions.map((transaction) =>
                    renderTransaction(transaction)
                  )
                : transactions.map((transaction) =>
                    renderTransaction(transaction)
                  )}
            </ul>
          </div>
        ) : (
          <p>No transactions made</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
