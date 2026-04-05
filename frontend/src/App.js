import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsPage from "./pages/EventsPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import CreateEventPage from "./pages/CreateEventPage";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowNavbar(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowNavbar(false);
    }, 1000); // delay before hiding
  };

  return (
    <Router>
      {/* Hover zone */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 2000,
        }}
      >
        {/* invisible hover area */}
        <div style={{ height: "20px" }} />

        {/* animated navbar */}
        <div
          style={{
            transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
            opacity: showNavbar ? 1 : 0,
            transition: "all 0.4s ease",
          }}
        >
          <Navbar />
        </div>
      </div>

      {/* page content */}
      <div style={{ paddingTop: "20px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/my-registrations" element={<MyRegistrationsPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;