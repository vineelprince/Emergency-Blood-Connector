import express from "express";

import {
  createRequest,
  getAllRequests,
  getMyRequests,
  updateRequestStatus,
  getRecentRequests,
  respondToRequest,
  getRequestResponders,
} from "../controllers/requestController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= CREATE REQUEST =================

router.post(
  "/",
  verifyToken,
  createRequest
);


// ================= GET ALL REQUESTS =================

router.get(
  "/",
  verifyToken,
  getAllRequests
);


// ================= GET RECENT REQUESTS =================

router.get(
  "/recent",
  verifyToken,
  getRecentRequests
);


// ================= GET MY REQUESTS =================

router.get(
  "/my-requests",
  verifyToken,
  getMyRequests
);


// ================= UPDATE REQUEST STATUS =================

router.put(
  "/:id",
  verifyToken,
  updateRequestStatus
);


// ================= RESPOND TO REQUEST =================

router.post(
  "/:id/respond",
  verifyToken,
  respondToRequest
);


// ================= GET RESPONDERS =================

router.get(
  "/:id/responders",
  verifyToken,
  getRequestResponders
);


export default router;