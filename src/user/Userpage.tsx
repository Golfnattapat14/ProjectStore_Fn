import React, { useState, useRef, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const User: React.FC<SearchBarProps> = ({
  onSearch = () => {},
  placeholder = "ค้นหาสินค้าที่ต้องการ ...",
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

      <h1>Welcome to Store</h1>
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
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default User;
