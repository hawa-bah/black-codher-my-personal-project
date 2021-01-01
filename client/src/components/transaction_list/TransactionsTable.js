import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "transaction value", headerName: "ID", width: 70 },
  { field: "description", headerName: "First name", width: 130 },
  { field: "date", headerName: "Last name", width: 130 },
  {
    field: "category",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "tripName",
    headerName: "trip Name",
    description: "This column has a value getter and is not sortable.",
    // sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.getValue("firstName") || ""} ${
    //     params.getValue("lastName") || ""
    //   }`,
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];
const TransactionsTable = (props) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={props.transactions} columns={columns} pageSize={5} />
    </div>
  );
};

export default TransactionsTable;

// import React from "react";

// const TransactionsTable = () => {
//   return (
//     <div className="transactionsTableDiv">
//       <div></div>
//     </div>
//   );
// };

// export default TransactionsTable;
