import React, { useState } from "react";
import AccountDropdown from "./AccountDropdown";
import account from "../static/img/manage.png";
import arrow from "../static/img/arrow-drop-down.svg";
import "../static/css/Search.css";

const Search = () => {
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setdropdownVisible(!dropdownVisible);
  };
  return (
    <>
      <div className="search px-4 py-3">
        <div className="">
          <input type="text" placeholder="Search" className="w-[180%] px-2 py-[3px] pl-3 rounded-sm outline-none border-none" />
        </div>
        <div className="manage cursor-pointer" onClick={toggleDropdown}>
          <div className="drop">
            <h3>Manage Account</h3>
            <img className="manage-accounts-icon" alt="" src={account} />
          </div>

          {dropdownVisible && <AccountDropdown />}
        </div>
      </div>
    </>
  );
};

export default Search;
