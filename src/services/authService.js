import api from "../api/axios";

/*
Auth APIs (exact backend paths and request/response shapes):

POST /auth/signup
  body: { email, password, role }
  response: text message

POST /auth/login
  body: { email, password }
  response: token string (plain text)
*/

const signup = async (signupRequest) => {
  const res = await api.post("/auth/signup", signupRequest);
  return res.data;
};

const login = async (loginRequest) => {
  const res = await api.post("/auth/login", loginRequest);
  return res.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  signup,
  login,
  logout,
};