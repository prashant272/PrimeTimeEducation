import mongoose from "mongoose";

const previousEditionSchema = new mongoose.Schema(
    {
        year: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        editionLabel: {
            type: String,
            required: true,
        },
        locations: {
            type: [String],
            required: true,
        },
        date: {
            type: String, // e.g., "October 2025" or ISO string
            required: true,
        },
        hero: {
            type: String,
            required: true,
        },
        images: {
            type: [String], // Array of AWS S3 URLs
            default: [],
        },
        slug: {
            type: String,
            required: true,
        },
        videoLinks: {
            type: [String], // Array of raw YouTube URLs
            default: [],
        },
    },
    { timestamps: true }
);

const PreviousEdition = mongoose.model("PreviousEdition", previousEditionSchema);

export default PreviousEdition;
