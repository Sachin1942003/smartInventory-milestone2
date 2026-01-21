import React, { useState } from "react";
import StockForm from "../../components/StockForm";
import stockService from "../../services/stockService";
import ErrorAlert from "../../components/ErrorAlert";
import Loading from "../../components/Loading";

export default function StockAdminPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async (req) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await stockService.updateStock(req);
      setSuccess(res || "Stock updated successfully");
    } catch (err) {
      setError(err.response?.data || err.message || "Stock update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h3>Update Stock</h3>
      <div className="card p-3 mt-3">
        {error && <ErrorAlert error={error} />}
        {success && <div className="alert alert-success">{success}</div>}
        <StockForm onSubmit={handleUpdate} />
        {loading && <Loading />}
      </div>
    </div>
  );
}