import { io } from "socket.io-client";

// ⚠️ Replace this with your system’s IPv4 address (run "ipconfig" in terminal)
// Example: http://192.168.1.8:5000
const SOCKET_URL = "http://192.168.1.5:5000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
});

// Optional: connect log
socket.on("connect", () => {
  console.log("🟢 Socket connected:", socket.id);
});
