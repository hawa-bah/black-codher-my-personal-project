import axios from "axios";
import { getAll } from "./transactionService";

async function getAll() {
  const res = await axios.get(`/api/budget`);
  return res.data || [];
}

export default { getAll };
