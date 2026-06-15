import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import bloodBankRoutes from "./routes/bloodBankRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import emergencyAlertRoutes from "./routes/emergencyAlertRoutes.js";

dotenv.config();

console.log("Starting Emergency Blood Connector Server...");

connectDB();

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://emergency-blood-connector-1.onrender.com",
  "https://emergency-blood-connector.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST"],
    allowEIO3: true,
    transports: ['websocket', 'polling'],
  },
  allowUpgrades: true,
  pingInterval: 25000,
  pingTimeout: 20000,
});

export { io };

io.on("connection", (socket) => {
  console.log("Socket Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket Disconnected:", socket.id);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bloodbanks", bloodBankRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/emergency-alerts", emergencyAlertRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Emergency Blood Connector API Running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});