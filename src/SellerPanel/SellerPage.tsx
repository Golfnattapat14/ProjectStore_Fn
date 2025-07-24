import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductResponse } from "../API/types";
import {
  getProductsSeller,
  deleteProduct,
} from "../API/sellerApi";
import "./Seller&edit.css";

const SellerPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const navigate = useNavigate();

  const [, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string>("");
  const loadProducts = () => {
    setLoading(true);
    getProductsSeller()
      .then((data) => {
        setProducts(data.filter((p) => p.isActive));
        setError("");
      })
      .catch((err) => setError(err.message || "เกิดข้อผิดพลาด"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    getProductsSeller()
      .then((data) => {
        setProducts(data);
        setError("");
      })
      .catch((err) => setError(err.message || "เกิดข้อผิดพลาด"))
      .finally(() => setLoading(false));
  }, []);

  const getProductTypeName = (type: number) => {
    switch (type) {
      case 1:
        return "อาหาร";
      case 2:
        return "เครื่องใช้";
      case 3:
        return "เครื่องดื่ม";
      case 4:
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
      // รอใส่ logic ค้นหา
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
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("คุณแน่ใจว่าจะลบสินค้านี้?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(String(err));
      }
    }
  };


  return (
    <div className="seller-page">
      <nav>
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </nav>

      <h2 className="seller-title">
        <span role="img" aria-label="box">
          📦
        </span>{" "}
        Seller Panel
      </h2>
      <h1 className="seller-title">
        <span role="img" aria-label="box"></span> จัดการสินค้าของคุณ / ดูออเดอร์{" "}
      </h1>

      <div className="search-section">
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

      <div className="add-button-container">
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
              <th>แก้ไขสินค้า</th>
              <th>ลบสินค้า</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => {
              const key = p.id ?? `${p.productName}-${index}`;
              return (
                <tr key={key} className={p.isActive ? "" : "inactive"}>
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
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => p.id && handleDelete(p.id)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerPage;
