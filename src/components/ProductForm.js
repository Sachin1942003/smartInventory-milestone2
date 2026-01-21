import React, { useState } from "react";

export default function ProductForm({ initial = {}, onSubmit, submitLabel = "Save" }) {
  const [sku, setSku] = useState(initial.sku || "");
  const [name, setName] = useState(initial.name || "");
  const [category, setCategory] = useState(initial.category || "");
  const [supplier, setSupplier] = useState(initial.supplier || "");
  const [unitPrice, setUnitPrice] = useState(initial.unitPrice ?? "");
  const [quantity, setQuantity] = useState(initial.quantity ?? "");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!sku || sku.trim() === "") e.sku = "SKU is required";
    if (!name || name.trim() === "") e.name = "Name is required";
    if (unitPrice === "" || isNaN(Number(unitPrice))) e.unitPrice = "Unit price must be a number";
    if (quantity === "" || isNaN(Number(quantity))) e.quantity = "Quantity must be a number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit({
      sku: sku.trim(),
      name: name.trim(),
      category: category ? category.trim() : null,
      supplier: supplier ? supplier.trim() : null,
      unitPrice: Number(unitPrice),
      quantity: Number(quantity),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label">SKU</label>
        <input
          type="text"
          className={`form-control ${errors.sku ? "is-invalid" : ""}`}
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          disabled={!!initial.sku}
        />
        <div className="invalid-feedback">{errors.sku}</div>
      </div>

      <div className="mb-2">
        <label className="form-label">Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="invalid-feedback">{errors.name}</div>
      </div>

      <div className="mb-2">
        <label className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Supplier</label>
        <input
          type="text"
          className="form-control"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Unit Price</label>
        <input
          type="number"
          className={`form-control ${errors.unitPrice ? "is-invalid" : ""}`}
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          step="0.01"
        />
        <div className="invalid-feedback">{errors.unitPrice}</div>
      </div>

      <div className="mb-2">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <div className="invalid-feedback">{errors.quantity}</div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {submitLabel}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => window.history.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}