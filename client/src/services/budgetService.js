import axios from "axios";

async function getAll() {
  const res = await axios.get(`/api/budget`);
  return res.data || [];
}

// async function getBudgetAccomodation(tripName) {
//   const res = await axios.get(`/api/budget/${tripName}`);
//   return res.data || [];
// }

// attempt  1
// async function getSpent(category, tripName) {
//   const res = await axios.get(`/api/expenses/${category}/${tripName}`);
//   return res.data || [];
// }

// attempt 2
async function getSpent(tripName) {
  const res = await axios.get(`/api/expenses/${tripName}`);
  return res.data || [];
}

async function getBudget(tripName) {
  const res = await axios.get(`/api/budget/category/${tripName}`);
  return res.data || [];
}

export { getAll, getSpent, getBudget };
