import React, { useState, useEffect } from "react";
import { getProducts, type ProductResponse } from "../StoreApi";
import "../UserPage.css";
import { signOut } from "../LockRole";

interface AdminDashboardProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  placeholder = "ค้นหาสินค้าที่ต้องการ ...",
  onSearch = () => {},
}) => {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setError("");
      })
      .catch((err) => setError(err.message || "เกิดข้อผิดพลาด"))
      .finally(() => setLoading(false));
  }, []);

  const getProductTypeName = (type: number) => {
    switch (type) {
      case 0:
        return "อาหาร";
      case 1:
        return "เครื่องใช้";
      case 2:
        return "เครื่องดื่ม";
      case 3:
        return "ของเล่น";
      default:
        return "อื่น ๆ";
    }
  };

  const handleToggleChange = (Id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === Id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="admin-navbar">
<h1 className="title">Admin Dashboard</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <button onClick={handleSearchClick} className="search-button">
            Search
          </button>
        </div>
        <div className="signout-container">
          <button onClick={() => signOut()} className="signout-button">
            Sign Out
          </button>
        </div>
      </nav>

      <h3 className="title">ดูข้อมูลทั้งหมด / จัดการระบบ</h3>

      {loading && <p>กำลังโหลดข้อมูล...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>รายการที่</th>
              <th>สินค้า</th>
              <th>จำหน่ายโดย</th>
              <th>วันที่วางจำหน่าย</th>
              <th>ประเภทสินค้า</th>
              <th>ราคา</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.productName}</td>
                <td>{p.createBy}</td>
                <td>{new Date(p.createDate).toLocaleDateString()}</td>
                <td>{getProductTypeName(p.productType ?? 0)}</td>
                <td>{p.productPrice} บาท</td>
                <td>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={p.isActive ?? false}
                      onChange={() => handleToggleChange(p.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
