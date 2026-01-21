import React, { useState } from "react";
import stockService from "../../services/stockService";
import StockHistoryList from "../../components/StockHistoryList";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";
import PageHeader from "../../components/PageHeader";

export default function StockHistoryPage() {
  const [sku, setSku] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (ev) => {
    ev.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await stockService.getStockHistory(sku.trim());
      setHistory(data);
    } catch (err) {
      setError(err.response?.data || err.message || "Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <PageHeader title="Stock History" backTarget="/admin" />
      <div className="card-ghost p-3">
        <form onSubmit={handleSearch} className="row g-2 align-items-center">
          <div className="col-md-8">
            <input className="form-control" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Enter SKU" required />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" type="submit">Search</button>
          </div>
        </form>

        <div className="mt-3">
          <ErrorAlert error={error} />
          {loading ? <Loading /> : <StockHistoryList items={history} />}
        </div>
      </div>
    </div>
  );
}