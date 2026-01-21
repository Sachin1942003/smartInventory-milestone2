import api from "../api/axios";


const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export default {
  getAllUsers,
};