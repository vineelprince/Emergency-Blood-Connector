import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= REGISTER =================

router.post("/register", registerUser);


// ================= LOGIN =================

router.post("/login", loginUser);


// ================= PROTECTED PROFILE =================

router.get("/profile", verifyToken, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});


export default router;