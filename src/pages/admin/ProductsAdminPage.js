import React, { useEffect, useState } from "react";
import productService from "../../services/productService";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.response?.data || err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSearch = async (ev) => {
    ev.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (!query) {
        await loadAll();
      } else {
        const data = await productService.searchByName(query);
        setProducts(data);
      }
    } catch (err) {
      setError(err.response?.data || err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    navigate(`/admin/products/edit/${encodeURIComponent(p.sku)}`);
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete product ${p.sku}?`)) return;
    try {
      await productService.deleteProduct(p.sku);
      await loadAll();
    } catch (err) {
      setError(err.response?.data || err.message || "Delete failed");
    }
  };

  const handleStockIn = (p) => {
    navigate(`/admin/stock/in`, { state: { sku: p.sku, from: "/admin/products" } });
  };
  const handleStockOut = (p) => {
    navigate(`/admin/stock/out`, { state: { sku: p.sku, from: "/admin/products" } });
  };

  return (
    <div className="mt-4">
      <PageHeader title="Products" backTarget="/admin" />
      <div className="card-ghost p-3">
        <div className="d-flex justify-content-between mb-3">
          <div>
            <button className="btn btn-success me-2" onClick={() => navigate("/admin/products/create")}>+ Create Product</button>
            <button className="btn btn-outline-secondary" onClick={loadAll}>Refresh</button>
          </div>
          <div className="kv">Total: {products.length}</div>
        </div>

        <ErrorAlert error={error} />

        <form onSubmit={handleSearch} className="row g-2 align-items-center mb-3">
          <div className="col-md-8">
            <input
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
            />
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button className="btn btn-primary" type="submit">Search</button>
            <button className="btn btn-outline-secondary" type="button" onClick={() => { setQuery(""); loadAll(); }}>Reset</button>
          </div>
        </form>

        {loading ? (
          <Loading />
        ) : (
          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStockIn={handleStockIn}
            onStockOut={handleStockOut}
          />
        )}
      </div>
    </div>
  );
}