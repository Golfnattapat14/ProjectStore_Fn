import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { getProducts, type ProductResponse } from "../StoreApi";
import "../UserPage.css";

const Buyer: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

 useEffect(() => {
  setLoading(true);
  getProducts()
    .then((data) => {
      console.log("Products from API:", data);
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (inputRef.current) {
      setMessage(`กำลังค้นหา: "${query}"`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="buyer-container">
      <nav className="buyer-navbar">
        <h1 className="title">Store Shope</h1>
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </nav>

      <h2 className="buyer-subtitle">เลือกซื้อสินค้า</h2>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="ค้นหาสินค้าที่ต้องการ ..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className="search-input"
        />
        <button onClick={handleSearchClick} className="search-button">
          Search
        </button>
      </div>

      {loading && <p>กำลังโหลดข้อมูล...</p>}
      {error && <p className="error-message">{error}</p>}
      {message && <p className="info-message">{message}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>รายการที่</th>
              <th>ชื่อสินค้า</th>
              <th>วันที่วางจำหน่าย</th>
              <th>จำหน่ายโดย</th>
              <th>ประเภทสินค้า</th>
              <th>สินค้าคงเหลือ</th>
              <th>ราคา</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p.id ?? `${p.productName}-${index}`}>
                <td>{index + 1}</td>
                <td>{p.productName}</td>
                <td>{new Date(p.createDate).toLocaleDateString()}</td>
                <td>{p.createdByName}</td>
                <td>{getProductTypeName(p.productType ?? 0)}</td>
                <td>{p.quantity}</td>
                <td>{p.productPrice} บาท</td>
                <td>
                  <button className="add-to-cart-button">เพิ่มใส่ตะกร้า</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Buyer;
