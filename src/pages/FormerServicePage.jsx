import React from "react";
import Nav from "../components/Nav";
import FormerService from "../components/FormerService";
import "../static/css/MainPage.css";
import useAuth from "./UseAuth";
import { useState } from "react";

const FormerServicePage = ({ formerId }) => {
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
        <FormerService formerId={formerId} />
        </div>
      </div>
    </>
  );
};

export default FormerServicePage;
