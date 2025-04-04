import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./Dashboard/DashboardPage";
import RoomDetailPage from "./Dashboard/RoomDetail/RoomDetailPage";
import MeterReading from "./Meter reading/Meterreading";
import BillingSelection from "./Bill List/BillList";
import Notificate from "./Notificate/Notificate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/room/:roomNumber" element={<RoomDetailPage />} />
        <Route path="/Meter" element={<MeterReading />} />
        <Route path="/Bill" element={<BillingSelection />} />
        <Route path="/Notificate" element={<Notificate />} />
      </Routes>
    </Router>
  );
}

export default App;
