import axios from "axios";

async function getAll() {
  const res = await axios.get(`/api/expense`);
  return res.data || [];
}

async function getBalance() {
  const res = await axios.get(`/api/balance`);
  return res.data || [];
}

async function deleteOne(transaction) {
  await axios.delete(`/api/expenses/transactions/${transaction._id}`);
}
async function getSpentAccomodation(tripName) {
  const res = await axios.get(`/api/expenses/accomodation/${tripName}`);
  return res.data || [];
}

export { getAll, getBalance, deleteOne, getSpentAccomodation };
