import axios from "axios";
import { socket } from "./socket"; // ✅ make sure the path is correct

const API_URL = "http://192.168.1.9:5000/api/notifications"; // same IP as socket.js

// ✅ Send a new notification (DB + real-time)
export const sendNotification = async (senderId, receiverId, message, type) => {
  try {
    await axios.post(API_URL, { senderId, receiverId, message, type }); // Save to DB
    socket.emit("sendNotification", { receiverId, message, type }); // Real-time send
    console.log("✅ Notification sent successfully:", message);
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
};

// ✅ Fetch notifications for a specific user
export const fetchNotifications = async (receiverId) => {
  try {
    const response = await axios.get(`${API_URL}/${receiverId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    return [];
  }
};