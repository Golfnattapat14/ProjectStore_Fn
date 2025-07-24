import React, { useState, useEffect } from "react";
import { deleteUser, getProducts, getUsers, updateUser } from "../API/adminApi";
import type { ProductResponse, UpdateUserRequest, User } from "../API/types";
import "./styleAdmin.css";
import { signOut } from "../LockRole";

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState("");

  useEffect(() => {
    setLoadingUsers(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setErrorUsers("");
      })
      .catch((err) => setErrorUsers(err.message || "โหลดผู้ใช้ล้มเหลว"))
      .finally(() => setLoadingUsers(false));
  }, []);

  if (loadingUsers) return <p>กำลังโหลดข้อมูลผู้ใช้...</p>;
  if (errorUsers) return <p style={{ color: "red" }}>{errorUsers}</p>;

  const handleToggleActive = async (user: User) => {
    const updated: UpdateUserRequest = {
      username: user.username,
      role: user.role,
      isDeleted: !user.isDeleted,
    };
    try {
      await updateUser(user.id, updated);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, isDeleted: !u.isDeleted } : u
        )
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("ไม่สามารถอัปเดตสถานะได้");
    }
  };
  const handleDeleteUsers = async (id: string) => {
    const confirmDelete = window.confirm("คุณแน่ใจว่าจะลบผู้ใช้นี้ออกจากระบบ?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(String(err));
      }
    }
  };

  return (
    <div>
      <h2 className="title">จัดการข้อมูลผู้ใช้</h2>
      <table>
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อผู้ใช้</th>
            <th>บทบาท</th>
            <th>ปิดการใช้งาน user</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td>{i + 1}</td>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={!u.isDeleted}
                    onChange={() => handleToggleActive(u)}
                  />
                  <span className="slider round"></span>
                </label>
                <span
                  style={{
                    marginLeft: "10px",
                    fontWeight: 500,
                    color: !u.isDeleted ? "#ff0800ff" : "#2ff902ff",
                  }}
                >
                  {!u.isDeleted ? "Disble" : "Enable"}
                </span>
              </td>

              <td>
                <button onClick={() => alert("แก้ไขผู้ใช้ id:" + u.id)}>
                  แก้ไข
                </button>
                <button 
                className="delete-button"
                onClick={() => handleDeleteUsers(u.id)}
                >ลบผู้ใช้นี้</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState("");
  const [showManageUsers, setShowManageUsers] = useState(false);

  useEffect(() => {
    setLoadingProducts(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setErrorProducts("");
      })
      .catch((err) => setErrorProducts(err.message || "เกิดข้อผิดพลาด"))
      .finally(() => setLoadingProducts(false));
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

  return (
    <div>
      <nav className="admin-navbar">
        <h1 className="title">Admin Dashboard</h1>
        <div className="signout-container">
          <button onClick={() => signOut()} className="signout-button">
            Sign Out
          </button>
        </div>
      </nav>

      <h3 className="title">ข้อมูลสินค้า</h3>
      {loadingProducts && <p>กำลังโหลดข้อมูลสินค้า...</p>}
      {errorProducts && <p style={{ color: "red" }}>{errorProducts}</p>}

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
              <th>แก้ไขสินค้า</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.productName}</td>
                <td>{p.createdByName}</td>
                <td>{new Date(p.createDate).toLocaleDateString()}</td>
                <td>{getProductTypeName(p.productType ?? 0)}</td>
                <td>{p.productPrice} บาท</td>
                <td>
                  <button>แก้ไขสินค้า : {p.productName}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <button onClick={() => setShowManageUsers((prev) => !prev)}>
        {showManageUsers ? "ซ่อนข้อมูลผู้ใช้" : "จัดการข้อมูล User"}
      </button>

      {showManageUsers && <ManageUsers />}
    </div>
  );
};

export default AdminDashboard;
