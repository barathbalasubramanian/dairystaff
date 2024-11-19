import React, { useState, useEffect } from "react";
import "../static/css/FormerService.css";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate  } from "react-router-dom";
import { useGlobalContext } from "../Context";
import _ from "lodash";
import pic from "../static/img/pic.gif";
import Search from "./Search";
import { ArrowLeft } from 'react-feather';
import { Mail, Phone, MapPin, Users } from 'lucide-react';


const FormerService = () => {
  const {
    loading,
    setLoading,
    formerData,
    AIdoctor,
    vetdoctor,
    preorder,
    currorder,
    setCurrorder,
    getCurrentDate,
    createOrder,
    createTicket,
    getTicketData,
    staff,
    formerID,
    showdocticket,
    setshowdocticket,
    ticketId,
    getTicketForAmount,
    getTicketForLoan,
    checkFormerId,
  } = useGlobalContext();

  const [showDoctor, setShowDoctor] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(-1);
  const [showFeed, setShowFeed] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showcon, setShowCon] = useState(false);
  const [cow_id, setcow_id] = useState(-1);
  const [showAll, setShowAll] = useState(false);
  const [showVet, setShowVet] = useState(false);
  const [showloan, setshowloan] = useState(false);
  const [showIn, setShowIn] = useState(false);
  const [Comments, setComments] = useState("");
  const [pre,setPre]= useState("low")
  const [doctor, setDoctor] = useState();
  const [isPreview, setIsPreview] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate hook
  
  
  if (formerID === -1) {
    return <h1>Loading...</h1>;
  }
  const handleBackClick = () => {
      window.history.back(); 
  };

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page in history
  };
  const handleServiceChange = (event) => {
    const service = event.target.value;
    setSelectedService(service);
  };
 

  const toggleDoctorPopup = () => {
    setShowDoctor(!showDoctor);
  };

  const togglesetshowall = () => {
    setShowAll(!showAll);
  };

  const handleservicesumbit = async () => {
    if (selectedService === "AI" || selectedService === "Veterinary") {
      if(selectedService === "AI"){
        setDoctor(AIdoctor)
      }else{
        setDoctor(vetdoctor);
      }
      setShowDoctor(false);
      setShowFeed(false);
      setShowVet(true);
    } else if (selectedService === "Feed") {
      console.log("Feed")
      await checkFormerId(formerID);
      setShowDoctor(false);
      setShowFeed(true);
    } else if (selectedService === "Loan") {
      setshowloan(true);
    } else if (selectedService === "Insurance") {
      setShowIn(true);
    } 
  };

  const handleDoctorSelect = (value) => {
    setSelectedDoctor(value);
  };

  const toggleCart = () => {
    setShowFeed(false);
    setShowDoctor(false);
    setShowCart(!showCart);
  };
   const handlePreview = () => {
    if (selectedService) {
      setIsPreview(true); // Show the preview container
    } else {
      alert('Please select a service type to proceed.'); // Validation
    }
  };

  const handlerepeat = (id) => {
    setShowFeed(false);
    setShowDoctor(false);
    setShowCart(!showCart);
    var val = _.cloneDeep(preorder[id]);
    val.date = getCurrentDate();
    setCurrorder(val);
  };

  const handleCon = async () => {
    setShowCart(false);
    setShowFeed(false);
    setShowDoctor(false);
    await createOrder(Comments, currorder.totalPrice);
    setShowCon(!showcon);
  };

  const handledocsubmit = async () => {
    await createTicket(selectedService, selectedDoctor, cow_id, Comments,pre);
    await getTicketData();
    setShowDoctor(false);
  };

  const handleticketshow = () => {
    setshowdocticket(false);
  };

  const handleclose = () => {
    setShowCart(false);
    setShowFeed(false);
    setShowCon(false);
  };

  const handleDocCheck = () => {
    setShowVet(false);
    setShowDoctor(true);
  };

  const handleLoansumbit = () =>{
    getTicketForLoan("Loan",Comments);
    setshowloan(false);
  }
  const handleINsumbit = () =>{
    getTicketForLoan("Insurance",Comments);
    setShowIn(false);
  }

  return (
    <>
      <div className="formerservice-container">
        <Search />
        <div className="formerservice-box">
          {showdocticket && (
            <div className="showdoctic">
              <div className="showdoctic-head">
                <h2>Confirmation</h2>
                <FaTimes onClick={() => handleticketshow()} />
              </div>
              <div className="showdoctic-body">
                <h3>Ticket created successfully with ID: {ticketId}</h3>
              </div>
            </div>
          )}
          {showcon && (
            <div className="formerservice-feed1">
              <div className="formerservice-feed-head1">
                <h2>Confirmation</h2>
                <FaTimes onClick={() => handleclose()} />
              </div>
              <div className="formerservice-feed-table1">
                <img src={pic} alt="" />
                <h3>Order has been Successfully Placed</h3>
              </div>
            </div>
          )}

          <div className="">
            <div className="bg-white  rounded-lg p-6 w-full max-w-6xl mx-auto mt-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Left Section */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{formerData.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">ID: {formerData.id}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-600 font-medium">VLCC</p>
                      <p className="text-lg font-semibold text-blue-700">{formerData.VLCC}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-600 font-medium">BMC</p>
                      <p className="text-lg font-semibold text-blue-700">{formerData.BMC}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-600 font-medium">Cluster</p>
                      <p className="text-lg font-semibold text-blue-700">{formerData.Cluster}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm text-green-600 font-medium">Total Cows</p>
                      <p className="text-lg font-semibold text-green-700">{formerData.CowCount}</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  
                </div>

                {/* Right Section */}
                <div className="flex-1">
                  <div className="space-y-4">

                    <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 text-gray-600 mb-6">
                      <Mail className="w-5 h-5" />
                      <span className="text-sm">{formerData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5" />
                      <span className="text-sm">{formerData.phno.mobile1}</span>
                    </div>
                  </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <h3 className="font-medium text-gray-900">Address</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {formerData.Address.address1},
                        <br />
                        {formerData.Address.address2}
                      </p>
                    </div>

                    {/* VSP Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-gray-500" />
                        <h3 className="font-medium text-gray-900">VSP Details</h3>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{formerData.VSP.name}</p>
                        <p>{formerData.VSP.phno}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleBack} // Define this function to handle the back navigation
              className="absolute top-2 left-2 flex items-center gap-1 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="formerservice-service">   
              {preorder === null && showFeed && navigate("/feed")}
              {showFeed && preorder && (
                <div className="formerservice-feed">
                  <div className="formerservice-feed-head">
                    <h2>Feed & Supplementary Foods</h2>
                  </div>
                  <div className="formerservice-feed-details">
                    <h3>Previous Order</h3>
                    <p>DATE: {preorder[0].date}</p>
                    <p>FARMER ID: {preorder[0].formerId}</p>
                  </div>
                  <div className="formerservice-feed-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Products List</th>
                          <th>VLCC Location</th>
                          <th>Total Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        
                        {!showAll && (
                          <>
                            
                            <tr>
                              <td>{preorder[0].date}</td>
                              <td>
                                {preorder[0].items.map((ite) => (
                                  <span key={ite.name}>
                                    {ite.name}*{ite.quantity}
                                    <br />
                                  </span>
                                ))}
                              </td>
                              <td>{preorder[0].VLCC}</td>
                              <td>Rs. {preorder[0].totalPrice}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    handlerepeat(0);
                                  }}
                                >
                                  Repeat
                                </button>
                              </td>
                            </tr>
                          </>
                        )}
                        
                        {showAll && (
                          <>
                            {preorder.map((preorde, id) => (
                              <tr>
                                <td>{preorde.date}</td>
                                <td>
                                  {preorde.items.map((ite) => (
                                    <span key={ite.name}>
                                      {ite.name}*{ite.quantity}
                                      <br />
                                    </span>
                                  ))}
                                </td>
                                <td>{preorde.VLCC}</td>
                                <td>Rs. {preorde.totalPrice}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      handlerepeat(id);
                                    }}
                                  >
                                    Repeat
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="formerservice-feed-footer">
                    <button onClick={togglesetshowall}>
                      View More
                      <svg
                        width="19"
                        height="11"
                        viewBox="0 0 19 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.5 10.425L0.5 1.425L1.9 0L9.5 7.6L15.1 2H10.5V0H18.5V8H16.5V3.425L9.5 10.425Z"
                          fill="#3AB1DC"
                        />
                      </svg>
                    </button>
                    <Link to="/feed">
                      <button>
                        New
                        <svg
                          width="15"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.5 8H0.5V6H6.5V0H8.5V6H14.5V8H8.5V14H6.5V8Z"
                            fill="#06AD9D"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              )}
              {showloan && (
                <>
                  <div className="formerservice-back-button" onClick={handleBack}>
                    <ArrowLeft size={24} />
                  </div>
                  <div className="loan-container">
                    <div className="loan-container-head">
                      <h1>LOAN</h1>
                    </div>
                    <div className="loan-container-body">
                      <form onSubmit="">
                        <div className="loan-input-container">
                          <label>Comments*</label>
                          <textarea
                            value={Comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Enter Requirements"
                            required
                          />
                        </div>
                        <div className="loan-container-but">
                          <button onClick={handleLoansumbit}>Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
              {showIn && (
                <>
                  <div className="loan-container">
                    <div className="loan-container-head">
                      <h1>INSURANCE</h1>
                    </div>
                    <div className="loan-container-body">
                      <form onSubmit="">
                        <div className="loan-input-container">
                          <label>Comments*</label>
                          <textarea
                            value={Comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Enter Requirements"
                            required
                          />
                        </div>
                        <div className="loan-container-but">
                          <button onClick={handleINsumbit}>Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
              {showDoctor && (
                <>
                  <div className="formerservice-doctor  active">
                    <div className="formerservice-doctor-head">
                       <button
                          type="button"
                          onClick={handleBack}
                          className="absolute top-2 left-2 flex items-center gap-1 text-gray-700 hover:text-blue-500 transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5" />
                          Back
                        </button>
                      <h3>Doctor Details</h3>
                    </div>
                    <div className="formerservice-body">
                      <table>
                        <thead>
                          <tr>
                            <th>Assign</th>
                            <th>Doctor ID</th>
                            <th>Doctor Name</th>
                            <th>Location</th>
                            <th>Contact</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctor.map((doc) => (
                            <tr key={doc.id}>
                                <td>
                              <input
                                type="checkbox"
                                name="doctor"
                                value={doc.id}
                                checked={selectedDoctor === doc.id}
                                onChange={() => handleDoctorSelect(doc.id)}
                              />
                            </td>
        
                              <td>{doc.id}</td>
                              <td>{doc.name}</td>
                              <td>{doc.Location}</td>
                              <td>
                                {doc.email} <br />
                                {doc.phno}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="formerservice-doctor-but">
                        <button onClick={handledocsubmit}>Submit</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {showVet && (
                <>
                  
                  <div className="showvet"> 
                    <div className="showvet-head">
                      <button
                      type="button"
                      onClick={handleBackClick} // Define this function to handle the back navigation
                      className="absolute top-2 left-2 flex items-center gap-1 text-gray-700 hover:text-blue-500 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                      <h2 className="font-semibold">VETERINARY</h2>
                    </div>
                    <div className="showvet-body">
                      <div className="showvet-inputtext">
                        <label className="font-medium">Cow ID (optional)</label>
                        <select
                          className="border-none outline-none"
                          onChange={(e) => {
                            setcow_id(e.target.value);
                          }}
                        >
                          <option value="">Select Cow ID</option>
                          {formerData.CowList.map((cow) => (
                            <option key={cow.id} value={cow.id}>
                              {cow.id}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="showvet-radio">
                        <label htmlFor="" className="font-medium">
                          Priority*
                        </label>
                        <div className="radio-value">
                          <input type="radio" name="pri" value="low"  onClick={(e)=>{setPre("low")}}/>
                          <label for="Low">Low</label>
                          <input type="radio" name="pri" value="mid" onClick={(e)=>{setPre("mid")}}/>
                          <label for="mid">Mid</label>
                          <input type="radio" name="pri" value="high" onClick={(e)=>{setPre("high")}}/>
                          <label for="high">High</label>
                        </div>
                      </div>
                      <div className="showvet-inputtextarea">
                        <label className="font-medium">Comments (optional)</label>
                        <textarea
                          className="border-none outline-none"
                          onChange={(e) => {
                            setComments(e.target.value);
                          }}
                        />
                      </div>
                      <div className="shoevet-but">
                        <button onClick={() => handleDocCheck()}>Check</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {showCart && (
                <div className="formerservice-feed">
                  <div className="formerservice-feed-head">
                    <h2>Feed & Supplementary Foods</h2>
                  </div>
                  <div className="formerservice-feed-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Products List</th>
                          <th>VLCC Location</th>
                          <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{currorder.date}</td>
                          <td>
                            {currorder.items.map((ite) => (
                              <span key={ite.name}>
                                {ite.name}*{ite.quantity}
                                <br />
                              </span>
                            ))}
                          </td>
                          <td>{currorder.VLCC}</td>
                          <td>Rs. {currorder.totalPrice}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="formerservice-conf-footer">
                    <h3>It can be delivery at Tomorrow 3.30 PM</h3>
                    <button onClick={handleCon}>Place Order</button>
                  </div>
                </div>
              )}
              
          <form onSubmit={(e) => e.preventDefault()} className="relative">
          <div className="formerservice-inputradio">
            <label className="font-bold mb-2 block">Select Service Type *</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleServiceChange({ target: { value: 'AI' } })}
                className={`px-4 py-2 rounded-md border ${
                  selectedService === 'AI'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                } transition-colors`}
              >
                AI
              </button>
              <button
                type="button"
                onClick={() => handleServiceChange({ target: { value: 'Veterinary' } })}
                className={`px-4 py-2 rounded-md border ${
                  selectedService === 'Veterinary'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                } transition-colors`}
              >
                Veterinary
              </button>
              <button
                type="button"
                onClick={() => handleServiceChange({ target: { value: 'Feed' } })}
                className={`px-4 py-2 rounded-md border ${
                  selectedService === 'Feed'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                } transition-colors`}
              >
                Feed & Supplementary Foods
              </button>
              <button
                type="button"
                onClick={() => handleServiceChange({ target: { value: 'Loan' } })}
                className={`px-4 py-2 rounded-md border ${
                  selectedService === 'Loan'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                } transition-colors`}
              >
                Loan
              </button>
              <button
                type="button"
                onClick={() => handleServiceChange({ target: { value: 'Insurance' } })}
                className={`px-4 py-2 rounded-md border ${
                  selectedService === 'Insurance'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                } transition-colors`}
              >
                Insurance
              </button>
            </div>
          </div>

          <button
            onClick={handleservicesumbit}
            className="absolute right-0 bottom-0 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            disabled={!selectedService}
          >
            Proceed
          </button>
        </form>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormerService;
