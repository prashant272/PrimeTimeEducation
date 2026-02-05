import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Nomination from "../models/Nomination.js";
import { authenticate, requireAdmin, signToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN EMAIL:", email);
    console.log("LOGIN PASSWORD:", password);

    const user = await User.findOne({ email: email.toLowerCase() });

    console.log("FOUND USER:", user ? "YES" : "NO");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("USER ROLE:", user.role);
    console.log("HASH FROM DB:", user.passwordHash);

    const ok = await bcrypt.compare(password, user.passwordHash);
    console.log("BCRYPT MATCH:", ok);

    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken({ id: user._id, role: user.role });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});


// List all nominations (admin)
router.get("/nominations", authenticate, requireAdmin, async (_req, res) => {
  try {
    const docs = await Nomination.find({})
      .populate("user", "email name role")
      .sort({ createdAt: -1 });
    return res.json(docs);
  } catch (err) {
    console.error("Fetch admin nominations error:", err);
    return res.status(500).json({ message: "Unable to fetch nominations" });
  }
});

// Update nomination status
router.patch("/nominations/:id/status", authenticate, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body || {};
    const updated = await Nomination.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("user", "email name role");

    if (!updated) return res.status(404).json({ message: "Nomination not found" });
    return res.json(updated);
  } catch (err) {
    console.error("Update nomination status error:", err);
    return res.status(400).json({ message: err?.message || "Unable to update status" });
  }
});

// Update nomination (admin)
router.put("/nominations/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const payload = req.body || {};
    // prevent user reassignment
    delete payload.user;

    const updated = await Nomination.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    }).populate("user", "email name role");

    if (!updated) return res.status(404).json({ message: "Nomination not found" });
    return res.json(updated);
  } catch (err) {
    console.error("Update nomination error:", err);
    return res.status(400).json({ message: err?.message || "Unable to update nomination" });
  }
});

// Delete nomination (admin)
router.delete("/nominations/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const deleted = await Nomination.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Nomination not found" });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Delete nomination error:", err);
    return res.status(500).json({ message: "Unable to delete nomination" });
  }
});

export default router;

