import React, { useEffect, useState } from "react";
import productService from "../../services/productService";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function ProductsEmployeePage() {
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

  // Use employee routes for stock actions. Pass explicit from so Back goes to products list
  const handleStockIn = (p) => {
    navigate("/employee/stock/in", { state: { sku: p.sku, from: "/employee/products" } });
  };
  const handleStockOut = (p) => {
    navigate("/employee/stock/out", { state: { sku: p.sku, from: "/employee/products" } });
  };

  return (
    <div className="mt-4">
      <PageHeader title="Products"  backTarget="/employee" />
      <div className="card-ghost p-3">
        <ErrorAlert error={error} />
        <form onSubmit={handleSearch} className="row g-2 align-items-center mb-3">
          <div className="col-md-8">
            <input className="form-control" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" />
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button className="btn btn-primary" type="submit">Search</button>
            <button className="btn btn-outline-secondary" type="button" onClick={loadAll}>Reset</button>
          </div>
        </form>

        {loading ? <Loading /> : <ProductList products={products} showActions={true} onStockIn={handleStockIn} onStockOut={handleStockOut} />}
      </div>
    </div>
  );
}