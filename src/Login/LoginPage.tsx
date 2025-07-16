import { Link } from "react-router-dom";
import React, { useState } from 'react';

export interface ILoginState{
  username : string;
  password : string;
  [key : string]:ILoginState[keyof ILoginState];
}
  
  

const Login: React.FC = () => {


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
    console.log("Registering with:", formData);
  };

  return (
    <>
      <div>
        <a href="../">
          <button>Home</button>
        </a>
      </div><br />
      <div className="container min-vh-100">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <form className="col-lg-3 col-sm-4 col-8 mx-auto" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
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
