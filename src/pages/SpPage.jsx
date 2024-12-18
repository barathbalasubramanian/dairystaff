import React from "react";
import Nav from "../components/Nav";
import Sp from "../components/Sp";
import "../static/css/MainPage.css";
import useAuth from "./UseAuth";
import { useState } from "react";

const SpPage = () => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useAuth(() => setIsAuthChecked(true)); 
  if (!isAuthChecked) {
    return <div>Loading...</div>; 
  }
  return (
    <>
      <div className="main-box">
        <div className="main-nav">
          <Nav />
        </div>
        <div className="main-content">
        <Sp />
        </div>
      </div>
    </>
  );
};

export default SpPage;