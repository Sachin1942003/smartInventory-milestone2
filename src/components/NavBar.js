import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import authService from "../services/authService";

export default function NavBar() {
  const { role, email, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    logout();
    navigate("/login");
  };

  const goHome = () => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "EMPLOYEE") navigate("/employee");
    else navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container container-max">
        <button className="navbar-brand btn btn-link text-white p-0" onClick={goHome} aria-label="Smart Inventory Home">
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:"#ffffff11",borderRadius:8}}>
              <span style={{fontWeight:700}}>SI</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
              <span style={{fontWeight:700}}>Smart Inventory</span>
              <small style={{color:"#cfe2ff"}}>Manage stock & reports</small>
            </div>
          </div>
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            {!role && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}

            {role === "ADMIN" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/stock/history">Stock History</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/reports">Reports</Link>
                </li>
              </>
            )}

            {role === "EMPLOYEE" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/employee">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/employee/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/stock/history">Stock History</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {role && <li className="nav-item nav-link signed-in">Signed in: {email}</li>}
            {role && (
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}