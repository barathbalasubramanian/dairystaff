import React, { useState } from "react";
import "../static/css/Login.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import loginimg from "../static/img/loginimg.png";
import { useGlobalContext } from "../Context";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { loginStaff } = useGlobalContext();
  
  const handlelogin = async () => {
    await loginStaff(name, password);
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="login-container">
        <div className="welcome-page">
          <img
            src={loginimg}
            alt="Background"
            className="background-image"
            height={"100vh"}
          />
          <div className="header">
            <div className="logo">
              <svg
                width="70"
                height="52"
                viewBox="0 0 70 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="26"
                  cy="26"
                  r="23.5"
                  stroke="black"
                  strokeWidth="5"
                />
                <circle
                  cx="52.5"
                  cy="26.5"
                  r="15"
                  stroke="black"
                  strokeWidth="5"
                />
              </svg>
              Logo
            </div>
          </div>
          <div className="demo-content">
            <h1 className="text-3xl font-semibold">Welcome</h1>
            <p className="text-lg font-medium text-gray-700">Login to Continue access</p>
          </div>
        </div>
        <div className="login-box">
          <div className="py-6">
            <h2 className="text-3xl font-medium">Login</h2>
          </div>
          <div className="login-form">
            <form>
              <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="outline-none"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="outline-none"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </form>
            {/* <Link to="/ticketDetails"> */}
            <button className="login-but mt-10" onClick={handlelogin}>
              Login
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
