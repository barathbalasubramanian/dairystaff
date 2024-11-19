import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { 
  Check, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  User, 
  MapPin, 
  FileText 
} from 'lucide-react';
import { useGlobalContext } from "../Context";
import Search from "./Search";

const TicketStatus = () => {
  const { TicketDetail } = useGlobalContext();
  const router = useNavigate();

  // Guard clause for undefined ticket detail
  if (!TicketDetail) {
    router('/ticketDetails');
    return null;
  }

  const statusTicket = TicketDetail.status;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stages = [
    { 
      label: "Ticket Raised", 
      data: TicketDetail?.TicketRaised,
      icon: AlertCircle,
      description: "Initial ticket submission"
    },
    { 
      label: "SP Approval", 
      data: TicketDetail?.SPApproval,
      icon: Clock,
      description: "Service provider review"
    },
    { 
      label: "Service Start", 
      data: TicketDetail?.ServiceStart,
      icon: Navigation,
      description: "Service begins"
    },
    { 
      label: "Ticket Closed", 
      data: TicketDetail?.ServiceEnd,
      icon: CheckCircle2,
      description: "Service completed"
    }
  ];

  const renderStatusButton = () => {
    const statusMap = {
      0: { 
        color: "bg-blue-600", 
        text: "Active", 
        icon: Navigation 
      },
      1: { 
        color: "bg-yellow-500", 
        text: "Pending Approval", 
        icon: Clock 
      },
      2: { 
        color: "bg-green-600", 
        text: "Completed", 
        icon: CheckCircle2 
      }
    };

    const currentStatus = statusMap[statusTicket] || statusMap[0];
    const StatusIcon = currentStatus.icon;

    return (
      <div className="flex items-center space-x-2">
        <button className={`flex items-center gap-2 py-2 px-4 rounded-lg ${currentStatus.color} text-white`}>
          <StatusIcon size={18} />
          {currentStatus.text}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Search />

      <div className="bg-white shadow-lg rounded-xl mt-4 p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {renderStatusButton()}
          
          <Link to="/ticketDetails" className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer text-2xl" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Ticket Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <FileText className="mr-2 text-blue-500" />
              Ticket Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600 flex items-center">
                  <User className="mr-2 text-gray-400" size={16} />
                  Former ID
                </span>
                <span className="font-semibold">{TicketDetail.formerID || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600 flex items-center">
                  <User className="mr-2 text-gray-400" size={16} />
                  Former Name
                </span>
                <span className="font-semibold">{TicketDetail.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600 flex items-center">
                  <Navigation className="mr-2 text-gray-400" size={16} />
                  Service Type
                </span>
                <span className="font-semibold">{TicketDetail.type || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center">
                  <User className="mr-2 text-gray-400" size={16} />
                  Assigned By
                </span>
                <span className="font-semibold">{TicketDetail.AssignedBy || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Service Provider Section */}
          {TicketDetail.spId && (
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <MapPin className="mr-2 text-green-500" />
                Service Provider Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">SP ID</span>
                  <span className="font-semibold">{TicketDetail.spId}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600 mb-2">SP Address</span>
                  <div className="bg-white p-3 rounded border text-sm text-gray-700">
                    {[
                      TicketDetail.address.line1,
                      TicketDetail.address.line2,
                      TicketDetail.address.line3,
                      TicketDetail.address.line4,
                      TicketDetail.address.line5
                    ].filter(Boolean).join(", ")}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Ticket Progress Stages */}
        <div className="w-full max-w-4xl mx-auto mt-8">
          <h3 className="text-lg font-semibold mb-6 text-center text-gray-800">
            Ticket Progress Stages
          </h3>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
            
            <div className="relative flex justify-between items-center">
              {stages.map((stage, index) => {
                const StageIcon = stage.icon;
                const isCompleted = stage.data?.status === 1;

                return (
                  <div key={index} className="flex flex-col items-center z-10 bg-white px-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center 
                      mb-2 border-2 transition-all duration-300
                      ${isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                      <StageIcon size={20} />
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700">{stage.label}</p>
                      <p className="text-xs text-gray-500">
                        {stage.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(stage.data?.Date)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketStatus;