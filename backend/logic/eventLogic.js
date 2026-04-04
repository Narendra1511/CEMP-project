const pool = require("../database/db");

const createEvent = async (req, res) => {
  try {
    const { title, description, event_date, location, capacity } = req.body;
    const created_by = req.user.id;

    if (!title || !description || !event_date || !location || !capacity) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newEvent = await pool.query(
      `INSERT INTO events (title, description, event_date, location, capacity, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, event_date, location, capacity, created_by]
    );

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await pool.query(
      "SELECT * FROM events ORDER BY created_at DESC"
    );

    res.status(200).json(events.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
};