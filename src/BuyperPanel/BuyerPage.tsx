import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { getProducts, type ProductResponse } from "../StoreApi";
import "../UserPage.css";

const Buyer: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [message] = useState<string>("");

  const [, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string>("");

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (inputRef.current) {
      // ใส่ logic ค้นหาได้ตรงนี้ เช่น onSearch(query);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <>
      <nav>
        <li>
          <Link className="read-the-docs" to="/">
            Sign Out
          </Link>
        </li>
      </nav>

      <h1>🛒 Store Shop</h1>
      <h2>เลือกซื้อสินค้า / ดูโปรโมชั่น</h2>

      <div>
        <input
          type="text"
          placeholder="ค้นหาสินค้าที่ต้องการ ..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

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
                <td>{p.createBy}</td>
                <td>{getProductTypeName(p.productType ?? 0)}</td>
                <td>{p.quantity}</td>
                <td>{p.productPrice} บาท</td>
                <td>
                  <button>เพิ่มใส่ตะกร้า</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && <p className="message">{message}</p>}
    </>
  );
};

export default Buyer;
