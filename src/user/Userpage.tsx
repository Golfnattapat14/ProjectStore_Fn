import React, { useState, useRef, useEffect, type ChangeEvent } from "react"; // เพิ่ม useEffect
import { Link } from "react-router-dom";
import type { ProductRequest } from "../StoreApi";
import { addNewProduct, getProducts, type ProductResponse } from "../StoreApi";
import "./UserPage.css";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  role: "Admin" | "Seller" | "Buyer";
}

const User: React.FC<SearchBarProps> = ({
  onSearch = () => {},
  placeholder = "ค้นหาสินค้าที่ต้องการ ...",
  role,
}) => {
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => {
        setMessage(err.message || "โหลดข้อมูลสินค้าไม่สำเร็จ");
      });
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
      onSearch(query);
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

  function handleToggleChange(id: string) {
    setProducts((prev) =>
      prev.map((p) => (p.Id === id ? { ...p, isActive: !p.isActive } : p))
    );
  }

  
  return (
    <>
      <nav>
        <li>
          <Link className="read-the-docs" to="/">
            Sign Out
          </Link>
        </li>
      </nav>

      <h1>Welcome {role.toUpperCase()} to Store</h1>

      {role === "Admin" && (
        <div>
          <h1>📊 Admin Dashboard</h1>
          <h3>ดูข้อมูลทั้งหมด / จัดการระบบ</h3>
          <div>
            <input
              type="text"
              placeholder={placeholder}
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
                  <tr key={p.Id}>
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
                          onChange={() => handleToggleChange(p.Id)}
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
      )}

      {role === "Seller" && (
        <div>
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
              placeholder={placeholder}
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
                {products.map((p, index) => (
                  <tr key={p.Id}>
                    <td>{index + 1}</td>
                    <td>{p.productName}</td>
                    <td>{new Date(p.createDate).toLocaleDateString()}</td>
                    <td>{getProductTypeName(p.productType ?? 0)}</td>{" "}
                    <td>{p.productPrice} บาท</td>
                    <td>{p.quantity}</td>
                    <td>
                      <button>แก้ไข</button>
                      <button>ลบ</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {role === "Buyer" && (
        <div>
          <h1>🛒 Store Shop</h1>
          <h2>เลือกซื้อสินค้า / ดูโปรโมชั่น</h2>
          <div>
            <input
              type="text"
              placeholder={placeholder}
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
                  <tr key={p.Id ?? `${p.productName}-${index}`}>
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
        </div>
      )}
    </>
  );
};

export default User;
