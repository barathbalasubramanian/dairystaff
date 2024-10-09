import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "../static/css/TicketStatus.css";
import { useGlobalContext } from "../Context";
import Search from "./Search";

const TicketStatus = () => {
  const { loading, TicketDetail, staff } = useGlobalContext();

  const navigate = useNavigate();

  var statusTicket = TicketDetail.status;
  console.log(TicketDetail.spId)
  return (
    <>
      <div className="Status-container">
        <Search />
        <div className="status-box">
          <div className="status-details">
            <div
              className={
                "status-viewgroup1 " +
                (statusTicket === 0 ? "active-class" : "inactive-class")
              }
            >
              <button>Live</button>
            </div>
            <div
              className={
                "status-viewgroup1 " +
                (statusTicket === 1 ? "active-class" : "inactive-class")
              }
            >
              <button>Pending Approval</button>
            </div>
            <div
              className={
                "status-viewgroup1 " +
                (statusTicket === 2 ? "active-class" : "inactive-class")
              }
            >
              <button>Completed</button>
            </div>
          </div>
          <div className="status-close">
            <Link to="/ticketDetails">
              <FaTimes />
            </Link>
          </div>
          <div className="status-content">
            <table>
              <tbody>
                <tr>
                  <td>Former ID</td>
                  <td>:</td>
                  <td>{TicketDetail.formerID}</td>
                </tr>
                <tr>
                  <td>Former Name</td>
                  <td>:</td>
                  <td>{TicketDetail.name}</td>
                </tr>
                <tr>
                  <td>Service Type</td>
                  <td>:</td>
                  <td>{TicketDetail.type}</td>
                </tr>
                {TicketDetail.spId && (
                  <>
                    <tr>
                      <td>SP. ID</td>
                      <td>:</td>
                      <td>{TicketDetail.spId}</td>
                    </tr>
                    <tr>
                      <td>SP. Name</td>
                      <td>:</td>
                      <td>
                        {TicketDetail.address.line1}
                        <br />
                        {TicketDetail.address.line2}
                        <br />
                        {TicketDetail.address.line3}
                        <br />
                        {TicketDetail.address.line4}
                        <br />
                        {TicketDetail.address.line5}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <td>Assigned By</td>
                  <td>:</td>
                  <td>{TicketDetail.AssignedBy}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="status-view">
            <div
              className={`status-viewgroup ${
                TicketDetail.TicketRaised.status === 1 ? "checked" : ""
              }`}
            >
              <div className="status-viewgroup-date">
                <p>{TicketDetail.TicketRaised.Date}</p>
                <p>{TicketDetail.TicketRaised.time}</p>
              </div>
              <input
                type="radio"
                name="TicketRaised"
                checked={TicketDetail.TicketRaised.status === 1}
                value="0"
              />
              <p>Ticket Raised</p>
            </div>
            <div
              className={`status-viewgroup ${
                TicketDetail.SPApproval.status === 1 ? "checked" : ""
              }`}
            >
              <div className="status-viewgroup-date">
                <p>{TicketDetail.SPApproval.Date}</p>
                <p>{TicketDetail.SPApproval.time}</p>
              </div>
              <input
                type="radio"
                name="SPApproval"
                checked={TicketDetail.SPApproval.status === 1}
                value="0"
              />
              <p>SP. Approval</p>
            </div>
            <div
              className={`status-viewgroup ${
                TicketDetail.ServiceStart.status === 1 ? "checked" : ""
              }`}
            >
              <div className="status-viewgroup-date">
                <p>{TicketDetail.ServiceStart.Date}</p>
                <p>{TicketDetail.ServiceStart.time}</p>
              </div>
              <input
                type="radio"
                name="ServiceStart"
                checked={TicketDetail.ServiceStart.status === 1}
                value="0"
              />
              <p>Service Start</p>
            </div>
            <div
              className={`status-viewgroup ${
                TicketDetail.ServiceEnd.status === 1 ? "checked" : ""
              }`}
            >
              <div className="status-viewgroup-date">
                <p>{TicketDetail.ServiceEnd.Date}</p>
                <p>{TicketDetail.ServiceEnd.time}</p>
              </div>
              <input
                type="radio"
                name="ServiceEnd"
                checked={TicketDetail.ServiceEnd.status === 1}
                value="0"
              />
              <p>Ticket Closed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketStatus;
