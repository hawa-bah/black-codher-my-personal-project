import axios from "axios";

async function getAll(user_ref_email) {
  const res = await axios.get(`/api/budget/${user_ref_email}`);
  return res.data || [];
}

async function getSpent(tripName) {
  const res = await axios.get(`/api/expenses/${tripName}`);
  return res.data || [];
}

async function getBudget(tripName) {
  const res = await axios.get(`/api/budget/category/${tripName}`);
  return res.data || [];
}

async function deleteOne(_id) {
  const res = await axios.delete(`/api/delete/Info/card/${_id}`);
  return res.data || [];
}

export { getAll, getSpent, getBudget, deleteOne };
