import React, { useState } from "react";
import Nav from "../components/Nav";
import TicketStatus from "../components/TicketStatus";
import "../static/css/MainPage.css";
import useAuth from "./UseAuth";

const TicketStatusPage = ({ formerId }) => {
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
          <TicketStatus  />
        </div>
      </div>
    </>
  );
};

export default TicketStatusPage;
