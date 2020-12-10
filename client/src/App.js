import React, { useState, useEffect } from "react";
import AccomodationTab from "./components/expense_tab/accomodation";

// SERVICES
import { getAll, deleteOne } from "./services/userService";

function App() {
  const [budget, setbudget] = useState(0);
  const [transaction, setTransactions] = useState(0);
  const [description, setDesc] = useState("");

  const [users, setusers] = useState(null);

  useEffect(() => {
    if (!users) {
      getusers();
    }
  });

  const getusers = async () => {
    let res = await getAll();
    setusers(res);
  };

  const deleteuser = async (user) => {
    let res = await deleteOne(user);
    setusers(res);
  };

  const renderUser = (user) => {
    return (
      <li key={user._id}>
        <button
          onClick={() => {
            deleteuser(user);
          }}
        >
          Delete
        </button>
        <h3>
          {`${user.first_name} 
          ${user.last_name}`}
        </h3>
        <p>{user.location}</p>
      </li>
    );
  };

  return (
    <div>
      <div>
        <AccomodationTab
          budget={budget}
          setbudget={setbudget}
          transaction={transaction}
          setTransactions={setTransactions}
          description={description}
          setDesc={setDesc}
        />
      </div>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => renderUser(user))
        ) : (
          <p>No users found</p>
        )}
      </ul>

      <div>
        <button>Add</button>
      </div>
    </div>
  );
}

export default App;
