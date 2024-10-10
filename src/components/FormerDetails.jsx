import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../static/css/FormerDetails.css";
import { FaTimes, FaFilter } from "react-icons/fa"; // Importing filter and close icons
import { useGlobalContext } from "../Context";
import Search from "./Search";

const FormerDetails = () => {
  const [showCow, setShowCow] = useState(false);
  const [selectedCow, setSelectedCow] = useState(null);
  const { loading, setLoading, formerData, staff, formerID, formerTicket, GetTicketDetails } = useGlobalContext();
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter
  const [typeFilter, setTypeFilter] = useState(""); // State for type filter
  const [sortOrder, setSortOrder] = useState("asc"); // State for sort order
  const [showFilter, setShowFilter] = useState(false); // State to control filter visibility

  const navigate = useNavigate();

  useEffect(() => {
    if (formerID === -1) {
      navigate("/formerId");
    }
  }, [navigate]);

  const handleShowCow = (cow) => {
    setSelectedCow(cow);
    setShowCow(true);
  };

  const handleclick = async (id) => {
    setLoading(true);
    await GetTicketDetails(id);
    setLoading(false);
    navigate("/ticketStatus");
  };

  const handleCloseCow = () => {
    setShowCow(false);
    setSelectedCow(null);
  };

  if (loading || formerID === -1 || staff.Staff_id === -1) {
    return <>Loading...</>;
  }

  // Filter and sort ticket data
  const filteredTickets = formerTicket
    .filter(ticket => (statusFilter ? ticket.Status === statusFilter : true))
    .filter(ticket => (typeFilter ? ticket.Type === typeFilter : true))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Ticket_id - b.Ticket_id; // Sort by Ticket ID ascending
      } else {
        return b.Ticket_id - a.Ticket_id; // Sort by Ticket ID descending
      }
    });

  return (
    <div className="formerdetail-container">
      <Search />
      {showCow && (
        <div className="overlay active" onClick={handleCloseCow}></div>
      )}
      <div className="formerdetail-box">
        {showCow && selectedCow && (
          <div className="cow-container">
            <div className="cow-header">
              <h2>Cow ID: {selectedCow.cowId}</h2>
              <div className="cow-close">
                <FaTimes onClick={handleCloseCow} />
              </div>
            </div>
            <p>{selectedCow.bread}</p>
            <p>
              {selectedCow.age.year} Year, {selectedCow.age.month} Months
            </p>
            <table className="cow-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Service Type</th>
                  <th>SP.ID</th>
                </tr>
              </thead>
              <tbody>
                {selectedCow.Service.map((services, index) => (
                  <tr key={index}>
                    <td>{services.DateTime}</td>
                    <td>{services.type}</td>
                    <td>{services.spid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="formerdetail-ticket">
          <Link to="/formerService">
            <button>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                  fill="#1C1B1F"
                />
              </svg>
              <h3>Add Tickets</h3>
            </button>
          </Link>
        </div>
        <div className="formerdetail-details">
          <div className="formerdetails-head">
            <h3>Farmer Detail’s</h3>
          </div>
          <div className="formerdetail-info">
            <table>
              <tbody>
                <tr>
                  <td>Farmer Name</td>
                  <td>:</td>
                  <td>{formerData.name}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>:</td>
                  <td>
                    {formerData.phno.mobile1} <br /> {formerData.phno.mobile2}
                  </td>
                </tr>
                <tr>
                  <td>Email ID</td>
                  <td>:</td>
                  <td>{formerData.email}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>
                    {formerData.Address.address1} <br />
                    {formerData.Address.address2}
                  </td>
                </tr>
                <tr>
                  <td>Cow’s Count</td>
                  <td>:</td>
                  <td>{formerData.CowCount}</td>
                </tr>
                <tr>
                  <td>VLCC</td>
                  <td>:</td>
                  <td>{formerData.VLCC}</td>
                </tr>
                <tr>
                  <td>VSP</td>
                  <td>:</td>
                  <td>
                    {formerData.VSP.name} <br />
                    {formerData.VSP.phno}
                  </td>
                </tr>
                <tr>
                  <td>BMC</td>
                  <td>:</td>
                  <td>{formerData.BMC}</td>
                </tr>
                <tr>
                  <td>Cluster</td>
                  <td>:</td>
                  <td>{formerData.Cluster}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="filter-controls">
          {!showFilter ? (
            <FaFilter className="filter-icon" onClick={() => setShowFilter(true)} />
          ) : (
            <div className="filter-section">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pendingApproval">Pending</option>
                <option value="completed">Complete</option>
                <option value="live">Live</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Veterinary">Veterinary</option>
                <option value="AI">AI</option>
                <option value="Feed">Feed</option>
                <option value="Insurance">Insurance</option>
                <option value="Loan">Loan</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Sort Ascending</option>
                <option value="desc">Sort Descending</option>
              </select>

              <FaTimes className="close-icon" onClick={() => setShowFilter(false)} />
            </div>
          )}
        </div>

        {/* Tickets Table */}
        <div className="formerdetail-cow">
          <table>
            <thead>
              <tr>
                <th>Ticket Id</th>
                <th>Status</th>
                <th>Type</th>
                <th>Comments</th>
                <th>Show</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((item, index) => (
                <tr key={index}>
                  <td>{item.Ticket_id}</td>
                  <td>{item.Status}</td>
                  <td>{item.Type}</td>
                  <td>{item.Comments}</td>
                  <td>
                    <button onClick={() => handleclick(item.Ticket_id)}>
                      View Ticket
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormerDetails;
