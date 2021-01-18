import axios from "axios";

async function getAll(user_ref_email) {
  const res = await axios.get(`/api/expense/${user_ref_email}`);
  return res.data || [];
}

async function getBalance() {
  const res = await axios.get(`/api/balance`);
  return res.data || [];
}

async function deleteOne(transaction) {
  await axios.delete(`/api/expenses/transactions/${transaction._id}`);
}

export { getAll, getBalance, deleteOne };
