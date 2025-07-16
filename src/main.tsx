import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Register from "./Register/RegisterPage.tsx";
import Login from "./Login/LoginPage.tsx";
import User from "./user/Userpage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/buyer" element={<User role="buyer" />} />
        <Route path="/seller" element={<User role="seller" />} />
        <Route path="/admin" element={<User role="admin" />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
