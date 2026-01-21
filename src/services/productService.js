import api from "../api/axios";



const createProduct = async (productRequest) => {
  const res = await api.post("/products", productRequest);
  return res.data;
};

const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

const getBySku = async (sku) => {
  const res = await api.get(`/products/sku/${encodeURIComponent(sku)}`);
  return res.data;
};

const searchByName = async (name) => {
  const res = await api.get(`/products/search`, { params: { name } });
  return res.data;
};

const updateProduct = async (sku, updateRequest) => {
  const res = await api.put(`/products/${encodeURIComponent(sku)}`, updateRequest);
  return res.data;
};

const deleteProduct = async (sku) => {
  const res = await api.delete(`/products/${encodeURIComponent(sku)}`);
  return res.data;
};

export default {
  createProduct,
  getAllProducts,
  getBySku,
  searchByName,
  updateProduct,
  deleteProduct,
};