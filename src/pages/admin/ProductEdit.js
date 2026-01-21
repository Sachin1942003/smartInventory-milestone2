import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../../services/productService";
import ProductForm from "../../components/ProductForm";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";

export default function ProductEdit() {
  const { sku } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getBySku(sku);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data || err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sku]);

  const handleSave = async (payload) => {
    setError(null);
    setSaving(true);
    try {
      // backend expects ProductUpdateRequest (fields: name, category, supplier, unitPrice, quantity)
      const updateRequest = {
        name: payload.name,
        category: payload.category,
        supplier: payload.supplier,
        unitPrice: payload.unitPrice,
        quantity: payload.quantity,
      };
      await productService.updateProduct(sku, updateRequest);
      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data || err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-4">
      <h3>Edit Product</h3>
      <div className="card p-3 mt-3">
        <ErrorAlert error={error} />
        {loading ? <Loading /> : product ? <ProductForm initial={product} onSubmit={handleSave} submitLabel="Update" /> : <div>Product not found</div>}
        {saving && <Loading message="Saving..." />}
      </div>
    </div>
  );
}