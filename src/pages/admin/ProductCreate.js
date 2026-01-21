import React, { useState } from "react";
import ProductForm from "../../components/ProductForm";
import productService from "../../services/productService";
import ErrorAlert from "../../components/ErrorAlert";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function ProductCreate() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (product) => {
    setError(null);
    setLoading(true);
    try {
      await productService.createProduct(product);
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data || err.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <PageHeader title="Create Product" backTarget="/admin/products" />
      <div className="card-ghost p-3">
        <ErrorAlert error={error} />
        <ProductForm onSubmit={handleSubmit} submitLabel="Create" />
        {loading && <Loading />}
      </div>
    </div>
  );
}