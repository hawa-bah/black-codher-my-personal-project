import React, { useState, useEffect } from "react";
import { getAll } from "../../services/transactionService";

const AccomodationTransactions = () => {
  const [transactions, setTransactions] = useState(null);
  useEffect(() => {
    if (!transactions) {
      getTransactionsList();
    }
  });

  const getTransactionsList = async () => {
    let res = await getAll();
    setTransactions(res);
  };

  const renderTransaction = (transaction) => {
    return (
      <li key={transaction._id}>
        <h3>
          {`${transaction.transaction_value} 
          ${transaction.description}`}
        </h3>
      </li>
    );
  };

  return (
    <div>
      <ul>
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => renderTransaction(transaction))
        ) : (
          <p>No transactions made</p>
        )}
      </ul>
    </div>
  );
};

export default AccomodationTransactions;
