import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";
import ErrorAlert from "../../components/ErrorAlert";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data || err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = users.filter(u => {
    if (!filter) return true;
    const s = filter.toLowerCase();
    return (u.email || "").toLowerCase().includes(s) || (u.role || "").toLowerCase().includes(s);
  });

  return (
    <div className="mt-4">
      <PageHeader title="Users" backTarget="/admin" />
      <div className="card-ghost p-3">
        <ErrorAlert error={error} />
        <div className="d-flex mb-3 align-items-center">
          <input className="form-control me-2" placeholder="Search by email or role" value={filter} onChange={(e) => setFilter(e.target.value)} />
          <button className="btn btn-outline-secondary" onClick={load}>Refresh</button>
        </div>

        {loading ? <Loading /> : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center">No users found</td>
                  </tr>
                )}
                {filtered.map((u, i) => (
                  <tr key={u.email || i}>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === "ADMIN" ? "bg-primary" : "bg-secondary"}`}>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}