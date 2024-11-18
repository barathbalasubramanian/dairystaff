import { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "../static/css/TicketDetails.css";
import { useGlobalContext } from "../Context";
import Search from "./Search";

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

  const handleclick = async (id) => {
    setLoading(true);
    await GetTicketDetails(id);
    setLoading(false);
    navigate("/ticketStatus");
  };

  const renderTable = (tabData, title) => (
    <>
      <h4 className="py-1 pb-3 font-medium text-xl">{title}</h4>  
      {tabData.length === 0 && (
        <>
        <div className="no-data">
           <h5>No Data Found!</h5>
        </div>
        </>
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
            {tabData.map((item, index) => (
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
                  {
                    new Date(item.assignedDateTime).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                      timeZone: 'UTC'
                    })
                  }
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

        <div className="flex space-x-4 w-[80%] m-auto">
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

        <div className="ticketDetails-table-container mt-2">
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
