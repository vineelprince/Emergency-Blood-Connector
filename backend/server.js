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

// Database Connection
connectDB();

const app = express();
const httpServer = createServer(app);

// Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://emergency-blood-connector-1.onrender.com",
  "https://emergency-blood-connector.onrender.com",
  process.env.CLIENT_URL,
].filter(Boolean);

console.log('Allowed CORS origins:', allowedOrigins);

// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Extra Socket.IO origin check (handshake)
io.use((socket, next) => {
  try {
    const origin = socket.handshake.headers.origin;
    if (!origin || allowedOrigins.includes(origin)) return next();
    const err = new Error('Origin not allowed by CORS');
    err.data = { allowedOrigins };
    return next(err);
  } catch (e) {
    return next(e);
  }
});

export { io };

// CORS options that echo allowed origin (needed when credentials: true)
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));

// Fallback to always set CORS headers when origin matches (ensures headers for error responses)
app.use((req, res, next) => {
  // handle OPTIONS fast path
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      return res.sendStatus(200);
    }
    return res.sendStatus(204);
  }

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
});
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bloodbanks", bloodBankRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/emergency-alerts", emergencyAlertRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).send("Emergency Blood Connector API Running...");
});

// Socket Connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});