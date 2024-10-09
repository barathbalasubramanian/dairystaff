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
      <h4>{title}</h4>
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
              <th>Ticket Number</th>
              <th>Former ID</th>
              <th>Service Type</th>
              <th>Assigned Date & Time</th>
              <th>Assigned By</th>
              <th>Show</th>
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
                <td>{item.assignedDateTime}</td>
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
        <div className="ticketDetails-tabs">
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
        </div>
        <div className="ticketDetails-table-container">
          {tab === "live" && (
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
