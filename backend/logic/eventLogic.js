const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { pool } = require("../database/db");
const s3 = require("../config/s3");
const { validateEvent } = require("../../utils");

// CREATE EVENT
const createEvent = async (req, res) => {
  try {
    const { title, description, event_date, location, capacity } = req.body;
    const created_by = req.user.id;

    if (!validateEvent({ title, description, date: event_date })) {
      return res.status(400).json({ message: "Invalid event data" });
    }

    let image_url = null;

    // Upload image to S3 if exists
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });

      await s3.send(command);

      image_url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }

    const newEvent = await pool.query(
      `INSERT INTO events (title, description, event_date, location, capacity, image_url, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, description, event_date, location, capacity, image_url, created_by]
    );

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent.rows[0],
    });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EVENTS + REGISTRATION COUNT
const getAllEvents = async (req, res) => {
  try {
    const events = await pool.query(
      `SELECT
        events.*,
        COUNT(registrations.id) AS registration_count
       FROM events
       LEFT JOIN registrations ON events.id = registrations.event_id
       GROUP BY events.id
       ORDER BY events.created_at DESC`
    );

    res.status(200).json(events.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE EVENT
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date, location, capacity, image_url } = req.body;

    if (!title || !description || !event_date || !location || !capacity) {
      return res.status(400).json({ message: "All fields required" });
    }

    const updatedEvent = await pool.query(
      `UPDATE events
       SET title = $1,
           description = $2,
           event_date = $3,
           location = $4,
           capacity = $5,
           image_url = $6
       WHERE id = $7
       RETURNING *`,
      [title, description, event_date, location, capacity, image_url || null, id]
    );

    if (updatedEvent.rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EVENT
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await pool.query(
      "DELETE FROM events WHERE id = $1 RETURNING *",
      [id]
    );

    if (deletedEvent.rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};