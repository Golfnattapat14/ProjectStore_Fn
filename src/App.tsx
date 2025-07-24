// import "./App.css";
import { Routes, Route } from "react-router-dom";

import Register from "./Register/RegisterPage.tsx";
import Login from "./Login/LoginPage.tsx";

import Buyer from "./BuyperPanel/BuyerPage.tsx";
import Seller from "./SellerPanel/SellerPage.tsx";
import Admin from "./AdminPanel/AdminPage.tsx";
import EditProductPage from "./SellerPanel/editProductPage.tsx";
import ProtectedRoute from "./LockRole.tsx";

import AddProductPage from "./SellerPanel/AddProductPage.tsx";
import { ErrorPage } from "./pages/Error.tsx";
// const App: React.FC = () => {
//   return (
//     <div className="app-container">
//       <div className="logo-wrapper">
//         <img
//           src="https://www.freeiconspng.com/thumbs/retail-store-icon/retail-store-icon-18.png"
//           alt="store-png"
//           className="store-logo"
//         />
//       </div>
//       <h1 className="app-title">Store Bro</h1>

//       <div className="link-route">
//         <Link to="/Login" className="btn-link">
//           Sign in
//         </Link>
//         <Link to="/register" className="btn-link">
//           Sign up
//         </Link>
//       </div>
//     </div>
//   );
// };

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />


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
        <Route
          path="/seller/add"
          element={
            <ProtectedRoute allowedRoles={["Seller"]}>
              <AddProductPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
export default App;
