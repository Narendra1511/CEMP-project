import { Link, useNavigate } from "react-router-dom";

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
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#131313",
            fontWeight: "bold",
            fontSize: "1.3rem",
            letterSpacing: "0.5px",
          }}
        >
          CEMP
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <NavItem to="/">Home</NavItem>
          <NavItem to="/events">Events</NavItem>

          {!user && <NavItem to="/login">Login</NavItem>}
          {!user && <NavItem to="/register">Signup</NavItem>}

          {user && user.role === "user" && (
            <NavItem to="/my-registrations">My Registrations</NavItem>
          )}

          {user && user.role === "admin" && (
            <NavItem to="/create-event">Create Event</NavItem>
          )}

          {user && (
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 16px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#ef4444",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "white",
        fontWeight: "600",
        padding: "10px 14px",
        borderRadius: "10px",
        transition: "0.3s ease",
        background: "rgba(28, 26, 26, 0.98)",
      }}
    >
      {children}
    </Link>
  );
}

export default Navbar;