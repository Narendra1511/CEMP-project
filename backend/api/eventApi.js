const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents } = require("../logic/eventLogic");
const { protect, adminOnly } = require("../security/authCheck");

router.post("/", protect, adminOnly, createEvent);
router.get("/", getAllEvents);

module.exports = router;