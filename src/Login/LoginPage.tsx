import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUserJSON = localStorage.getItem("registeredUser");
    if (!savedUserJSON) {
      alert("No user registered. Please register first.");
      return;
    }

    const savedUser = JSON.parse(savedUserJSON);
    if (
      formData.username === savedUser.username &&
      formData.password === savedUser.password
    ) {
      alert("Login success!");

      localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
      switch (savedUser.role.toLowerCase()) {
        case "admin":
          navigate("/admin");
          break;
        case "seller":
          navigate("/seller");
          break;
        case "buyer":
          navigate("/buyer");
          break;
        default:
          navigate("/");
          break;
      }
    } else {
      alert("Invalid username or password.");
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
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={handleSubmit}
            >
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
