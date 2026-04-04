const express = require("express");
const router = express.Router();
const {
  registerForEvent,
  cancelRegistration,
  getUserRegistrations,
} = require("../logic/registrationLogic");

router.post("/", registerForEvent);
router.delete("/", cancelRegistration);
router.get("/:user_id", getUserRegistrations);

module.exports = router;