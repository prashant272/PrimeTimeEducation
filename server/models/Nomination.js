import mongoose from "mongoose";

const nominationSchema = new mongoose.Schema(
  {
    registrationType: {
      type: String,
      required: true,
      trim: true,
    },
    nomineeName: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    // Organization head
    orgHeadName: {
      type: String,
      required: true,
      trim: true,
    },
    orgHeadDesignation: {
      type: String,
      required: true,
      trim: true,
    },
    orgHeadMobile: {
      type: String,
      required: true,
      trim: true,
    },
    orgHeadEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Contact person
    contactName: {
      type: String,
      required: true,
      trim: true,
    },
    contactDesignation: {
      type: String,
      required: true,
      trim: true,
    },
    contactMobile: {
      type: String,
      required: true,
      trim: true,
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Business details
    website: {
      type: String,
      trim: true,
      default: "",
    },
    turnover: {
      type: String,
      trim: true,
      default: "",
    },

    // Address
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: String,
      required: true,
      trim: true,
    },

    // General remarks visible to both admin and user
    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    // Nomination evaluation status (admin-controlled)
    status: {
      type: String,
      enum: ["nominated", "evaluation", "in_progress", "selected", "rejected"],
      default: "nominated",
    },

    // Financial / follow-up status (admin-only)
    paymentStatus: {
      type: String,
      enum: ["not_paid", "initial_paid", "paid", "not_interested"],
      default: "not_paid",
    },

    // Amount agreed/paid for this nomination (admin-only)
    amount: {
      type: String,
      trim: true,
      default: "",
    },

    // Final category decided by admin (can differ from user-selected category)
    assignedCategory: {
      type: String,
      trim: true,
      default: "",
    },

    // Internal remark for admin about status / payment / communication
    adminRemark: {
      type: String,
      trim: true,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Helpful indexes for faster admin queries & filtering
nominationSchema.index({ user: 1, createdAt: -1 });
nominationSchema.index({ status: 1, createdAt: -1 });
nominationSchema.index({ paymentStatus: 1, createdAt: -1 });

const Nomination = mongoose.model("Nomination", nominationSchema);

export default Nomination;



