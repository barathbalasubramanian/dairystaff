import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "../static/css/FormerID.css";
import { useGlobalContext } from "../Context";
import Search from "./Search";

const FormerID = () => {
  const [id, setId] = useState(-1);
  const { setLoading, checkFormerId, staff } = useGlobalContext();
  const navigate = useNavigate();

  const handleclick = async () => {
    setLoading(true);
    const val = await checkFormerId(id);
    setLoading(false);
    if (val == 1) {
      navigate("/formerDetails");
    }
  };

  return (
    <>
      <div className="formerid-containter">
        <Search />
        <div className="formerdemo">
          <div className="formerid-box">
            <input
              type="text"
              placeholder="Enter Former ID"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <div className="formerid-but">
              <button onClick={handleclick}>Verify</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormerID;
