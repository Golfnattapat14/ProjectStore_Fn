import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export interface ILoginState {
  username: string;
  password: string;
  [key: string]: ILoginState[keyof ILoginState];
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ILoginState>({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:44355/api/Users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || response.statusText}`);
        return;
      }

      const data = await response.json();

      const role = data.role.toLowerCase();

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", data.username);

      alert("Login success!");

      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "buyer":
          navigate("/buyer");
          break;
        case "seller":
          navigate("/seller");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      alert(
        "Login error: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  };

  return (
    <>
      <div>
        <a href="../">
          <button>Home</button>
        </a>
      </div>
      <br />
      <div className="container min-vh-100">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <form
            className="col-lg-3 col-sm-4 col-8 mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label className="w-100">
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100">
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
        </div>
      </div>
      <Link className="read-the-docs" to="/">
        Back to Home
      </Link>
      <br />
    </>
  );
};

export default Login;
