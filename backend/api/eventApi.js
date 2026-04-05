const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("../logic/eventLogic");

const { protect, adminOnly } = require("../security/authCheck");

router.get("/", getAllEvents);
router.post("/", protect, adminOnly, createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);

module.exports = router;