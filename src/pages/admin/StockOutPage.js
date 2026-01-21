import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import StockForm from "../../components/StockForm";
import stockService from "../../services/stockService";
import ErrorAlert from "../../components/ErrorAlert";
import Loading from "../../components/Loading";
import { useLocation } from "react-router-dom";

export default function StockOutPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const location = useLocation();
  const initialSku = location.state?.sku || "";

  // Prefer explicit from state (e.g. "/admin/products" or "/admin") otherwise fallback by pathname/role
  const backTarget = location.state?.from || (location.pathname.startsWith("/employee") ? "/employee" : "/admin");

  const handleUpdate = async (req) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const payload = { ...req, stockType: "STOCK_OUT" };
      const res = await stockService.updateStock(payload);
      setSuccess(res || "Stock out successful");
    } catch (err) {
      setError(err.response?.data || err.message || "Stock update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <PageHeader title="Stock Out" backTarget={backTarget} />
      <div className="card-ghost p-3">
        <ErrorAlert error={error} />
        {success && <div className="alert alert-success">{success}</div>}
        <StockForm initialSku={initialSku} onSubmit={handleUpdate} submitLabel="Stock Out" />
        {loading && <Loading />}
      </div>
    </div>
  );
}