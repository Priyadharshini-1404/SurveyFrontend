const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// User sends survey request → notify admins
router.post("/survey-request", notificationController.notifyAdminsNewRequest);

// Admin responds → notify user
router.post("/survey-response", notificationController.notifyUserSurveyResponse);

// Get notifications by user
router.get("/:userId", notificationController.getNotificationsByUser);

module.exports = router;
