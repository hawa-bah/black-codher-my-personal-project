import axios from "axios";

async function getAll() {
  const res = await axios.get(`/api/budget`);
  return res.data || [];
}

async function getBudgetAccomodation(tripName) {
  const res = await axios.get(`/api/budget/${tripName}`);
  return res.data || [];
}

async function getBudget(tripName, category) {
  const res = await axios.get(`/api/budget/${tripName}/${category}`);
  return res.data || [];
}

export { getAll, getBudgetAccomodation, getBudget };
