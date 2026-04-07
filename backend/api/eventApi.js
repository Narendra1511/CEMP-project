const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("../logic/eventLogic");

const { protect, adminOnly } = require("../security/authCheck");
const upload = require("../middleware/upload");

router.get("/", getAllEvents);
router.post("/", protect, adminOnly, upload.single("image"), createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);

module.exports = router;