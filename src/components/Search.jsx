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
      <div className="search">
        <div className="search-parent">
          <input type="text" placeholder="Search" />
        </div>
        <div className="manage">
          <div className="drop">
            <h3>Manage Account</h3>
            <img className="manage-accounts-icon" alt="" src={account} />
            <img
              className="arrow-drop-down-icon"
              onClick={toggleDropdown}
              alt=""
              src={arrow}
            />
          </div>

          {dropdownVisible && <AccountDropdown />}
        </div>
      </div>
    </>
  );
};

export default Search;
