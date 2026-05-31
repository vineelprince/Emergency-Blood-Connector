import express from "express";

import {
  getAllDonors,
  searchDonors,
} from "../controllers/donorController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= GET ALL DONORS =================

router.get("/", verifyToken, getAllDonors);


// ================= SEARCH DONORS =================

router.get("/search", verifyToken, searchDonors);


export default router;