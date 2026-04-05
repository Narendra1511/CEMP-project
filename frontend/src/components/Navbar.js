import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      style={{
        width: "100%",
        background: "#0f172a",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        padding: "14px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Title */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          Cloud Event Management Platform
        </Link>

        {/* Menu */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/events">Events</NavItem>

          {!user && <NavItem to="/login">Login</NavItem>}
          {!user && <NavItem to="/register">Signup</NavItem>}

          {user?.role === "user" && (
            <NavItem to="/my-registrations">My Registrations</NavItem>
          )}

          {user?.role === "admin" && (
            <NavItem to="/create-event">Create Event</NavItem>
          )}

          {user && (
            <button
              onClick={handleLogout}
              style={logoutStyle}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

/* 🔥 Hover-enabled NavItem */
function NavItem({ to, children }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: "none",
        color: hover ? "#0f172a" : "white",
        fontWeight: "600",
        padding: "10px 14px",
        borderRadius: "10px",
        background: hover ? "#ffd166" : "#1e293b",
        transform: hover ? "scale(1.08)" : "scale(1)",
        transition: "all 0.25s ease",
        cursor: "pointer",
      }}
    >
      {children}
    </Link>
  );
}

/* Logout button style */
const logoutStyle = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#ef4444",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};

export default Navbar;