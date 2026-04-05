import { useState } from "react";
import api from "../services/api";

function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    capacity: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        alert("Please login first");
        return;
      }

      if (user.role !== "admin") {
        alert("Only admin can create events");
        return;
      }

      const response = await api.post("/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);

      setFormData({
        title: "",
        description: "",
        event_date: "",
        location: "",
        capacity: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Event creation failed");
      console.error("Create event error:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #43cea2, #185a9d)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "550px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          color: "white",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "2rem",
          }}
        >
          Create New Event
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "100px", resize: "none" }}
            required
          />

          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <button type="submit" style={buttonStyle}>
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  marginBottom: "15px",
  border: "none",
  borderRadius: "10px",
  outline: "none",
  fontSize: "1rem",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#ffd166",
  color: "#222",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "10px",
};

export default CreateEventPage;