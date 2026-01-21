import React, { createContext, useState, useEffect } from "react";
import { getRoleFromToken, getEmailFromToken } from "../utils/jwt";

export const AuthContext = createContext({
  token: null,
  role: null,
  email: null,
  loginWithToken: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => getRoleFromToken(localStorage.getItem("token")));
  const [email, setEmail] = useState(() => getEmailFromToken(localStorage.getItem("token")));

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setRole(getRoleFromToken(t));
    setEmail(getEmailFromToken(t));
  }, []);

  function loginWithToken(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setRole(getRoleFromToken(newToken));
    setEmail(getEmailFromToken(newToken));
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
    setEmail(null);
  }

  return (
    <AuthContext.Provider value={{ token, role, email, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}