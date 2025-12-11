const Notification = require("../models/notificationModel");
const sql = require("mssql");
const dbConfig = require("../config/dbConfig");

// User → Admins
exports.notifyAdminsNewRequest = async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const pool = await sql.connect(dbConfig);
    const admins = await pool.request().query(`SELECT id FROM Users WHERE role='admin'`);
    for (let admin of admins.recordset) {
      await Notification.createNotification({ senderId: userId, receiverId: admin.id, message, type });
    }
    res.status(201).json({ message: "Notification sent to all admins" });

  } catch (err) {
    console.error(err); res.status(500).json({ message: "Server error" });
  }
};

// Admin → User
exports.notifyUserSurveyResponse = async (req, res) => {
  try {
    const { adminId, userId, message, type } = req.body;
    if (!adminId || !userId || !message) return res.status(400).json({ message: "Invalid data" });
    await Notification.createNotification({ senderId: adminId, receiverId: userId, message, type });
    res.status(201).json({ message: "Notification sent to user" });

  } catch (err) {
    console.error(err); res.status(500).json({ message: "Server error" });
  }
};

// Get notifications for a user
exports.getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.getByUserId(userId);
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err); res.status(500).json({ message: "Server error" });
  }
};
