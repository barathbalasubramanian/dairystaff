import React from "react";
import Nav from "../components/Nav";
import Feed from "../components/Feed";
import "../static/css/MainPage.css";
import useAuth from "./UseAuth";
import { useState } from "react";

const FeedPage = () => {
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
          <Feed  />
        </div>
      </div>
    </>
  );
};

export default FeedPage;
