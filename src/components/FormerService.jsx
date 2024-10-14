import React, { useState, useEffect } from "react";
import "../static/css/FormerService.css";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import _ from "lodash";
import pic from "../static/img/pic.gif";
import Search from "./Search";
import { ArrowLeft } from 'react-feather';

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
  const [ doctor, setDoctor] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (formerID === -1) {
      navigate("/formerId");
    }
  }, [navigate]);

  if (formerID === -1) {
    return <h1>Loading...</h1>;
  }

  const handleServiceChange = (event) => {
    const service = event.target.value;
    setSelectedService(service);
  };
  const handleBackClick = () => {
    // Your back logic here, for example:
    window.history.back(); // Go to the previous page
  };

  const toggleDoctorPopup = () => {
    setShowDoctor(!showDoctor);
  };

  const togglesetshowall = () => {
    setShowAll(!showAll);
  };

  const handleservicesumbit = () => {
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

          <div className="formerservice-back-button" onClick={handleBackClick}>
        <ArrowLeft size={24} />
      </div>
          <div className="formerservice-content">
            <div className="formerservice-details">
              <div className="formerservice-details-page">
                <div className="formerservice-details-name">
                  <p>{formerData.id}</p>
                  <p>{formerData.name}</p>
                </div>
                <div className="formerservice-details-vlcc">
                  <div className="formerservice-details-vlcc-but">
                    <button>VLCC: {formerData.VLCC}</button>
                    <button>Total Cow’s: {formerData.CowCount}</button>
                  </div>
                  <p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_111_1363"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_111_1363)">
                        <path
                          d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L4 8V18H20V8L12 13ZM12 11L20 6H4L12 11ZM4 8V6V18V8Z"
                          fill="#1C1B1F"
                        />
                      </g>
                    </svg>
                    {formerData.email}
                  </p>
                  <p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_111_1368"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      >
                        <rect width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_111_1368)">
                        <path
                          d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21ZM6.025 9L7.675 7.35L7.25 5H5.025C5.10833 5.68333 5.225 6.35833 5.375 7.025C5.525 7.69167 5.74167 8.35 6.025 9ZM14.975 17.95C15.625 18.2333 16.2875 18.4583 16.9625 18.625C17.6375 18.7917 18.3167 18.9 19 18.95V16.75L16.65 16.275L14.975 17.95Z"
                          fill="#1C1B1F"
                        />
                      </g>
                    </svg>
                    {formerData.phno.mobile1}
                  </p>
                </div>
                <div className="formerservice-details-address">
                  <p>
                    <b>Address:</b>
                    {formerData.Address.address1} <br />
                    {formerData.Address.address2}
                  </p>
                  <p>
                    <b>VSP: </b>
                    {formerData.VSP.name} <br />
                    {formerData.VSP.phno}
                  </p>
                </div>
                <div className="formerservice-details-bmc">
                  <p>
                    <b>BMC:</b>
                    {formerData.BMC}
                  </p>
                  <p>
                    <b>Cluster:</b>
                    {formerData.Cluster}
                  </p>
                </div>
              </div>
             
            </div>
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
                  <div className="formerservice-back-button" onClick={handleBackClick}>
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
                                  type="radio"
                                  name="doctor"
                                  value={doc.id}
                                  onChange={() => {
                                    handleDoctorSelect(doc.id);
                                  }}
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
                        <button onClick={handledocsubmit}>Sumbit</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {showVet && (
                <>
                  <div className="showvet">
                    <div className="showvet-head">
                      <h2>VETERINARY</h2>
                    </div>
                    <div className="showvet-body">
                      <div className="showvet-inputtext">
                        <label className="text-bold">Cow ID (optional)</label>
                        <select
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
                        <label htmlFor="" className="text-bold">
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
                        <label className="text-bold">Comments (optional)</label>
                        <textarea
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
              <form action="">
                <div className="formerservice-inputradio">
                  <label className="text-bold">Select Service Type *</label>
                  <div>
                    <input
                      type="radio"
                      name="service"
                      value="AI"
                      onChange={handleServiceChange}
                    />
                    <label>AI</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="service"
                      value="Veterinary"
                      onChange={handleServiceChange}
                    />
                    <label>Veterinary</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="service"
                      value="Feed"
                      onChange={handleServiceChange}
                    />
                    <label>Feed & Supplementary Foods</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="service"
                      value="Loan"
                      onChange={handleServiceChange}
                    />
                    <label>Loan</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="service"
                      value="Insurance"
                      onChange={handleServiceChange}
                    />
                    <label>Insurance</label>
                  </div>
                </div>
              </form>
              <div className="formerservice-button">
                <button onClick={handleservicesumbit}>Proceed</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormerService;
