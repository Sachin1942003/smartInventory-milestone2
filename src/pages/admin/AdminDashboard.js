import React, { useEffect, useState } from "react";
import reportService from "../../services/reportService";
import userService from "../../services/userService";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [lowStock, setLowStock] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loadingLow, setLoadingLow] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // new employee/user state
  const [userCount, setUserCount] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const navigate = useNavigate();

  const loadLow = async () => {
    setLoadingLow(true);
    try {
      const data = await reportService.lowStock(5);
      setLowStock(data);
    } catch (err) {
      // ignore
    } finally {
      setLoadingLow(false);
    }
  };

  const loadSummary = async () => {
    setLoadingSummary(true);
    try {
      const data = await reportService.summary();
      setSummary(data);
    } catch (err) {
      // ignore
    } finally {
      setLoadingSummary(false);
    }
  };

  const loadUserCount = async () => {
    setLoadingUsers(true);
    try {
      const users = await userService.getAllUsers();
      setUserCount(Array.isArray(users) ? users.length : null);
    } catch (err) {
      setUserCount(null);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadLow();
    loadSummary();
    loadUserCount();
  }, []);

  return (
    <div className="mt-4">
      <PageHeader title="Admin Dashboard"  nextTarget="/admin/products" nextLabel="Manage Products" />
      <div className="dash-grid mb-3">
        <div className="card-ghost">
          <h5>Inventory Summary</h5>
          {loadingSummary ? <Loading /> : summary ? (
            <div className="row">
              <div className="col">
                <div className="kv">Products</div>
                <div className="fs-4">{summary.totalProducts}</div>
              </div>
              <div className="col">
                <div className="kv">Units</div>
                <div className="fs-4">{summary.totalUnits}</div>
              </div>
              <div className="col">
                <div className="kv">Inventory Value</div>
                <div className="fs-4">{summary.totalInventoryValue}</div>
              </div>
            </div>
          ) : <div className="kv">No summary</div>}
        </div>

        {/* Total Users card */}
        <div className="card-ghost">
          <h5>Total Users</h5>
          <div className="d-flex flex-column gap-2">
            <div className="kv">Registered users (employees & admins)</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>
              {loadingUsers ? <Loading /> : (userCount ?? "-")}
            </div>
            <div>
              <button className="btn btn-outline-primary me-2" onClick={() => navigate("/admin/users")}>View Users</button>
            </div>
          </div>
        </div>

        <div className="card-ghost">
          <h5>Quick Actions</h5>
          <div className="d-flex flex-column gap-2">
            <Link className="btn btn-primary" to="/admin/products">Manage Products</Link>
            <Link className="btn btn-success" to="/admin/stock/in" state={{ from: "/admin" }}>Stock In</Link>
            <Link className="btn btn-warning" to="/admin/stock/out" state={{ from: "/admin" }}>Stock Out</Link>
            <Link className="btn btn-outline-secondary" to="/admin/stock/history" state={{ from: "/admin" }}>Stock History</Link>
          </div>
        </div>

        <div className="card-ghost">
          <h5>Low Stock Alerts</h5>
          {loadingLow ? <Loading /> : lowStock.length === 0 ? (
            <div className="kv">No low stock products</div>
          ) : (
            <div style={{ maxHeight: 300, overflowY: "auto" }}>
              <ul className="list-group">
                {lowStock.map(p => (
                  <li key={p.sku} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{p.name}</strong>
                      <div className="kv">{p.sku} • {p.category}</div>
                    </div>
                    <div className="text-end">
                      <div className="badge bg-danger">Low: {p.quantity}</div>
                      <div className="mt-1"><Link className="btn btn-sm btn-light btn-outline" to="/admin/products">View</Link></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}