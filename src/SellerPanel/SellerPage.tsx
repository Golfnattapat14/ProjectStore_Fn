import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { ProductRequest, ProductResponse } from "../StoreApi";
import { addNewProduct, getProducts } from "../StoreApi";
import "../UserPage.css";

const SellerPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");
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

  const [newProduct, setNewProduct] = useState<Partial<ProductRequest>>({
    ProductName: "",
    ProductPrice: 0,
    ProductType: 0,
    Quantity: 0,
    CreateBy: "Seller",
    IsActive: true,
  });

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

  const handleNewProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev: Partial<ProductRequest>) => ({
      ...prev,
      [name]:
        name === "ProductPrice" || name === "Quantity" || name === "ProductType"
          ? Number(value)
          : value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      setMessage("กำลังเพิ่มสินค้า...");
      if (!newProduct.ProductName || newProduct.ProductType === undefined) {
        setMessage("กรุณากรอกชื่อสินค้าและประเภทสินค้า");
        return;
      }
      if ((newProduct.ProductPrice ?? 0) <= 0) {
        setMessage("กรุณากรอกราคาสินค้าที่ถูกต้อง");
        return;
      }
      if ((newProduct.Quantity ?? 0) <= 0) {
        setMessage("กรุณากรอกจำนวนสินค้าที่ถูกต้อง");
        return;
      }

      const added = await addNewProduct(newProduct as ProductRequest);
      setMessage(`เพิ่มสินค้าเรียบร้อย: ${added.productName}`);
      setNewProduct({
        ProductName: "",
        ProductPrice: 0,
        ProductType: 0,
        Quantity: 0,
        CreateBy: "seller_user",
        IsActive: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
      }
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

      <div className="seller-panel">
        <h3>เพิ่มสินค้าใหม่</h3>

        <label htmlFor="ProductName">ชื่อสินค้า:</label>
        <input
          id="productName"
          type="text"
          name="ProductName"
          placeholder="ชื่อสินค้า"
          value={newProduct.ProductName ?? ""}
          onChange={handleNewProductChange}
        />

        <label htmlFor="ProductPrice">ราคาสินค้า:</label>
        <input
          id="ProductPrice"
          type="number"
          name="ProductPrice"
          placeholder="ราคาสินค้า"
          value={newProduct.ProductPrice ?? 0}
          onChange={handleNewProductChange}
        />

        <label htmlFor="ProductType">ประเภทสินค้า:</label>
        <input
          id="ProductType"
          type="number"
          name="ProductType"
          placeholder="ประเภทสินค้า"
          value={newProduct.ProductType ?? 0}
          onChange={handleNewProductChange}
        />

        <label htmlFor="Quantity">จำนวนสินค้า:</label>
        <input
          id="Quantity"
          type="number"
          name="Quantity"
          placeholder="จำนวนสินค้า"
          value={newProduct.Quantity ?? 0}
          onChange={handleNewProductChange}
        />

        <button onClick={handleAddProduct}>เพิ่มสินค้า</button>

        {message && <p className="message">{message}</p>}
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
