import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-container">
        <h1 className="main-title">Cloud Event Management Platform</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/my-registrations" element={<MyRegistrationsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;