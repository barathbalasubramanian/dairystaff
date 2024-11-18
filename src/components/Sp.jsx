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
      <div className="bg-white shadow-lg rounded-lg p-4 m-4 w-[20em]" id={index}>

        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <div>
            <p className="text-xl font-medium capitalize text-gray-800">{item.Name}</p>
            <p className="text-gray-500 text-sm">ID: {item.Doctor_id}</p>
          </div>
          <span className="flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span> 
            <span className="text-sm text-green-500">Available</span>
          </span>
        </div>

        <div className="space-y-2 space-x-1">
          <button className="bg-black capitalize text-white px-3 py-1 rounded transition">
            {item.ClusterName}
          </button>
          <button className={`bg-green-500 text-white px-3 py-1 rounded transition`}>
            {item.Type === 1 ? 'VETERINARY' : 'AI'}
          </button>

          <div className="text-gray-600 pt-2">
            <p className="flex items-center text-sm gap-2 mb-1">
              <span role="img" aria-label="email" className="">
                <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-600"
                    >
                      {/* SVG Path */}
                      <path
                        d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L4 8V18H20V8L12 13ZM12 11L20 6H4L12 11ZM4 8V6V18V8Z"
                        fill="currentColor"
                      />
                </svg>
              </span> {item.Email}
            </p>
            <p className="flex items-center text-sm gap-2">
              <span role="img" aria-label="phone" className="">
                <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-600"
                      >
                        {/* SVG Path */}
                        <path
                          d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
                          fill="currentColor"
                        />
                </svg>
              </span> {item.Phno}
            </p>
          </div>
        </div>

        <button className="bg-[#00ccb1] text-white mt-4 w-full py-2 rounded transition">
          Connect 📞
        </button>

      </div>

      // <div className="sp-card" id={index}>
      //   <div className="sp-card-header">
      //     <p className="sp-id">{item.Doctor_id}</p>
      //     <p className="sp-name">{item.Name}</p>
      //     <span className="sp-status">
      //       <span className="sp-dot"></span> Available
      //     </span>
      //   </div>
      //   <div className="sp-card-body">
      //     <button className="sp-btn sp-cluster">
      //       Cluster: {item.ClusterName}
      //     </button>
      //     {item.Type === 1 ? (
      //       <button className="sp-btn sp-department">VETRINARY</button>
      //     ) : (
      //       <button className="sp-btn sp-department">AI</button>
      //     )}

      //     <div className="sp-contact-info">
      //       <p className="sp-email">📧 {item.Email}</p>
      //       <p className="sp-phone">📞 {item.Phno}</p>
      //     </div>
      //   </div>
      //   <button className="sp-connect-btn">Connect 📞</button>
      // </div>
    );
  };

  const UnCard = (item, index) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-5 m-4 w-[20em]" id={index}>

        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <div>
            <p className="text-lg font-medium capitalize text-gray-800">{item.Name}</p>
            <p className="text-gray-500">ID: {item.Doctor_id}</p>
          </div>
          <span className="text-sm font-medium text-red-600 w-[42%]">
            Available On: 
            <span className="font-medium text-red-600 ml-1">{dateconvert(item.Availableon)}</span>
          </span>
        </div>

        <div className="space-y-3 space-x-2">
          <button className="bg-black text-white px-3 py-1 rounded transition">
            Cluster: {item.ClusterName}
          </button>
          <button className={`bg-green-500 text-white px-3 py-1 rounded transition`}>
            {item.Type === 1 ? 'VETERINARY' : 'AI'}
          </button>
          
          {/* Contact Information */}
          <div className="text-gray-600 pt-2">
            <p className="flex items-center text-[14px]">
              <span role="img" aria-label="email" className="mr-1">📧</span>
              {item.Email}
            </p>
            <p className="flex items-center text-[14px]">
              <span role="img" aria-label="phone" className="mr-1">📞</span>
              {item.Phno}
            </p>
          </div>

          {/* Comments Section */}
          <div className="space-y-1 pt-4">
            <label htmlFor="comments" className="text-gray-700 font-medium">Comment:</label>
            <textarea
              id="comments"
              rows="4"
              placeholder="Some other comments..."
              value={item.Reason}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none"
            ></textarea>
          </div>
        </div>

      </div>

      // <div className="spu-card" id={index}>
      //   <div className="spu-card-header">
      //     <div className="spu-card-name">
      //       <p className="spu-id">{item.Doctor_id}</p>
      //       <p className="spu-name">{item.Name}</p>
      //     </div>

      //     <span className="spu-status">
      //       Available On
      //       <span className="spu-date">{dateconvert(item.Availableon)}</span>
      //     </span>
      //   </div>
      //   <div className="spu-card-body">
      //     <button className="spu-btn spu-cluster">
      //       Cluster: {item.ClusterName}
      //     </button>
      //     {item.Type === 1 ? (
      //       <button className="sp-btn spu-department">VETRINARY</button>
      //     ) : (
      //       <button className="sp-btn spu-department">AI</button>
      //     )}
      //     <div className="spu-contact-info">
      //       <p className="spu-email">📧 {item.Email}</p>
      //       <p className="spu-phone">📞 {item.Phno}</p>
      //     </div>
      //     <div className="spu-comments-section">
      //       <label htmlFor="spu-comments">Comment:</label>
      //       <textarea
      //         id="comments"
      //         rows="4"
      //         placeholder="Some thing Else Comments..."
      //         value={item.Reason}
      //       ></textarea>
      //     </div>
      //   </div>
      // </div>
    );
  };
  

  return (
    <>
      <div className="sp-container">
        <Search />
        <div className="sp-box">
          <div className="flex space-x-4 w-[80%] items-center justify-center m-auto">
            <div className="sp-inputgroup">
              <button
                onClick={() => setTab("Availabe")}
                className={`py-2 px-4 rounded-lg transition-colors duration-200 
                  ${tab === "Availabe" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
              >
                Available
              </button>
            </div>
            
            <div className="sp-inputgroup">
              <button
                onClick={() => setTab("UnAvailable")}
                className={`py-2 px-4 rounded-lg transition-colors duration-200 
                  ${tab === "UnAvailable" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
              >
                Unavailable
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
