import React from "react";
import "../static/css/AccountDropdown.css";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";

const AccountDropdown = () => {
  const navigate = useNavigate();

  const { staff } = useGlobalContext();
  const handlelogout = () => {
    localStorage.removeItem("staff");
    navigate("/");
  };
  return (
    <div className="account-dropdown">
      <div className="account-item">
        <span>#000{staff.Staff_id} </span>
      </div>
      <div className="account-item">
        <span>{staff.User_Name}</span>
      </div>
      <div className="account-item">
        <span>Last login: Today 10:00 AM</span>
      </div>
      <div className="account-item-but">
        <button>Settings</button>
        <button onClick={handlelogout}>Log Out</button>
      </div>
    </div>
  );
};

export default AccountDropdown;
