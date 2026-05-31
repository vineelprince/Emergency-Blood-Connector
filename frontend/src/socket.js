import { io } from "socket.io-client";

const socket = io(
  "https://emergency-blood-connector.onrender.com"
);

export default socket;