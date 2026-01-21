import React from "react";
import LowStockBadge from "./LowStockBadge";

/*
Simpler, robust ProductList (default export).
Keeps action callbacks: onEdit, onDelete, onStockIn, onStockOut.
Matches previous working logic and integrates low-stock badge.
*/

export default function ProductList({ products = [], onEdit, onDelete, showActions = true, threshold = 5, onStockIn, onStockOut }) {
  const getStatusClass = (q) => {
    if (q <= 0) return "table-danger";
    if (q <= threshold) return "table-warning";
    return "";
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={showActions ? 7 : 6} className="text-center">
                No products found
              </td>
            </tr>
          )}
          {products.map((p) => (
            <tr key={p.sku} className={getStatusClass(p.quantity)}>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.supplier}</td>
              <td>{p.unitPrice}</td>
              <td>
                <div style={{display:"flex", gap:8, alignItems:"center"}}>
                  <span>{p.quantity}</span>
                  <LowStockBadge quantity={p.quantity} threshold={threshold} />
                </div>
              </td>
              {showActions && (
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    {onStockIn && <button className="btn btn-sm btn-success" onClick={() => onStockIn(p)}>Stock In</button>}
                    {onStockOut && <button className="btn btn-sm btn-warning" onClick={() => onStockOut(p)}>Stock Out</button>}
                    {onEdit && <button className="btn btn-sm btn-secondary" onClick={() => onEdit(p)}>Edit</button>}
                    {onDelete && <button className="btn btn-sm btn-danger" onClick={() => onDelete(p)}>Delete</button>}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}