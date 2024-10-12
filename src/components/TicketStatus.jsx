import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../static/css/TicketStatus.css";
import { useGlobalContext } from "../Context";
import Search from "./Search";
import { Check } from 'lucide-react';

const TicketStatus = () => {
  const { TicketDetail } = useGlobalContext();
  const router = useNavigate();
  let statusTicket;
  if ( TicketDetail !== undefined ) {
    statusTicket = TicketDetail.status;
  } else {
    router('/ticketDetails')
    return
  }
  const stages = [
    { label: "Ticket Raised", data: TicketDetail?.TicketRaised },
    { label: "SP. Approval", data: TicketDetail?.SPApproval },
    { label: "Service Start", data: TicketDetail?.ServiceStart },
    { label: "Ticket Closed", data: TicketDetail?.ServiceEnd },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="Status-container">
        <Search />

        <div className="bg-white p-6 rounded-lg mt-4 px-20">

          <div className="flex justify-between items-center mb-6">
            {statusTicket === 0 && (
              <button className="py-2 px-4 rounded-lg transition-colors bg-blue-500 text-white">
                Live
              </button>
            )}
            {statusTicket === 1 && (
              <button className="py-2 px-4 rounded-lg transition-colors bg-yellow-500 text-white">
                Pending Approval
              </button>
            )}
            {statusTicket === 2 && (
              <button className="py-2 px-4 rounded-lg transition-colors bg-green-500 text-white">
                Completed
              </button>
            )}

            <div className="text-right">
              <Link to="/ticketDetails">
                <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer text-xl" />
              </Link>
            </div>
          </div>


          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr>
                  <td className="p-2 font-semibold">Former ID</td>
                  <td className="p-2">:</td>
                  <td className="p-2">{TicketDetail.formerID}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Former Name</td>
                  <td className="p-2">:</td>
                  <td className="p-2">{TicketDetail.name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Service Type</td>
                  <td className="p-2">:</td>
                  <td className="p-2">{TicketDetail.type}</td>
                </tr>
                {TicketDetail.spId && (
                  <>
                    <tr>
                      <td className="p-2 font-semibold">SP. ID</td>
                      <td className="p-2">:</td>
                      <td className="p-2">{TicketDetail.spId}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">SP. Name</td>
                      <td className="p-2">:</td>
                      <td className="p-2">
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
                  <td className="p-2 font-semibold">Assigned By</td>
                  <td className="p-2">:</td>
                  <td className="p-2">{TicketDetail.AssignedBy}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full max-w-3xl mx-auto p-4">
            <div className="relative">

              <div className="absolute top-[14px] w-[88%] left-[25px]  h-1 bg-gray-200 -translate-y-1/2"></div>
              
              <div className="relative flex justify-between">
                {stages.map((stage, index) => (
                  <div key={index} className="flex flex-col items-center">

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${stage.data?.status === 1 ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {stage.data?.status === 1 ? (
                        <Check className="text-white" size={16} />
                      ) : (
                        <span className="text-white text-sm">{index + 1}</span>
                      )}
                    </div>
                    
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium">{stage.label}</p>
                      <p className="text-xs mt-1">
                        {formatDate(stage.data?.Date)}
                      </p>
                      <p className="text-xs">{stage.data?.time || 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default TicketStatus;
