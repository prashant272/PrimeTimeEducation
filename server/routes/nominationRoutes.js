import express from "express";

import Nomination from "../models/Nomination.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a nomination (logged-in user)
router.post("/", authenticate, async (req, res) => {
  try {
    const payload = req.body || {};

    const nomination = await Nomination.create({
      ...payload,
      user: req.user.id,
    });

    return res.status(201).json(nomination);
  } catch (err) {
    console.error("Create nomination error:", err);
    return res.status(400).json({
      message: err?.message || "Unable to create nomination",
    });
  }
});

// Fetch current user's nominations
router.get("/my", authenticate, async (req, res) => {
  try {
    const docs = await Nomination.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    return res.json(docs);
  } catch (err) {
    console.error("Fetch my nominations error:", err);
    return res.status(500).json({ message: "Unable to fetch nominations" });
  }
});

export default router;

