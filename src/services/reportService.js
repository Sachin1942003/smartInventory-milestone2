import api from "../api/axios";

/*
Reports:

GET /reports/low-stock?threshold=...
GET /reports/summary
*/

const lowStock = async (threshold = 5) => {
  const res = await api.get("/reports/low-stock", { params: { threshold } });
  return res.data;
};

const summary = async () => {
  const res = await api.get("/reports/summary");
  return res.data;
};

export default {
  lowStock,
  summary,
};