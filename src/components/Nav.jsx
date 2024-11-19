import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../static/img/Dashboard.png";
import { useGlobalContext } from "../Context";
import {
  User,
  Ticket,
  ClipboardCheck,
  Users,
  ShoppingCart,
  UserCheck,
  LogOut
} from 'lucide-react';

const Nav = () => {
  const navigate = useNavigate();
  const { staff } = useGlobalContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navigationItems = [
    {
      to: "/ticketDetails",
      icon: <Ticket className="w-6 h-6" />,
      label: "Tickets"
    },
    {
      to: "/formerId",
      icon: <ClipboardCheck className="w-6 h-6" />,
      label: "ID Verify"
    },
    {
      to: "/formerDetails",
      icon: <Users className="w-6 h-6" />,
      label: "Farmer Details"
    },
    {
      to: "/feed",
      icon: <ShoppingCart className="w-6 h-6" />,
      label: "Products"
    },
    {
      to: "/sp",
      icon: <UserCheck className="w-6 h-6" />,
      label: "SP Availability"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0e2740] text-white p-4 w-[254px]">
      <div className="space-y-4">
        <div className="flex flex-col items-center space-y-3  ">
          <svg
            width="90"
            height="67"
            viewBox="0 0 70 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-2"
          >
            <circle
              cx="26"
              cy="26"
              r="23.5"
              stroke="white"
              strokeWidth="5"
            />
            <circle
              cx="52.5"
              cy="26.5"
              r="15"
              stroke="white"
              strokeWidth="5"
            />
          </svg>
          <img src={Image} alt="Dashboard" className="w-full max-w-[180px]" />
        </div>

        {/* User Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-300">
                #{String(staff?.Staff_id || '000').padStart(3, '0')}
              </div>
              <div className="font-semibold text-lg">
                {staff?.User_Name || 'User'}
              </div>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {item.icon}
              </div>
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 text-left mt-1"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <LogOut className="w-6 h-6" />
            </div>
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Nav;