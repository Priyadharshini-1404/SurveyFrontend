import axios from "axios";
import { socket } from "./socket"; // ✅ make sure the path is correct
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;  

const API_URL =  `${BASE_URL}/notifications`; // same IP as socket.js

// Save to DB
export const sendNotificationToDB = async (senderId, receiverId, message, type) => {
  try {
    await axios.post(`${API_URL}/api/notifications`, {
      senderId,
      receiverId,
      message,
      type,
    });
  } catch (err) {
    console.log("Failed to save notification:", err);
  }
};
export const getAllAdmins = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/auth/admins`);
    return res.data; // [{id:1}, {id:2}, {id:3}]
  } catch (err) {
    console.log("Error fetching admins:", err);
    return [];
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