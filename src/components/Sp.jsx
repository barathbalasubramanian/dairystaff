import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import "../static/css/sp.css";
import Search from "./Search";

const Sp = () => {
  const navigate = useNavigate();
  const { sp } = useGlobalContext();
  const [tab, setTab] = useState("Availabe");

  const dateconvert = (isoDate) => {
    const dateObj = new Date(isoDate);

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); 
    const year = dateObj.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const Card = (item, index) => {
    return (
      <div className="sp-card" id={index}>
        <div className="sp-card-header">
          <p className="sp-id">{item.Doctor_id}</p>
          <p className="sp-name">{item.Name}</p>
          <span className="sp-status">
            <span className="sp-dot"></span> Available
          </span>
        </div>
        <div className="sp-card-body">
          <button className="sp-btn sp-cluster">
            Cluster: {item.ClusterName}
          </button>
          {item.Type === 1 ? (
            <button className="sp-btn sp-department">VETRINARY</button>
          ) : (
            <button className="sp-btn sp-department">AI</button>
          )}

          <div className="sp-contact-info">
            <p className="sp-email">📧 {item.Email}</p>
            <p className="sp-phone">📞 {item.Phno}</p>
          </div>
        </div>
        <button className="sp-connect-btn">Connect 📞</button>
      </div>
    );
  };
  const UnCard = (item, index) => {
    return (
      <div className="spu-card" id={index}>
        <div className="spu-card-header">
          <div className="spu-card-name">
            <p className="spu-id">{item.Doctor_id}</p>
            <p className="spu-name">{item.Name}</p>
          </div>

          <span className="spu-status">
            Available On
            <span className="spu-date">{dateconvert(item.Availableon)}</span>
          </span>
        </div>
        <div className="spu-card-body">
          <button className="spu-btn spu-cluster">
            Cluster: {item.ClusterName}
          </button>
          {item.Type === 1 ? (
            <button className="sp-btn spu-department">VETRINARY</button>
          ) : (
            <button className="sp-btn spu-department">AI</button>
          )}
          <div className="spu-contact-info">
            <p className="spu-email">📧 {item.Email}</p>
            <p className="spu-phone">📞 {item.Phno}</p>
          </div>
          <div className="spu-comments-section">
            <label htmlFor="spu-comments">Comment:</label>
            <textarea
              id="comments"
              rows="4"
              placeholder="Some thing Else Comments..."
              value={item.Reason}
            ></textarea>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <>
      <div className="sp-container">
        <Search />
        <div className="sp-box">
          <div className="sp-tabs">
            <div className="sp-inputgroup">
              <button
                onClick={() => setTab("Availabe")}
                className={tab === "Availabe" ? "active" : ""}
              >
                Available
              </button>
            </div>
            <div className="sp-inputgroup">
              <button
                onClick={() => setTab("UnAvailable")}
                className={tab === "UnAvailable" ? "active" : ""}
              >
                UnAvailable
              </button>
            </div>
          </div>
          {tab === "Availabe" && (
            <>
              <div className="sp-cards">
                {sp.Availabe.map((item, index) => Card(item, index))}
              </div>
            </>
          )}

          {tab === "UnAvailable" && (
            <>
              <div className="spu-cards">
                {sp.UnAvailable.map((item, index) => UnCard(item, index))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sp;
