import axios from "axios";

// ⚠️ Replace with your local IP if using Expo on device
const BASE_URL = "http://192.168.1.10:5000/api";

export const sendSurveyRequestNotification = async (userId) => {
  try {
    await axios.post(`${BASE_URL}/notifications/survey-request`, {
      userId,
      message: "New survey request submitted",
      type: "survey-request",
    });
  } catch (err) {
    console.log("Error notifying admins:", err.response?.data || err.message);
  }
};

export const sendSurveyResponseNotification = async (adminId, userId, action) => {
  const message =
    action === "accept"
      ? "Your survey request has been ACCEPTED"
      : "Your survey request has been REJECTED";

  try {
    await axios.post(`${BASE_URL}/notifications/survey-response`, {
      adminId,
      userId,
      message,
      type: "survey-status",
    });
  } catch (err) {
    console.log("Error notifying user:", err.response?.data || err.message);
  }
};

export const fetchNotifications = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/notifications/${userId}`);
    return res.data;
  } catch (err) {
    console.log("Error fetching notifications:", err.response?.data || err.message);
    return [];
  }
};
