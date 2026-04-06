import { useEffect, useState } from "react";
import api from "../services/api";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    capacity: "",
    image_url: "",
  });

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (eventId, eventTitle) => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      const response = await api.post("/registrations", {
        user_id: user.id,
        event_id: eventId,
      });

      alert(response.data.message || `Registered for ${eventTitle}`);
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      if (!token) {
        alert("Please login first");
        return;
      }

      await api.delete(`/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleEditClick = (event) => {
    setEditingEventId(event.id);
    setEditFormData({
      title: event.title,
      description: event.description,
      event_date: event.event_date ? String(event.event_date).split("T")[0] : "",
      location: event.location,
      capacity: event.capacity,
      image_url: event.image_url || "",
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSave = async (eventId) => {
    try {
      if (!token) {
        alert("Please login first");
        return;
      }

      await api.put(`/events/${eventId}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Event updated successfully");
      setEditingEventId(null);
      fetchEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    setEditFormData({
      title: "",
      description: "",
      event_date: "",
      location: "",
      capacity: "",
      image_url: "",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff, #c471f5)",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "2.5rem",
            marginBottom: "10px",
          }}
        >
          Explore Events
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "30px",
            fontSize: "1.1rem",
          }}
        >
          Browse available events and register instantly.
        </p>

        {events.length === 0 ? (
          <p style={{ textAlign: "center", color: "white" }}>No events found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "25px",
            }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  padding: "25px",
                  color: "white",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                }}
              >
                {editingEventId === event.id ? (
                  <>
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      placeholder="Title"
                      style={inputStyle}
                    />

                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      placeholder="Description"
                      style={inputStyle}
                    />

                    <input
                      type="date"
                      name="event_date"
                      value={editFormData.event_date}
                      onChange={handleEditChange}
                      style={inputStyle}
                    />

                    <input
                      type="text"
                      name="location"
                      value={editFormData.location}
                      onChange={handleEditChange}
                      placeholder="Location"
                      style={inputStyle}
                    />

                    <input
                      type="number"
                      name="capacity"
                      value={editFormData.capacity}
                      onChange={handleEditChange}
                      placeholder="Capacity"
                      style={inputStyle}
                    />

                    <input
                      type="text"
                      name="image_url"
                      value={editFormData.image_url}
                      onChange={handleEditChange}
                      placeholder="Image URL"
                      style={inputStyle}
                    />

                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <button style={saveButtonStyle} onClick={() => handleUpdateSave(event.id)}>
                        Save
                      </button>

                      <button style={cancelButtonStyle} onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {event.image_url && (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "15px",
                          marginBottom: "15px",
                        }}
                      />
                    )}

                    <h3 style={{ marginBottom: "10px" }}>{event.title}</h3>
                    <p style={{ marginBottom: "10px" }}>
                      <strong>Description:</strong> {event.description}
                    </p>
                    <p style={{ marginBottom: "8px" }}>
                      <strong>Date:</strong> {event.event_date}
                    </p>
                    <p style={{ marginBottom: "8px" }}>
                      <strong>Location:</strong> {event.location}
                    </p>
                    <p style={{ marginBottom: "8px" }}>
                      <strong>Capacity:</strong> {event.capacity}
                    </p>

                    {user?.role === "admin" && (
                      <p style={{ marginBottom: "15px" }}>
                        <strong>Registered Users:</strong> {event.registration_count}
                      </p>
                    )}

                    {user?.role === "admin" ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button style={updateButtonStyle} onClick={() => handleEditClick(event)}>
                          Update
                        </button>

                        <button style={deleteButtonStyle} onClick={() => handleDelete(event.id)}>
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button
                        style={registerButtonStyle}
                        onClick={() => handleRegister(event.id, event.title)}
                      >
                        Register Now
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "none",
  borderRadius: "10px",
  outline: "none",
  boxSizing: "border-box",
};

const updateButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#ffd166",
  color: "#222",
  fontWeight: "bold",
  cursor: "pointer",
};

const deleteButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#ef4444",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const saveButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#22c55e",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const cancelButtonStyle = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#6b7280",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const registerButtonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#ffd166",
  color: "#222",
  fontWeight: "bold",
  cursor: "pointer",
};

export default EventsPage;