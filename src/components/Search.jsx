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
