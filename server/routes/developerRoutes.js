import express from "express";
import { signToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const DEVELOPER_PASSWORD = process.env.DEVELOPER_PASSWORD || "PrimeTimeDev2025!";

router.post("/login", (req, res) => {
    const { password } = req.body;

    if (password === DEVELOPER_PASSWORD) {
        // Issue a token with admin role
        const token = signToken({ role: "admin", developerBypass: true });
        return res.json({ token, message: "Developer bypass successful" });
    }

    return res.status(401).json({ message: "Invalid developer password" });
});

export default router;
