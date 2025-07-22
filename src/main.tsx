import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import Register from "./Register/RegisterPage.tsx";
import Login from "./Login/LoginPage.tsx";

import Buyer from "./BuyperPanel/BuyerPage.tsx";
import Seller from "./SellerPanel/SellerPage.tsx";
import Admin from "./AdminPanel/AdminPage.tsx";
import EditProductPage from "./SellerPanel/editProductPage.tsx";
import ProtectedRoute from "./LockRole.tsx"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/buyer"
          element={
            <ProtectedRoute allowedRoles={["Buyer"]}>
              <Buyer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={["Seller"]}>
              <Seller />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Seller"]}>
              <EditProductPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
