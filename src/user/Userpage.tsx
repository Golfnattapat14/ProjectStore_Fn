import React, { useState, useRef, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

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
          <div>
            <table>
              <thead>
                <tr>
                  <th>รายการสินค้า</th>
                  <th>จำหน่ายโดย</th>
                  <th>วันที่วางจำหน่าย</th>
                  <th>ประเภทสินค้า</th>
                  <th>ราคา</th>
                  <th>การจัดการ</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      )}

      {role === "Seller" && (
        <div>
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
          <div>
            <table>
              <thead>
                <tr>
                  <th>รายการสินค้า</th>
                  <th>วันที่วางจำหน่าย</th>
                  <th>ประเภทสินค้า</th>
                  <th>ราคา</th>
                  <th>เพิ่มรายการสินค้า</th>
                  <th>การจัดการ</th>
                </tr>
              </thead>
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
          <div>
            <table>
              <thead>
                <tr>
                  <th>รายการสินค้า</th>
                  <th>วันที่วางจำหน่าย</th>
                  <th>จำหน่ายโดย</th>
                  <th>ประเภทสินค้า</th>
                  <th>ราคา</th>
                  <th>Action</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
