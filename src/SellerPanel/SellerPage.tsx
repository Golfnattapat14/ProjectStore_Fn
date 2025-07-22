import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { ProductResponse } from "../StoreApi";
import { getProducts } from "../StoreApi";
import "./Seller&edit.css";

const SellerPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const navigate = useNavigate();

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
      // wait for Search api
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
      <h1>📦 Seller Panel</h1>
      <h2>จัดการสินค้าของคุณ / ดูออเดอร์</h2>

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
      <br />

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => navigate("/seller/add")} className="add-button">
          + เพิ่มสินค้าใหม่
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>รายการที่</th>
              <th>สินค้า</th>
              <th>วันที่วางจำหน่าย</th>
              <th>ประเภทสินค้า</th>
              <th>ราคา</th>
              <th>จำนวนสินค้า</th>
              <th>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => {
              const key = p.id ?? `${p.productName}-${index}`;
              return (
                <tr key={key}>
                  <td>{index + 1}</td>
                  <td>{p.productName}</td>
                  <td>{new Date(p.createDate).toLocaleDateString()}</td>
                  <td>{getProductTypeName(p.productType ?? 0)}</td>
                  <td>{p.productPrice} บาท</td>
                  <td>{p.quantity}</td>
                  <td>
                    <button
                      onClick={() => {
                        if (p.id) {
                          navigate(`/seller/edit/${p.id}`);
                        } else {
                          alert("ไม่พบรหัสสินค้านี้");
                        }
                      }}
                    >
                      แก้ไข
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SellerPage;
