import React, { useState } from "react";

export default function StockForm({ initialSku = "", onSubmit, submitLabel = "Update Stock" }) {
  const [sku, setSku] = useState(initialSku);
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!sku) e.sku = "SKU required";
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) e.quantity = "Quantity must be > 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit({ sku: sku.trim(), quantity: Number(quantity) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label">SKU</label>
        <input type="text" className={`form-control ${errors.sku ? "is-invalid" : ""}`} value={sku} onChange={(e) => setSku(e.target.value)} />
        <div className="invalid-feedback">{errors.sku}</div>
      </div>

      <div className="mb-2">
        <label className="form-label">Quantity</label>
        <input type="number" className={`form-control ${errors.quantity ? "is-invalid" : ""}`} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <div className="invalid-feedback">{errors.quantity}</div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-primary" type="submit">{submitLabel}</button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => { setQuantity(""); }}>Reset</button>
      </div>
    </form>
  );
}