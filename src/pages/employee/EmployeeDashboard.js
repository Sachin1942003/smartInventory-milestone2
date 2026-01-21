import React, { useEffect, useState } from "react";
import reportService from "../../services/reportService";
import productService from "../../services/productService";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import ErrorAlert from "../../components/ErrorAlert";
import { Link } from "react-router-dom";

export default function EmployeeDashboard() {
  const [lowStock, setLowStock] = useState([]);
  const [loadingLow, setLoadingLow] = useState(false);
  const [error, setError] = useState(null);
  const THRESHOLD = 5;

  const loadLow = async () => {
    setLoadingLow(true);
    setError(null);
    try {
      // Try server report endpoint first
      const data = await reportService.lowStock(THRESHOLD);
      // If server returns an empty array but there are low stock items, fallback below
      if (Array.isArray(data) && data.length > 0) {
        setLowStock(data);
        return;
      }
      // If empty, still attempt client-side fallback to ensure visibility
      const products = await productService.getAllProducts();
      const filtered = (products || []).filter((p) => Number(p.quantity) <= THRESHOLD);
      setLowStock(filtered);
    } catch (err) {
      // On error (e.g. 403 or endpoint failure) fallback to client-side filter
      try {
        const products = await productService.getAllProducts();
        const filtered = (products || []).filter((p) => Number(p.quantity) <= THRESHOLD);
        setLowStock(filtered);
      } catch (err2) {
        setError(err2.response?.data || err.response?.data || err2?.message || err?.message || "Failed to load low stock");
        setLowStock([]);
      }
    } finally {
      setLoadingLow(false);
    }
  };

  useEffect(() => {
    loadLow();
  }, []);

  return (
    <div className="mt-4">
      <PageHeader
        title="Employee Dashboard"
        
        nextTarget="/employee/products"
        nextLabel="View Products"
      />

      <div className="dash-grid mb-3">
        <div className="card-ghost">
          <h5>Quick Actions</h5>
          <div className="d-flex flex-column gap-2">
            <Link className="btn btn-primary" to="/employee/products">Browse Products</Link>
            <Link className="btn btn-success" to="/employee/stock/in" state={{ from: "/employee" }}>Stock In</Link>
            <Link className="btn btn-warning" to="/employee/stock/out" state={{ from: "/employee" }}>Stock Out</Link>
          </div>
        </div>

        <div className="card-ghost">
          <h5>Low Stock Alerts</h5>
          <ErrorAlert error={error} />
          {loadingLow ? (
            <Loading />
          ) : lowStock.length === 0 ? (
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
                      <div className="mt-1">
                        <Link className="btn btn-sm btn-light btn-outline" to="/employee/products">View</Link>
                      </div>
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