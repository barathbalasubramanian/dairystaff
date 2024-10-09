import React, { useState } from "react";
import "../static/css/Login.css";
import { Link, useNavigate,Navigate } from "react-router-dom";
import loginimg from "../static/img/loginimg.png";
import { useGlobalContext } from "../Context";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { Register } = useGlobalContext();


  const handleRegister = async () => {
    await Register(name, password);
  };

  const handleLogin = () => {
    navigate("/");
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
            <h1>Welcome Page</h1>
            <p>Register to Continue access</p>
          </div>
        </div>
        <div className="login-box">
          <div className="login-head">
            <h2>Register</h2>
          </div>
          <div className="login-form">
            <form>
              <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  placeholder="Name"
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </form>
            <button className="login-but" onClick={handleRegister}>
              Register
            </button>
            <button className="login-but" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
