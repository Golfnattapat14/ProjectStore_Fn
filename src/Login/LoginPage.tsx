import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { loginUser, type ILoginState } from "../StoreApi";
import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ILoginState>({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevState: ILoginState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginUser(formData);
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);
      localStorage.setItem("role", result.role.toLowerCase());

      alert("Login success!");
      switch (result.role.toLowerCase()) {
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
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Login error occurred.");
    }
  };

  return (
    <>
      <div className="container min-vh-100">
            <h1>Login</h1>

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
            <button
              type="button"
              className="btn btn-home"
              onClick={() => navigate("/")}
            >
              Back to lobby
            </button>
          </form>
        </div>
      </div>
     
      <br />
    </>
  );
};

export default Login;
