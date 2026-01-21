import React from "react";


export default function LowStockBadge({ quantity, threshold = 5 }) {
  if (typeof quantity !== "number") return null;
  if (quantity > threshold) return null;
  return <span className="badge badge-low">Low: {quantity}</span>;
}