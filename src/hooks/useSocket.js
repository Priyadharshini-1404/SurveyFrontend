import { useEffect } from "react";
import { socket } from "../services/socket";

export default function useSocket(userId) {
  useEffect(() => {
    if (userId) {
      socket.emit("register", userId);
    }
  }, [userId]);

  return socket;
}
 