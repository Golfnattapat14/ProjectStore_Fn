import React, { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "../API/sellerApi";
import type { ProductRequest } from "../API/types";

import "./Seller&edit.css";

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("user");
  const currentUser = savedUser ? JSON.parse(savedUser) : null;

  const [product, setProduct] = useState<ProductRequest>({
    ProductName: "",
    ProductPrice: 0,
    ProductType: 5,
    Quantity: 0,
    IsActive: true,
    CreateBy: currentUser?.username || "",
  });

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, checked } = e.target;

  let newValue: string | number | boolean;

  if (type === "checkbox") {
    newValue = checked;
  } else if (["ProductPrice", "Quantity", "ProductType"].includes(name)) {
    newValue = Number(value);
  } else {
    newValue = value;
  }

  setProduct(prev => ({
    ...prev,
    [name]: newValue,
  }));
};


  const handleSave = async (e?: React.MouseEvent) => {
    e?.preventDefault();

    if (
      !product.ProductName.trim() ||
      product.ProductPrice <= 0 ||
      product.Quantity < 0 ||
      product.ProductType < 1 ||
      product.ProductType > 5
    ) {
      setMessage(
        "กรุณากรอกข้อมูลให้ถูกต้อง และประเภทสินค้าต้องอยู่ระหว่าง 1 ถึง 5"
      );
      return;
    }

    try {
      setSaving(true);
      setMessage("กำลังบันทึก...");

      await addNewProduct(product);

      setMessage("เพิ่มสินค้าเรียบร้อยแล้ว");
      setTimeout(() => navigate("/seller"), 1500);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessage("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-page">
      <h2>เพิ่มสินค้าใหม่</h2>
      <label htmlFor="productName">
        ชื่อสินค้า:
        <input
          id="productName"
          type="text"
          name="ProductName"
          value={product.ProductName}
          onChange={handleChange}
          aria-required="true"
          disabled={saving}
        />
      </label>
      <label htmlFor="productPrice">
        ราคา:
        <input
          id="productPrice"
          type="number"
          name="ProductPrice"
          value={product.ProductPrice}
          onChange={handleChange}
          min={0}
          aria-required="true"
          disabled={saving}
        />
      </label>
      <label htmlFor="productType">
        <center>
          ประเภทสินค้า
          <br />
          1=อาหาร
          <br />
          2= เครื่องใช้
          <br />
          3= เครื่องดื่ม
          <br />
          4= ของเล่น
          <br />
          5= อื่นๆ
        </center>

        <input
          id="productType"
          type="number"
          name="ProductType"
          value={product.ProductType}
          onChange={handleChange}
          min={1}
          max={5}
          disabled={saving}
        />
      </label>
      <label htmlFor="quantity">
        จำนวน:
        <input
          id="quantity"
          type="number"
          name="Quantity"
          value={product.Quantity}
          onChange={handleChange}
          min={0}
          aria-required="true"
          disabled={saving}
        />
      </label>
      <label htmlFor="isActive">
        <input
          id="isActive"
          type="checkbox"
          name="IsActive"
          checked={product.IsActive}
          onChange={handleChange}
          disabled={saving}
        />
        <span>เปิดใช้งาน</span>
      </label>

      <div>
        <button onClick={handleSave} disabled={saving}>
          {saving ? "กำลังบันทึก..." : "เพิ่มสินค้า"}
        </button>
        <button onClick={() => navigate("/seller")} disabled={saving}>
          ยกเลิก
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProductPage;
