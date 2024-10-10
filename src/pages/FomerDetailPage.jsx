import React from "react";
import Nav from "../components/Nav";
import FormerDetails from "../components/FormerDetails";
import "../static/css/MainPage.css";
import useAuth from "./UseAuth";
import { useState } from "react";

const FormerDetailsPage = ({ formerId }) => {
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
          <FormerDetails formerId={formerId} />
        </div>
      </div>
    </>
  );
};

export default FormerDetailsPage;