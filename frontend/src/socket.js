import { io } from "socket.io-client";

const socket = io(
  "https://emergency-blood-connector.onrender.com",
  {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ['websocket', 'polling'],
    withCredentials: true,
  }
);

export default socket;