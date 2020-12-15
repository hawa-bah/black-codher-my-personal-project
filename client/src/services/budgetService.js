import axios from "axios";

async function getAll() {
  const res = await axios.get(`/api/budget`);
  return res.data || [];
}

export { getAll };
