require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { sql, connectDB } = require("./config/dbConfig");

// Import routes
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appoinmentRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const cardpaymentRoutes = require("./routes/cardpaymentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes");
const profileRoutes = require("./routes/profileRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const razorpayWebRoutes = require("./routes/razorpayRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
connectDB();
console.log("✅ Database connected:", process.env.DB_SERVER);

// Connected users: userId -> [socketId,...]
const connectedUsers = {};

// Socket IO
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("register", (userId) => {
    if (!userId) return;
    if (!connectedUsers[userId]) connectedUsers[userId] = [];
    connectedUsers[userId].push(socket.id);
    console.log(`Registered socket ${socket.id} for user ${userId}`);
  });

  // admin broadcast helper via client (optional)
  socket.on("sendNotificationToAdmins", async ({ message, type }) => {
    try {
      const result = await sql.query`SELECT Id FROM Users WHERE Role='admin'`;
      const admins = result.recordset || [];
      admins.forEach((admin) => {
        const sockets = connectedUsers[admin.Id] || [];
        sockets.forEach(sock => io.to(sock).emit("receiveNotification", { message, type }));
      });
    } catch (err) { console.error(err); }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Disconnected:", socket.id);
    Object.keys(connectedUsers).forEach((uid) => {
      connectedUsers[uid] = connectedUsers[uid].filter(id => id !== socket.id);
      if (connectedUsers[uid].length === 0) delete connectedUsers[uid];
    });
  });
});

// Helpers available to controllers via app.get('notifyAdmins') / app.get('notifyUser')
app.set("notifyAdmins", async (payload) => {
  // Send to all connected sockets (optionally filter admins by DB check)
  Object.values(connectedUsers).forEach((sockArray) => {
    sockArray.forEach(sockId => io.to(sockId).emit("receiveNotification", payload));
  });
});

app.set("notifyUser", (userId, payload) => {
  const sockets = connectedUsers[userId] || [];
  sockets.forEach(sockId => io.to(sockId).emit("receiveNotification", payload));
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/api/cardpayments", cardpaymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api", razorpayWebRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
