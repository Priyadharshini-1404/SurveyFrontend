const express = require("express");
const router = express.Router();
const controller = require("../controllers/surveyController");

router.post("/", controller.createSurveyRequest);
router.get("/all", controller.getSurveyRequests);
router.get("/track", controller.getSurveyRequests);
router.get("/user/:userId", controller.getUserSurveys);
router.put("/update-status/:id", controller.updateStatus);

module.exports = router;
