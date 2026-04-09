const { pool } = require("../database/db");

const registerForEvent = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;

    if (!user_id || !event_id) {
      return res.status(400).json({ message: "User ID and Event ID are required" });
    }

    const existingRegistration = await pool.query(
      "SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2",
      [user_id, event_id]
    );

    if (existingRegistration.rows.length > 0) {
      return res.status(400).json({ message: "User already registered for this event" });
    }

    const newRegistration = await pool.query(
      `INSERT INTO registrations (user_id, event_id)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, event_id]
    );

    res.status(201).json({
      message: "Registration successful",
      registration: newRegistration.rows[0],
    });
  } catch (error) {
    console.error("Register event error:", error);
    res.status(500).json({ message: error.message });
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;

    if (!user_id || !event_id) {
      return res.status(400).json({ message: "User ID and Event ID are required" });
    }

    const deletedRegistration = await pool.query(
      "DELETE FROM registrations WHERE user_id = $1 AND event_id = $2 RETURNING *",
      [user_id, event_id]
    );

    if (deletedRegistration.rows.length === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.status(200).json({ message: "Registration cancelled successfully" });
  } catch (error) {
    console.error("Cancel registration error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getUserRegistrations = async (req, res) => {
  try {
    const { user_id } = req.params;

    const registrations = await pool.query(
      `SELECT 
        registrations.id,
        registrations.event_id,
        events.title,
        events.description,
        events.event_date,
        events.location,
        events.image_url
       FROM registrations
       JOIN events ON registrations.event_id = events.id
       WHERE registrations.user_id = $1
       ORDER BY registrations.created_at DESC`,
      [user_id]
    );

    res.status(200).json(registrations.rows);
  } catch (error) {
    console.error("Get registrations error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerForEvent,
  cancelRegistration,
  getUserRegistrations,
};