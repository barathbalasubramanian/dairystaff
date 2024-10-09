import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormerDetailsPage from "./pages/FomerDetailPage";
import FormerServicePage from "./pages/FormerServicePage";
import TicketStatusPage from "./pages/TicketStatusPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import FormerIdPage from "./pages/FormerIdPage";
import FeedPage from "./pages/FeedPage";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./pages/PrivateRoute";
import useAuth from "./pages/UseAuth";
import SpPage from "./pages/SpPage";
import { useState } from "react";
function App() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useAuth(() => setIsAuthChecked(true));
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/formerDetails" element={<FormerDetailsPage />} />
        <Route path="/formerService" element={<FormerServicePage />} />
        <Route path="/ticketStatus" element={<TicketStatusPage />} />
        <Route path="/ticketDetails" element={<TicketDetailsPage />} />
        <Route path="/formerId" element={<FormerIdPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/sp" element={<SpPage />} />
      </Routes>
    </>
  );
}

export default App;
