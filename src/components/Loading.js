import React from "react";

export default function Loading({ message = "Loading..." }) {
  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      <div className="spinner-border text-primary" role="status" aria-hidden="true" />
      <span className="ms-2">{message}</span>
    </div>
  );
}