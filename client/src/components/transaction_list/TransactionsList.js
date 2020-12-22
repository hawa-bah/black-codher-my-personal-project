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
    getTransactionsList();
  });

  const getTransactionsList = async () => {
    let res = await getAll();
    setTransactions(res);
  };
  // transaction is deleted from the database AND in the front end
  const deleteTransaction = async (transaction) => {
    let res = await deleteOne(transaction);
    setTransactions(res);
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
  const filterMethod = (label) => {
    console.log("label:" + label);

    setIsFiltered(true);
    setFilterLabel(label);
    // setFilterValue(value);
    filterTransactions(label);
  };

  const filterTransactions = (filterLabel) => {
    // const filteredTransactions = transactions.filter((item) => {
    //   item.includes(filterLabel);
    //   return filterLabel.includes(item.budget_category);
    //   // return item.budget_category === filterLabel[0];
    // });

    const filteredTransactions = (arr1, arr2) => {
      const filtered = arr1.filter((el) => {
        console.log(arr2, el);
        return arr2.indexOf(el.budget_category) >= 0;
      });
      return filtered;
    };
    const test = filteredTransactions(transactions, filterLabel);
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
