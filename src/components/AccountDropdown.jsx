import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";

const AccountDropdown = () => {
  const navigate = useNavigate();
  const { staff } = useGlobalContext();

  const handleLogout = () => {
    localStorage.removeItem("staff");
    navigate("/");
  };

  return (
    <div className="absolute z-50 bg-[#0e2741db] p-6 rounded-lg w-64 text-white font-sans right-4 top-16 shadow-lg">
      <div className="mb-4 text-lg">
        <span className="font-medium">#000{staff.Staff_id}</span>
      </div>
      <div className="mb-4 text-lg">
        <span className="font-medium">{staff.User_Name}</span>
      </div>
      <div className="mb-4 text-sm text-gray-300">
        <span>Last login: Today 10:00 AM</span>
      </div>
      <div className="flex justify-between mt-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white w-[48%] h-9 rounded transition-colors">
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white w-[48%] h-9 rounded transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AccountDropdown;
