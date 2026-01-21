import api from "../api/axios";

/*
Stock endpoints (unchanged):

POST /stock/update
GET /stock/history/{sku}
*/

const updateStock = async (stockUpdateRequest) => {
  const res = await api.post("/stock/update", stockUpdateRequest);
  return res.data;
};

const getStockHistory = async (sku) => {
  const res = await api.get(`/stock/history/${encodeURIComponent(sku)}`);
  return res.data;
};

export default {
  updateStock,
  getStockHistory,
};