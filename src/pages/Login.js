import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import useAuth from "../hooks/useAuth";
import ErrorAlert from "../components/ErrorAlert";
import Loading from "../components/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = await authService.login({ email, password });
      loginWithToken(token);

      // decode role quickly
      let role = null;
      try {
        const payload = token.split(".")[1];
        role = JSON.parse(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        ).role;
      } catch (e) {}

      if (role === "ADMIN") navigate("/admin");
      else if (role === "EMPLOYEE") navigate("/employee");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="card-ghost p-4">
        <h3>Login</h3>
        <p className="kv">Sign in with your account</p>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3 d-flex align-items-center">
            <button
              className="btn btn-primary me-3"
              type="submit"
              disabled={loading}
            >
              Login
            </button>

            {loading && <Loading />}

            <div className="ms-auto kv">
              No account? <a href="/signup">Signup</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
