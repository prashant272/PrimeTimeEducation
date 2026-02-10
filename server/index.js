import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import nominationRoutes from "./routes/nominationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * =========================
 * CORS CONFIG (MUST BE FIRST)
 * =========================
 */
app.use(cors({
  origin: [
    "https://www.globaleducationawards.in",
    "https://globaleducationawards.in",
    "https://api.globaleducationawards.in"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

/**
 * =========================
 * BODY PARSER
 * =========================
 */
app.use(express.json());

/**
 * =========================
 * STATIC FILES (LOCAL UPLOADS)
 * =========================
 */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/**
 * =========================
 * DATABASE
 * =========================
 */
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1/primetime_awards";

mongoose
  .connect(MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME || undefined,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

/**
 * =========================
 * HEALTH CHECK
 * =========================
 */
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "PrimeTime Awards API - V2" });
});

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use("/api/auth", authRoutes);
app.use("/api/nominations", nominationRoutes);
app.use("/api/admin", adminRoutes);

/**
 * =========================
 * SERVER
 * =========================
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
