import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "https://emergency-blood-connector-backend-0bdo.onrender.com";

const socket = io(
  SOCKET_URL
);

export default socket;