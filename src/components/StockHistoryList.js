import React from "react";

export default function StockHistoryList({ items = [] }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Stock Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">No transactions</td>
            </tr>
          )}
          {items.map((t, idx) => (
            <tr key={idx}>
              <td>{t.sku}</td>
              <td>{t.quantity}</td>
              <td>{t.stockType}</td>
              <td>{t.timestamp || t.createdAt || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}