import { useEffect, useState } from "react";
import api from "../services/api";

function MyRegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        if (!user) return;

        const response = await api.get(`/registrations/${user.id}`);
        setRegistrations(response.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };

    fetchRegistrations();
  }, [user]);

  const handleCancel = async (eventId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmCancel) return;

    try {
      const response = await api.delete("/registrations", {
        data: {
          user_id: user.id,
          event_id: eventId,
        },
      });

      alert(response.data.message || "Registration cancelled successfully");

      // refresh list
      const refreshResponse = await api.get(`/registrations/${user.id}`);
      setRegistrations(refreshResponse.data);
    } catch (error) {
      alert(error.response?.data?.message || "Cancel failed");
      console.error("Cancel error:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f093fb, #f5576c)",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "30px",
          }}
        >
          My Registrations
        </h2>

        {registrations.length === 0 ? (
          <p style={{ textAlign: "center", color: "white" }}>
            No registrations found.
          </p>
        ) : (
          registrations.map((reg) => (
            <div
              key={reg.id}
              style={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                padding: "20px",
                borderRadius: "15px",
                marginBottom: "15px",
                color: "white",
              }}
            >
              <h3>{reg.title}</h3>
              <p>{reg.description}</p>
              <p>
                <strong>Date:</strong> {reg.event_date}
              </p>
              <p>
                <strong>Location:</strong> {reg.location}
              </p>

              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleCancel(reg.event_id)}
              >
                Cancel Registration
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyRegistrationsPage;