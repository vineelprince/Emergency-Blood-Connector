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

console.log("Starting Server...");

connectDB();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

export { io };

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bloodbanks", bloodBankRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/emergency-alerts", emergencyAlertRoutes);

app.get("/", (req, res) => {
  res.send("Emergency Blood Connector API Running...");
});

io.on("connection", (socket) => {

  console.log(
    "User connected:",
    socket.id
  );

  socket.on("disconnect", () => {

    console.log(
      "User disconnected:",
      socket.id
    );

  });

});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
