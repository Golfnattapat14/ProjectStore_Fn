import React, { useState, useEffect, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  type ProductRequest,
  type ProductResponse,
  updateProduct,
} from "../StoreApi";

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Partial<ProductRequest>>({
    ProductName: "",
    ProductPrice: 0,
    ProductType: 0,
    Quantity: 0,
    IsActive: true,
  });

  const [message, setMessage] = useState("");
  const [loading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  if (!id) {
    setMessage("ไม่พบรหัสสินค้า");
    return;
  }

  fetch(`https://localhost:44355/api/products/${id}`)
    .then((res) => {
      if (!res.ok) {
        if(res.status === 404) {
          throw new Error("ไม่พบสินค้ารายการนี้");
        }
        throw new Error("โหลดข้อมูลไม่สำเร็จ");
      }
      return res.json();
    })
    .then((data: ProductResponse) => {
      setProduct({
        Id: data.id,
        ProductName: data.productName,
        ProductPrice: data.productPrice,
        ProductType: data.productType ?? 0,
        Quantity: data.quantity,
        IsActive: data.isActive ?? true,
      });
      setMessage("");
    })
    .catch((err) => setMessage(err.message || "โหลดข้อมูลไม่สำเร็จ"));
}, [id]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "ProductPrice" ||
            name === "Quantity" ||
            name === "ProductType"
          ? Number(value)
          : value,
    }));
  };

  const handleSave = async (e?: React.MouseEvent) => {
    e?.preventDefault();

    if (!id) return;

    if (
      !product.ProductName ||
      (product.ProductPrice ?? 0) <= 0 ||
      (product.Quantity ?? 0) < 0 ||
      product.ProductType! < 0 ||
      product.ProductType! > 3
    ) {
      setMessage("กรุณากรอกข้อมูลให้ถูกต้อง และประเภทสินค้าต้องอยู่ระหว่าง 0 ถึง 3");
      return;
    }

    try {
      setSaving(true);
      setMessage("กำลังบันทึก...");
      await updateProduct(id, {
        Id: product.Id ?? id,
        ProductName: product.ProductName ?? "",
        ProductPrice: product.ProductPrice ?? 0,
        ProductType: product.ProductType ?? 0,
        Quantity: product.Quantity ?? 0,
        IsActive: product.IsActive ?? true,
      });
      setMessage("บันทึกเรียบร้อยแล้ว");
      setTimeout(() => navigate("/seller"), 1500);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessage("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>กำลังโหลดข้อมูลสินค้า...</p>;

  return (
    <div className="edit-page">
      <h2>แก้ไขสินค้า</h2>
      <label htmlFor="productName">
        ชื่อสินค้า:
        <input
          id="productName"
          type="text"
          name="ProductName"
          value={product.ProductName ?? ""}
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
          value={product.ProductPrice ?? 0}
          onChange={handleChange}
          min={0}
          aria-required="true"
          disabled={saving}
        />
      </label>
      <label htmlFor="productType">
        ประเภทสินค้า (0=อาหาร,1=เครื่องใช้,2=เครื่องดื่ม,3=ของเล่น):
        <input
          id="productType"
          type="number"
          name="ProductType"
          value={product.ProductType ?? 0}
          onChange={handleChange}
          min={0}
          max={3}
          disabled={saving}
        />
      </label>
      <label htmlFor="quantity">
        จำนวน:
        <input
          id="quantity"
          type="number"
          name="Quantity"
          value={product.Quantity ?? 0}
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
          checked={product.IsActive ?? false}
          onChange={handleChange}
          disabled={saving}
        />
        <span>เปิดใช้งาน</span>
      </label>

      <div>
        <button onClick={handleSave} disabled={saving}>
          {saving ? "กำลังบันทึก..." : "บันทึก"}
        </button>
        <button onClick={() => navigate("/seller")} disabled={saving}>
          ยกเลิก
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditProductPage;
