import express from "express";
import multer from "multer";
import path from "path";
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3.js";

import PreviousEdition from "../models/PreviousEdition.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit per image
});

// Helper to get signed URL
const getSignedImageUrl = async (key) => {
    if (!key) return null;
    if (key.startsWith("http")) {
        try {
            const url = new URL(key);
            key = url.pathname.substring(1);
        } catch {
            return key;
        }
    }

    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn: 3600 * 24 * 7 }); // 7 days
};

// Public: GET /api/previous-editions (list all, sorted by year desc)
router.get("/", async (req, res) => {
    try {
        const docs = await PreviousEdition.find().sort({ year: -1 }).lean();

        for (let doc of docs) {
            if (doc.images && doc.images.length > 0) {
                doc.images = await Promise.all(doc.images.map(img => getSignedImageUrl(img)));
            }
        }

        return res.json(docs);
    } catch (err) {
        console.error("Fetch previous editions error:", err);
        return res.status(500).json({ message: "Unable to fetch previous editions" });
    }
});

// Public: GET /api/previous-editions/:identifier lookup by year OR slug
router.get("/:identifier", async (req, res) => {
    try {
        const identifier = req.params.identifier;
        let query;

        // Check if it's a number (year)
        if (!isNaN(identifier) && identifier.length === 4) {
            query = { year: Number(identifier) };
        } else {
            // It's a slug, we need to match it against title
            // Since we don't store a slug, we'll find all and filter, or we generate slug on the fly
            // We can use a regex or just find all and match the slugified title.
            // Better yet, let's just use regex for case-insensitive match without special characters.
            const formattedTitle = identifier.replace(/-/g, " ");
            query = { title: { $regex: new RegExp(`^${formattedTitle}$`, "i") } };
        }

        let doc = await PreviousEdition.findOne(query).lean();

        // Fallback logic if it was a slug but couldn't be matched easily
        if (!doc && isNaN(identifier)) {
            const allDocs = await PreviousEdition.find().lean();
            doc = allDocs.find(d => {
                const slug = d.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                return slug === identifier;
            });
        }

        if (!doc) return res.status(404).json({ message: "Previous edition not found" });

        if (doc.images && doc.images.length > 0) {
            doc.images = await Promise.all(doc.images.map(img => getSignedImageUrl(img)));
        }

        return res.json(doc);
    } catch (err) {
        console.error("Fetch previous edition error:", err);
        return res.status(500).json({ message: "Unable to fetch previous edition" });
    }
});

// Protected: POST /api/previous-editions
router.post("/", authenticate, requireAdmin, upload.array("images", 50), async (req, res) => {
    try {
        const payload = req.body;
        let imageKeys = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const filename = `previous-editions/images-${uniqueSuffix}${path.extname(file.originalname)}`;

                const uploadParams = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: filename,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };

                await s3Client.send(new PutObjectCommand(uploadParams));
                imageKeys.push(filename);
            }
        }

        const newEdition = await PreviousEdition.create({
            ...payload,
            locations: payload.locations ? (Array.isArray(payload.locations) ? payload.locations : [payload.locations]) : [],
            videoLinks: payload.videoLinks ? (Array.isArray(payload.videoLinks) ? payload.videoLinks : payload.videoLinks.split(',').map(s => s.trim()).filter(Boolean)) : [],
            images: imageKeys
        });

        return res.status(201).json(newEdition);
    } catch (err) {
        console.error("Create previous edition error:", err);
        return res.status(400).json({ message: err?.message || "Unable to create previous edition" });
    }
});

// Protected: PUT /api/previous-editions/:id
router.put("/:id", authenticate, requireAdmin, upload.array("newImages", 50), async (req, res) => {
    try {
        const edition = await PreviousEdition.findById(req.params.id);
        if (!edition) return res.status(404).json({ message: "Previous edition not found" });

        const payload = req.body;
        let existingImages = payload.existingImages || [];
        if (!Array.isArray(existingImages)) {
            existingImages = [existingImages];
        }

        // We expect existingImages to be the URLs. We need to parse back the keys.
        const finalKeys = [];
        for (const url of existingImages) {
            if (url && url.trim() !== '') {
                try {
                    // Determine if it's our signed URL or raw key
                    if (url.startsWith("http")) {
                        const parsedUrl = new URL(url);
                        let key = parsedUrl.pathname.substring(1);
                        finalKeys.push(decodeURIComponent(key));
                    } else {
                        finalKeys.push(url);
                    }
                } catch (e) {
                    // Ignore
                    finalKeys.push(url);
                }
            }
        }

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const filename = `previous-editions/images-${uniqueSuffix}${path.extname(file.originalname)}`;

                const uploadParams = {
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: filename,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };

                await s3Client.send(new PutObjectCommand(uploadParams));
                finalKeys.push(filename);
            }
        }

        edition.year = payload.year || edition.year;
        edition.title = payload.title || edition.title;
        edition.editionLabel = payload.editionLabel || edition.editionLabel;

        if (payload.locations !== undefined) {
            edition.locations = Array.isArray(payload.locations) ? payload.locations : [payload.locations];
        }

        edition.date = payload.date || edition.date;
        edition.hero = payload.hero || edition.hero;

        if (payload.videoLinks !== undefined) {
            edition.videoLinks = Array.isArray(payload.videoLinks) ? payload.videoLinks : payload.videoLinks.split(',').map(s => s.trim()).filter(Boolean);
        }

        edition.images = finalKeys;

        await edition.save();
        return res.json(edition);
    } catch (err) {
        console.error("Update previous edition error:", err);
        return res.status(400).json({ message: err?.message || "Unable to update previous edition" });
    }
});

// Protected: DELETE /api/previous-editions/:id
router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
    try {
        const edition = await PreviousEdition.findById(req.params.id);
        if (!edition) return res.status(404).json({ message: "Previous edition not found" });

        // Delete images from S3
        if (edition.images && edition.images.length > 0) {
            for (const key of edition.images) {
                try {
                    await s3Client.send(new DeleteObjectCommand({
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: key
                    }));
                } catch (s3Err) {
                    console.error("Failed to delete S3 object:", key, s3Err);
                }
            }
        }

        await edition.deleteOne();
        return res.json({ message: "Previous edition deleted successfully" });
    } catch (err) {
        console.error("Delete previous edition error:", err);
        return res.status(500).json({ message: "Unable to delete previous edition" });
    }
});

export default router;
