📦 Inventory Management System – Milestone 2
🔹 Project Overview

Milestone 2 extends the Inventory Management System by introducing Product Management and Stock Management features with secure role-based access and a React frontend fully integrated with the Spring Boot backend.

This milestone focuses on managing products, tracking stock movements, and providing an admin-friendly UI for inventory operations.

🚀 Tech Stack
Backend

Java 17

Spring Boot

Spring Security (JWT Authentication)

Spring Data JPA

MySQL

Hibernate

Frontend

React (Functional Components + Hooks)

Axios

Basic CSS styling

🔐 Authentication & Authorization

JWT-based authentication

Roles:

ADMIN

EMPLOYEE

Role-based API protection

Secure login & signup APIs

✅ Milestone-2 Features Implemented
📦 Product Management

Create new products

View all products

Search product by SKU

Search products by name

Delete products

Each product includes:

SKU (unique)

Name

Category

Supplier

Unit Price

Quantity

📊 Stock Management

Stock IN (increase quantity)

Stock OUT (decrease quantity with validation)

Prevent stock-out if insufficient quantity

Maintain stock transaction history

View stock history by product SKU

👥 User Management (Admin Only)

View total number of users

View list of users with:

Email

Role (ADMIN / EMPLOYEE)

🖥️ Frontend Features

Login screen with JWT handling

Add product form

Product listing with delete option

Stock IN / Stock OUT UI

Stock history view

Admin-only user list view

Loading & error handling

Environment-based API configuration

🔗 API Endpoints (Milestone-2)
🔐 Authentication
Method	Endpoint	Description
POST	/auth/signup	Register ADMIN / EMPLOYEE
POST	/auth/login	Login & get JWT
📦 Products
Method	Endpoint	Description
POST	/products	Create product
GET	/products	Get all products
GET	/products/sku/{sku}	Get product by SKU
GET	/products/search?name=	Search products
DELETE	/products/{sku}	Delete product
📊 Stock
Method	Endpoint	Description
POST	/stock/update	Stock IN / OUT
GET	/stock/history/{sku}	Stock history
👥 Admin
Method	Endpoint	Description
GET	/admin/users	View all users (ADMIN only)
