import React from "react";

export default function ErrorAlert({ error }) {
  if (!error) return null;
  const text = typeof error === "string" ? error : error.message || JSON.stringify(error);
  return (
    <div className="alert alert-danger" role="alert">
      {text}
    </div>
  );
}