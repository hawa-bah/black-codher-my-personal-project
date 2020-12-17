import axios from "axios";

async function getAll() {
  const res = await axios.get(`/api/budget`);
  return res.data || [];
}

// async function getBudgetAccomodation(tripName) {
//   const res = await axios.get(`/api/budget/${tripName}`);
//   return res.data || [];
// }

async function getBudget(tripName) {
  const res = await axios.get(`/api/budget/category/${tripName}`);
  return res.data || [];
}

export { getAll, getBudget };
