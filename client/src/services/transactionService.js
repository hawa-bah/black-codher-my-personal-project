import axios from "axios";

async function getAll() {
  const res = await axios.get(`/api/expense`);
  return res.data || [];
}

async function deleteOne(transaction) {
  await axios.delete(`/api/expenses/transactions/${transaction._id}`);
}

export { getAll, deleteOne };
