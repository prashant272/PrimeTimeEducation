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

// Fetch a single nomination by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const doc = await Nomination.findOne({ _id: req.params.id, user: req.user.id }).lean();
    if (!doc) return res.status(404).json({ message: "Nomination not found" });
    return res.json(doc);
  } catch (err) {
    console.error("Fetch nomination error:", err);
    return res.status(500).json({ message: "Unable to fetch nomination" });
  }
});

// Update a nomination
router.put("/:id", authenticate, async (req, res) => {
  try {
    const nomination = await Nomination.findOne({ _id: req.params.id, user: req.user.id });
    if (!nomination) return res.status(404).json({ message: "Nomination not found" });

    // Only allow editing if status is "nominated"
    if (nomination.status !== "nominated") {
      return res.status(403).json({ message: "This nomination can no longer be edited" });
    }

    Object.assign(nomination, req.body);
    await nomination.save();

    return res.json(nomination);
  } catch (err) {
    console.error("Update nomination error:", err);
    return res.status(400).json({ message: err?.message || "Unable to update nomination" });
  }
});

export default router;

