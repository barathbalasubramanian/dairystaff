import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import "../static/css/sp.css";
import Search from "./Search";

const Sp = () => {
  const navigate = useNavigate();
  const { sp } = useGlobalContext();
  const [tab, setTab] = useState("Availabe");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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
            <p className="flex items-center text-sm gap-1">
              <span role="img" aria-label="email">📧</span> {item.Email}
            </p>
            <p className="flex items-center text-sm gap-1">
              <span role="img" aria-label="phone">📞</span> {item.Phno}
            </p>
          </div>
        </div>

        <button className="bg-[#00ccb1] text-white mt-4 w-full py-2 rounded transition">
          Connect 📞
        </button>
      </div>
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
    );
  };

  // Updated filter logic for both Type and Cluster
  const filterItems = (items) => {
    return items.filter((item) => {
      // Type filter logic: Convert filter to match corresponding item.Type
      const typeMatch =
        typeFilter === ""
          ? true
          : (typeFilter === "VETER" && item.Type === 1) ||
          (typeFilter === "AI" && item.Type === 2)|| 
            (typeFilter === "Feed" && item.Type === 3)|| 
            (typeFilter === "Insurance" && item.Type === 4)|| 
            (typeFilter === "Loan" && item.Type === 5);

      // Cluster filter logic: Check if the item's ClusterName matches the selected status filter
      const statusMatch = statusFilter ? item.ClusterName === statusFilter : true;

      // Return true only if both type and status match
      return typeMatch && statusMatch;
    });
  };

  // Clear filters function
  const clearFilters = () => {
    setTypeFilter("");
    setStatusFilter("");
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

          {/* Filter Options */}
          <div className="flex flex-col justify-center py-4  px-32 w-full">
            <div className="font-medium text-lg py-4">Filter :</div>
            <div className="w-full flex justify-center  gap-4 items-center p-4 bg-gray-100 rounded-lg shadow-lg transition-all duration-300">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-2 flex-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none"
              >
                <option value="">All Types</option>
                <option value="VETER">Veterinary</option>
                <option value="AI">AI</option>
                <option value="Feed">Feed</option>
                <option value="Insurance">Insurance</option>
                <option value="Loan">Loan</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 flex-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none"
              >
                <option value="">All Clusters</option>
                <option value="cluster1">Cluster 1</option>
                <option value="cluster2">Cluster 2</option>
                <option value="cluster3">Cluster 3</option>
              </select>
              {/* Clear Filters Button */}
              <button
                onClick={clearFilters}
                className="bg-red-500 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {tab === "Availabe" && (
            <div className="sp-cards">
              {filterItems(sp.Availabe).map((item, index) => Card(item, index))}
            </div>
          )}

          {tab === "UnAvailable" && (
            <div className="sp-cards">
              {filterItems(sp.UnAvailable).map((item, index) => UnCard(item, index))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sp;
