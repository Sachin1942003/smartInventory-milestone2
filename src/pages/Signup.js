import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import ErrorAlert from "../components/ErrorAlert";
import Loading from "../components/Loading";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.signup({ email, password, role });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="card-ghost p-4">
        <h3>Signup</h3>
        <p className="kv">Create an account</p>

        <ErrorAlert error={error} />

        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="row g-2 mt-2">
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>

          <div className="mt-3 d-flex align-items-center">
            <button
              className="btn btn-success me-3"
              type="submit"
              disabled={loading}
            >
              Signup
            </button>

            {loading && <Loading />}
          </div>
        </form>
      </div>
    </div>
  );
}
