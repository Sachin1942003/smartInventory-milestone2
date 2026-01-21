import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Login from "../pages/Login";
import Signup from "../pages/Signup";

import AdminDashboard from "../pages/admin/AdminDashboard";
import UsersPage from "../pages/admin/UsersPage";
import ProductsAdminPage from "../pages/admin/ProductsAdminPage";
import ProductCreate from "../pages/admin/ProductCreate";
import ProductEdit from "../pages/admin/ProductEdit";
import StockInPage from "../pages/admin/StockInPage";
import StockOutPage from "../pages/admin/StockOutPage";
import StockHistoryPage from "../pages/admin/StockHistoryPage";
import ReportsPage from "../pages/admin/ReportsPage";

import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import ProductsEmployeePage from "../pages/employee/ProductsEmployeePage";
import EmployeeStockInPage from "../pages/employee/StockInPage";
import EmployeeStockOutPage from "../pages/employee/StockOutPage";
import EmployeeStockHistoryPage from "../pages/employee/StockHistoryPage";

function ProtectedRoute({ children, allowedRoles }) {
  const { role } = useAuth();
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <UsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ProductsAdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/create"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ProductCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/edit/:sku"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ProductEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/stock/in"
        element={
          <ProtectedRoute allowedRoles={["ADMIN","EMPLOYEE"]}>
            <StockInPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/stock/out"
        element={
          <ProtectedRoute allowedRoles={["ADMIN","EMPLOYEE"]}>
            <StockOutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/stock/history"
        element={
          <ProtectedRoute allowedRoles={["ADMIN","EMPLOYEE"]}>
            <StockHistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ReportsPage />
          </ProtectedRoute>
        }
      />

      {/* Employee routes */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/products"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
            <ProductsEmployeePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/stock/in"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE","ADMIN"]}>
            <EmployeeStockInPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/stock/out"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE","ADMIN"]}>
            <EmployeeStockOutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/stock/history"
        element={
          <ProtectedRoute allowedRoles={["EMPLOYEE","ADMIN"]}>
            <EmployeeStockHistoryPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h3 className="mt-4">Page not found</h3>} />
    </Switch>
  );
}