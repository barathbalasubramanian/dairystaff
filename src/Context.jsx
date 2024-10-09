import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const baseURL = "https://test.quindltechnologies.com/";
  const [staff, setStaff] = useState({ Staff_id: -1 });
  const [loading, setLoading] = useState(true);
  const [TicketData, setTicketData] = useState();
  const [Message, setMessage] = useState("");
  const [TicketDetail, setTicketDetail] = useState();
  const [formerID, SetFormerId] = useState(-1);
  const [formerData, setFormerData] = useState();
  const [AIdoctor, setAIDoctor] = useState();
  const [vetdoctor,setVetDoctor] = useState();
  const [feedProducts, setfeedProducts] = useState();
  const [supplementaryProducts, setsupplementaryProducts] = useState();
  const [preorder, setPreOrder] = useState();
  const [currorder, setCurrorder] = useState();
  const [cart, setCart] = useState();
  const [showdocticket, setshowdocticket] = useState(false);
  const [ticketId, setTicketId] = useState(-1);
  const [ShowOrderCon, setShowOrderCon] = useState(false);
  const [formerTicket, setformerTicket] = useState([]);
  const [sp,setSp] = useState();

  var staffid = -1;
  var formerid = -1;

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const loginStaff = async (userName, password) => {
    try {
      const response = await axios.post(baseURL + "login", {
        userName: userName,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      setStaff(response.data.user);
      staffid = response.data.user.Staff_id;
      await getTicketData();
      navigate("/ticketDetails");
      await getFeed();
      await getAllDoc();
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  const Register = async (userName, password) => {
    try {
      const response = await axios.post(baseURL + "register", {
        userName: userName,
        password: password,
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.error);
    }
  };

  const CheckToken = async (token) => {
    try {
      const response = await axios.post(baseURL + "checktoken", {
        token: token,
      });
      setStaff(response.data.user);
      staffid = response.data.user.Staff_id;
      await getTicketData();
      navigate("/ticketDetails");
      await getFeed();
      await getAllDoc();
    } catch (error) {
      console.log(error);
    }
  };

  const getTicketData = async () => {
    try {
      const response = await axios.get(baseURL + `ticket/tickets/${staffid}`);
      setTicketData(response.data);
    } catch (error) {
      setMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const GetTicketDetails = async (id) => {
    try {
      const response = await axios.get(baseURL + `ticket/ticket/${id}`);
      setTicketDetail(response.data);
      setLoading(false);
    } catch (err) {
      alert(err);
      setLoading(true);
    }
  };

  const checkFormerId = async (id) => {
    try {
      const response = await axios.get(
        baseURL+`farmer/checkFarmer/${id}`
      );
      if (response.data.exists) {
        SetFormerId(response.data.id);
        formerid = response.data.id;
        await GetFormerData();
        await getPreOrder();
        await getCurrOrder();
        await getTicketByFormerId(id);
        return 1;
      } else {
        alert("Id not found");
        return 0;
      }
    } catch (err) {
      setMessage("Failed to check former ID");
    }
  };

  const GetFormerData = async () => {
    try {
      const response = await axios.get(
        baseURL+`farmer/farmer/${formerid}`
      );
      setFormerData(response.data);
      setLoading(true);
      await getDoctor(response.data.Clusterid);
    } catch (err) {
      setMessage(err.message);
      setLoading(false);
    }
  };

  const getDoctor = async (Clusterid) => {
    console.log(Clusterid)
    try {
      const response = await axios.post(
        baseURL+"doctor/getDoctors",{
          clusterid:1,
          type:1
        }
      );
      console.log(response);
      setAIDoctor(response.data);
      const response1 = await axios.post(
        baseURL+"doctor/getDoctors",{
          clusterid:1,
          type:2
        }
      );
      setVetDoctor(response1.data);
    } catch (err) {
      setMessage("Error fetching doctor data");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const getFeed = async () => {
    try {
      const response = await axios.get(
        baseURL+"feed/getProducts"
      );
      console.log(response.data);
      setfeedProducts(response.data.feedProducts);
      setsupplementaryProducts(response.data.supplementaryProducts);
    } catch (err) {
      setMessage("Error fetching product data");
    } finally {
      setLoading(false);
    }
  };

  const getPreOrder = async () => {
    try {
      const response = await axios.get(
        baseURL + `farmer/last-order/${formerid}`
      );
      console.log(response.data);
      if (response.data.message === "No orders found for this former") {
        setPreOrder(null);
      } else {
        setPreOrder(response.data);
      }
    } catch (err) {
      setMessage(err);
    }
  };

  const getCurrOrder = async () => {
    try {
      const response = await axios.get(
        baseURL + `farmer/last-order/${formerid}`
      );
      response.data.date = getCurrentDate();
      setCurrorder(response.data[0]);
      setCart(response.data[0].items);
    } catch (err) {
      setMessage(err);
    }
  };

  const setDate = () => {
    var val = currorder;
    val.date = getCurrentDate();
    setCurrorder(val);
  };

  const createOrder = async (comments, total) => {
    try {
      const res = await axios.post(baseURL + `ticket/feedticket`, {
        Former_id: formerData.id,
        Type: "Feed",
        Assigned_By: staff.Staff_id,
        comments: comments,
      });
      const response = await axios.post(
        baseURL + `feed/create-order/${staff.Staff_id}`,
        {
          order: {
            formerId: formerData.id,
            totalPrice: total,
            items: cart,
          },
          ticketid: res.data.Ticket_id,
        }
      );
      setMessage(response.data.message);
      setShowOrderCon(true);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const createTicket = async (type, spId, cow_id, Comments,Level) => {
    console.log(type, spId, cow_id, Comments,Level)
    try {
      const response = await axios.post(baseURL + "ticket/create-ticket", {
        Former_id: formerData.id,
        Type: type,
        SP_Id: spId,
        Assigned_By: staff.Staff_id,
        cow_id: cow_id,
        Comments: Comments,
        Level:Level,
      });
      console.log(response)

      if (response.data.Ticket_id) {
        setTicketId(response.data.Ticket_id);
        setshowdocticket(true);
        setMessage(
          `Ticket created successfully with ID: ${response.data.Ticket_id}`
        );
        // getTicketData();
      } else {
        setMessage("Failed to create ticket");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to create ticket");
    }
  };

  const CheckLogin = () => {
    if (staff.Staff_id === -1) {
      navigate("/");
    }
  };

  const getTicketByFormerId = async (formerId) => {
    try {
      const response = await axios.get(
        baseURL + `ticket/ticketsby/${formerId}`
      );
      setformerTicket(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTicketForAmount = async (comments) => {
    try {
      const res = await axios.post(baseURL + `ticket/feedticket`, {
        Former_id: formerData.id,
        Type: "Feed",
        Assigned_By: staff.Staff_id,
        comments: comments,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  const getTicketForLoan = async (type,comments) => {
    try {
      const res = await axios.post(baseURL + `ticket/feedticket`, {
        Former_id: formerData.id,
        Type: type,
        Assigned_By: staff.Staff_id,
        comments: comments,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const getAllDoc = async () => {
    try {
      const res = await axios.get(baseURL + `admin/getdocdetails`);
      setSp(res.data);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        staff,
        loading,
        TicketData,
        TicketDetail,
        formerData,
        AIdoctor,
        vetdoctor,
        feedProducts,
        supplementaryProducts,
        preorder,
        currorder,
        formerID,
        cart,
        showdocticket,
        ticketId,
        ShowOrderCon,
        formerTicket,
        sp,
        getTicketForLoan,
        getTicketByFormerId,
        getTicketForAmount,
        CheckToken,
        Register,
        setShowOrderCon,
        setshowdocticket,
        setCart,
        createTicket,
        setCurrorder,
        setLoading,
        loginStaff,
        getTicketData,
        GetTicketDetails,
        checkFormerId,
        GetFormerData,
        setDate,
        getCurrentDate,
        createOrder,
        CheckLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
