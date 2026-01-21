import React, { useState } from "react";
import reportService from "../../services/reportService";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";
import ProductList from "../../components/ProductList";
import PageHeader from "../../components/PageHeader";

export default function ReportsPage() {
  const [threshold, setThreshold] = useState(5);
  const [lowStock, setLowStock] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loadingLow, setLoadingLow] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [error, setError] = useState(null);

  const loadLow = async () => {
    setError(null);
    setLoadingLow(true);
    try {
      const data = await reportService.lowStock(threshold);
      setLowStock(data);
    } catch (err) {
      setError(err.response?.data || err.message || "Failed to load low stock");
    } finally {
      setLoadingLow(false);
    }
  };

  const loadSummary = async () => {
    setError(null);
    setLoadingSummary(true);
    try {
      const data = await reportService.summary();
      setSummary(data);
    } catch (err) {
      setError(err.response?.data || err.message || "Failed to load summary");
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="mt-4">
      <PageHeader title="Reports" backTarget="/admin" />
      <div className="card-ghost p-3">
        <ErrorAlert error={error} />

        <div className="mb-3">
          <h5>Low Stock Products</h5>
          <div className="d-flex mb-2">
            <input type="number" className="form-control me-2" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
            <button className="btn btn-primary" onClick={loadLow}>Load</button>
          </div>
          {loadingLow ? <Loading /> : <ProductList products={lowStock} showActions={false} />}
        </div>

        <div className="mb-3">
          <h5>Inventory Summary</h5>
          <button className="btn btn-secondary mb-2" onClick={loadSummary}>Load Summary</button>
          {loadingSummary ? <Loading /> : summary ? (
            <div className="row">
              <div className="col-md-4">
                <div className="card p-3">
                  <h6>Total Products</h6>
                  <div className="fs-4">{summary.totalProducts}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <h6>Total Units</h6>
                  <div className="fs-4">{summary.totalUnits}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <h6>Total Inventory Value</h6>
                  <div className="fs-4">{summary.totalInventoryValue}</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}