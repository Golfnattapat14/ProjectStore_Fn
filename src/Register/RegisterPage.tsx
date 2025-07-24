import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../API/authApi";
import "./Register.css";

type RoleType = "Buyer" | "Seller" | "Admin";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  role: RoleType;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const Role = ["Buyer", "Seller", "Admin"] as const;
  const hideRole = ["Admin"];
  const visibleRole = Role.filter((role) => !hideRole.includes(role));

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
    role: visibleRole[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password not match");
      return;
    }

    const dataToSend = {
      username: formData.username,
      password: formData.password,
      role: formData.role,
    };

    try {
      const result = await registerUser(dataToSend);
      alert("Register Success! User ID: " + result.id);
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Unexpected error occurred.");
      }
    }
  };

  return (
    <>
    
      <div className="container min-vh-100">
        <h1>Register</h1>
        <div className="row min-vh-100 justify-content-center align-items-center">
          <form
            className="col-lg-3 col-sm-4 col-8 mx-auto register-form"
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
                  required
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
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100">
                Confirm Password:
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="w-100">
                Role:
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-control"
                >
                  {visibleRole.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-submit">
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
    </>
  );
};

export default Register;
