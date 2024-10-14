import { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "../static/css/TicketDetails.css";
import { useGlobalContext } from "../Context";
import Search from "./Search";
import { Filter } from "react-feather"; // Import Filter icon
import { FaFilter, FaTimes } from "react-icons/fa"; // For filter and close icons

const TicketDetails = () => {
  const navigate = useNavigate();
  const {
    loading,
    setLoading,
    TicketData,
    getTicketData,
    GetTicketDetails,
    staff,
  } = useGlobalContext();

  const [tab, setTab] = useState("live");
  const [showFilters, setShowFilters] = useState(false); // Filter dropdown state
  const [statusFilter, setStatusFilter] = useState(""); // New state for status filter
  const [typeFilter, setTypeFilter] = useState(""); // New state for type filter
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order
  const [assignedDateFilter, setAssignedDateFilter] = useState(""); // State for assigned date filter


  const handleclick = async (id) => {
    setLoading(true);
    await GetTicketDetails(id);
    setLoading(false);
    navigate("/ticketStatus");
  };

// Filtered and sorted tickets logic
const filterAndSortTickets = (tickets) => {
  let filtered = tickets;

  // Apply former ID filter
  if (statusFilter) {
    const numericFormerID = Number(statusFilter);
    filtered = filtered.filter(
      (item) => item.formerID && Number(item.formerID) === numericFormerID
    );
  }

  // Apply service type filter
  if (typeFilter) {
    filtered = filtered.filter(
      (item) => item.serviceType && item.serviceType.toLowerCase() === typeFilter.toLowerCase()
    );
  }

  // Apply assigned date filter
  if (assignedDateFilter) {
    const selectedDate = new Date(assignedDateFilter).setHours(0, 0, 0, 0);
    filtered = filtered.filter((item) => {
      const itemDate = new Date(item.assignedDateTime).setHours(0, 0, 0, 0);
      return itemDate === selectedDate; // Compare dates
    });
  }

  // Apply sorting by Ticket ID
  filtered.sort((a, b) =>
    sortOrder === "asc"
      ? a.ticketNumber - b.ticketNumber
      : b.ticketNumber - a.ticketNumber
  );

  return filtered;
};


  const renderTable = (tabData, title) => (
    <>
      <h4 className="py-6">{title}</h4>
      {tabData.length === 0 && (
        <div className="no-data">
          <h5>No Data Found!</h5>
        </div>
      )}
      {tabData.length > 0 && (
        <table className="ticketDetails-table">
          <thead className="ticketDetails-tablehead">
            <tr>
              <th className="font-medium">Ticket Number</th>
              <th className="font-medium">Former ID</th>
              <th className="font-medium">Service Type</th>
              <th className="font-medium">Assigned Date & Time</th>
              <th className="font-medium">Assigned By</th>
              <th className="font-medium">Show</th>
            </tr>
          </thead>
          <tbody className="ticketDetails-tablebody">
            {filterAndSortTickets(tabData).map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  handleclick(item.ticketNumber);
                }}
              >
                <td>{item.ticketNumber}</td>
                <td>{item.formerID}</td>
                <td>{item.serviceType}</td>
                <td>
                  {new Date(item.assignedDateTime).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                    timeZone: "UTC",
                  })}
                </td>
                <td>{item.assignedBy}</td>
                <td>
                  <button
                    onClick={() => {
                      handleclick(item.ticketNumber);
                    }}
                  >
                    View Ticket
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );

  return (
    <div className="ticketDetails-container">
      <Search />
      <div className="ticketDetails-box">
<<<<<<< HEAD
        {/* Filter Icon */}
        <div className="filter-controls">
          {!showFilters ? (
            <FaFilter className="filter-icon" onClick={() => setShowFilters(true)} />
          ) : (
            <div className="filter-section">
          <input
            type="number"
            value={statusFilter} // Former ID filter
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Enter Former ID"
          />

          <select
            value={typeFilter} // Service Type filter
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Veterinary">Veterinary</option>
            <option value="AI">AI</option>
            <option value="Feed">Feed</option>
            <option value="Insurance">Insurance</option>
            <option value="Loan">Loan</option>
          </select>

          <input
            type="date" // Date filter for Assigned Date & Time
            value={assignedDateFilter} // New state for date filter
            onChange={(e) => setAssignedDateFilter(e.target.value)} // Handle date change
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort Ascending</option>
            <option value="desc">Sort Descending</option>
          </select>

          <FaTimes className="close-icon" onClick={() => setShowFilters(false)} />
        </div>

          )}
        </div>

        {/* Ticket Tabs */}
        <div className="ticketDetails-tabs">
=======

        {/* <div className="ticketDetails-tabs">
>>>>>>> 739e4cca87c3fd66c4e11ba74811e8263e5eaae6
          <div className="ticketDetails-inputgroup">
            <button
              onClick={() => setTab("live")}
              className={tab === "live" ? "active" : ""}
            >
              Live
            </button>
          </div>
          <div className="ticketDetails-inputgroup">
            <button
              onClick={() => setTab("pendingApproval")}
              className={tab === "pendingApproval" ? "active" : ""}
            >
              Pending Approval
            </button>
          </div>
          <div className="ticketDetails-inputgroup">
            <button
              onClick={() => setTab("completed")}
              className={tab === "completed" ? "active" : ""}
            >
              Completed
            </button>
          </div>
        </div> */}
 
        <div className="flex space-x-4 mt-4 pb-4 w-[90%] m-auto">
          <div className="ticketDetails-inputgroup">
            <button
              onClick={() => setTab("live")}
              className={`py-2 px-6 rounded-full transition-all duration-300 
                ${tab === "live" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Live
            </button>
          </div>

          <div className="ticketDetails-inputgroup">
            <button
              onClick={() => setTab("pendingApproval")}
              className={`py-2 px-6 rounded-full transition-all duration-300 
                ${tab === "pendingApproval" ? "bg-yellow-500 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Pending Approval
            </button>
          </div>

          <div className="ticketDetails-inputgroup">
            <button
              onClick={() => setTab("completed")}
              className={`py-2 px-6 rounded-full transition-all duration-300 
                ${tab === "completed" ? "bg-green-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Completed
            </button>
          </div>
        </div>

<<<<<<< HEAD
        {/* Ticket Tables */}
=======
>>>>>>> 739e4cca87c3fd66c4e11ba74811e8263e5eaae6
        <div className="ticketDetails-table-container">
          {tab === "live" && (
            TicketData && 
            <>
                {renderTable(TicketData.live.assignedByYou, "Assigned by You")}
                {renderTable(
                  TicketData.live.assignedByOthers,
                  "Assigned by Others"
                )}
            </>
          )}
          {tab === "pendingApproval" && (
            <>
              {renderTable(
                TicketData.pendingApproval.assignedByYou,
                "Assigned by You"
              )}
              {renderTable(
                TicketData.pendingApproval.assignedByOthers,
                "Assigned by Others"
              )}
            </>
          )}
          {tab === "completed" && (
            <>
              {renderTable(
                TicketData.completed.assignedByYou,
                "Assigned by You"
              )}
              {renderTable(
                TicketData.completed.assignedByOthers,
                "Assigned by Others"
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
