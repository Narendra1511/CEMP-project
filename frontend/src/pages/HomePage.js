import { Link } from "react-router-dom";

function HomePage() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8fafc" }}>
      {/* Hero Section */}
      <div
        style={{
          minHeight: "90vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div style={{ maxWidth: "900px" }}>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "20px" }}>
            Cloud Event Management Platform
          </h1>

          <p style={{ fontSize: "1.2rem", marginBottom: "30px", lineHeight: "1.6" }}>
            Plan, manage, and attend events with a modern cloud-powered platform.
            Admins can create and manage events, while users can explore and register easily.
          </p>

          {user && (
            <p
              style={{
                display: "inline-block",
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: "10px 20px",
                borderRadius: "20px",
                marginBottom: "25px",
              }}
            >
              Welcome, <strong>{user.name}</strong> ({user.role})
            </p>
          )}

          <div style={{ marginTop: "20px" }}>
            <Link to="/events">
              <button style={heroButton("#ffcc70")}>Explore Events</button>
            </Link>

            {!user && (
              <Link to="/login">
                <button style={heroButton("#70e1f5")}>Login</button>
              </Link>
            )}

            {!user && (
              <Link to="/register">
                <button style={heroButton("#ffd194")}>Signup</button>
              </Link>
            )}

            {user && user.role === "user" && (
              <Link to="/my-registrations">
                <button style={heroButton("#c2ffd8")}>My Registrations</button>
              </Link>
            )}

            {user && user.role === "admin" && (
              <Link to="/create-event">
                <button style={heroButton("#fff3b0")}>Create Event</button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2.2rem", marginBottom: "40px", color: "#1e293b" }}>
          Why Use CEMP?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "25px",
          }}
        >
          <div style={cardStyle}>
            <div style={iconStyle}>📅</div>
            <h3>Smart Event Management</h3>
            <p>Create, update, and organize events in one place with a clean admin workflow.</p>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>📝</div>
            <h3>Quick Registration</h3>
            <p>Users can browse events and register instantly with a simple and user-friendly interface.</p>
          </div>

          <div style={cardStyle}>
            <div style={iconStyle}>☁️</div>
            <h3>Cloud Ready</h3>
            <p>Cloud Ready

Developed using AWS EC2 (backend), AWS S3 (storage & hosting), CloudWatch (monitoring), GitHub Actions (CI/CD), and PostgreSQL (Supabase) for data management.</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            textAlign: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>24/7</h2>
            <p>Cloud Access</p>
          </div>
          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>100%</h2>
            <p>Event Tracking</p>
          </div>
          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Fast</h2>
            <p>User Registration</p>
          </div>
          <div>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Secure</h2>
            <p>Role-Based Access</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "15px", color: "#1e293b" }}>
          Ready to Explore Events?
        </h2>
        <p style={{ color: "#475569", marginBottom: "25px" }}>
          Discover events, register quickly, and manage activities through one beautiful platform.
        </p>

        <Link to="/events">
          <button
            style={{
              padding: "14px 28px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

const heroButton = (bgColor) => ({
  margin: "10px",
  padding: "14px 24px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: bgColor,
  color: "#222",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1rem",
});

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "18px",
  padding: "30px 20px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  textAlign: "center",
  color: "#1e293b",
};

const iconStyle = {
  fontSize: "2.5rem",
  marginBottom: "15px",
};

export default HomePage;