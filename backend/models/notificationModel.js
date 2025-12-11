// models/notificationModel.js
const { sql, config } = require("../config/dbConfig");

class Notification {
  static async createNotification({ senderId, receiverId, message, type }) {
    const pool = await sql.connect(config);
    await pool.request()
      .input("senderId", sql.Int, senderId || null)
      .input("receiverId", sql.Int, receiverId)
      .input("message", sql.NVarChar(500), message)
      .input("type", sql.NVarChar(100), type || null)
      .input("status", sql.NVarChar(20), "unread")
      .query(`
        INSERT INTO Notifications (senderId, receiverId, message, type, status, createdAt)
        VALUES (@senderId, @receiverId, @message, @type, @status, GETDATE())
      `);
  }

  static async getNotificationsByReceiver(receiverId) {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("receiverId", sql.Int, receiverId)
      .query(`
        SELECT Id, senderId, receiverId, message, type, status, createdAt
        FROM Notifications
        WHERE receiverId = @receiverId
        ORDER BY createdAt DESC
      `);
    return result.recordset;
  }
}

module.exports = Notification;
