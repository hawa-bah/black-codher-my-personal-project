import axios from "axios";

async function getAll() {
  const res = await axios.get(`/api/expense`);
  return res.data || [];
}

// async function deleteOne(user) {
//   await axios.delete(`/api/user/${user._id}`);
// }

export { getAll };
