import "./config/env.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import nominationRoutes from "./routes/nominationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import previousEditionsRoutes from "./routes/previousEditionsRoutes.js";
import developerRoutes from "./routes/developerRoutes.js";
import passport from "./config/passport.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(passport.initialize());

/**
 * =========================
 * CORS CONFIG (MUST BE FIRST)
 * =========================
 */
app.use(cors({
  origin: [
    "https://www.globaleducationawards.in",
    "https://globaleducationawards.in",
    "https://api.globaleducationawards.in",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));



/**
 * =========================
 * BODY PARSER
 * =========================
 */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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
app.use("/auth", authRoutes); // Fallback for production proxy stripping /api
app.use("/api/nominations", nominationRoutes);
app.use("/nominations", nominationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/admin", adminRoutes);
app.use("/api/previous-editions", previousEditionsRoutes);
app.use("/api/developer", developerRoutes);

/**
 * =========================
 * GLOBAL ERROR HANDLER
 * =========================
 */
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  
  // Ensure CORS headers are present even on errors
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://www.globaleducationawards.in",
    "https://globaleducationawards.in",
    "https://api.globaleducationawards.in",
    "http://localhost:5173"
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "File too large (Max: 10MB per image)" });
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({ message: "Too many files uploaded (Max: 50)" });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

/**
 * =========================
 * SERVER
 * =========================
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
