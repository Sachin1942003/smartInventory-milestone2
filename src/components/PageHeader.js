import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PageHeader({ title, subtitle, backTarget, nextTarget, nextLabel = "Next" }) {
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleBack = () => {
    if (backTarget) {
      navigate(backTarget);
      return;
    }
    // fallback to role-based dashboard when no backTarget provided
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "EMPLOYEE") {
      navigate("/employee");
    } else {
      navigate("/login");
    }
  };

  const handleNext = () => {
    if (nextTarget) {
      navigate(nextTarget);
      return;
    }
    // fallback next -> role dashboard
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "EMPLOYEE") {
      navigate("/employee");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="page-header">
      <div>
        <h2 className="page-title">{title}</h2>
        {subtitle && <div className="kv">{subtitle}</div>}
      </div>
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-secondary me-2" onClick={handleBack}>Back</button>
        {nextTarget && <button className="btn btn-primary" onClick={handleNext}>{nextLabel}</button>}
      </div>
    </div>
  );
}