import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { createNomination } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const categoryMap = {
  Hospital: [
    "Best Multispeciality Hospital",
    "Best Government Hospital",
    "Best Private Hospital",
    "Best Patient Care Hospital",
  ],
  Clinic: [
    "Best Specialty Clinic",
    "Best Dental Clinic",
    "Best IVF / Fertility Clinic",
  ],
  "Diagnostic Center": [
    "Best Diagnostic Center",
    "Best Pathology Lab",
    "Best Imaging Center",
  ],
  "Pharma Company": [
    "Best Pharma Company",
    "Best Generic Medicine Brand",
  ],
  "Individual Doctor": [
    "Best Doctor of the Year",
    "Best Surgeon",
    "Lifetime Achievement in Healthcare",
  ],
  "Healthcare Startup": [
    "Best Healthcare Startup",
    "Best HealthTech Innovation",
  ],
};

const initialForm = {
  registrationType: "",
  category: "",
  nomineeName: "",
  organization: "",

  orgHeadName: "",
  orgHeadDesignation: "",
  orgHeadMobile: "",
  orgHeadEmail: "",

  contactName: "",
  contactDesignation: "",
  contactMobile: "",
  contactEmail: "",

  website: "",
  turnover: "",

  street: "",
  city: "",
  state: "",
  zip: "",

  remarks: "",
  acceptTerms: false,
};

export default function NominationForm() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "registrationType") {
      setForm((prev) => ({
        ...prev,
        registrationType: value,
        category: "",
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.acceptTerms) {
      setError("Please accept Terms & Conditions.");
      return;
    }

    try {
      setSubmitting(true);
      await createNomination(form, token);
      setForm(initialForm);
      setSuccess("Nomination submitted successfully. Thank you!");
    } catch (err) {
      setError(err.message || "Unable to submit nomination");
    } finally {
      setSubmitting(false);
    }
  };

  const categories = categoryMap[form.registrationType] || [];

  const inputClass =
    "w-full rounded-md bg-black/40 border border-white/20 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]";

  return (
    <section className="bg-[#3b1515] text-white min-h-screen py-6 md:py-10 px-4">
      <div className="max-w-4xl mx-auto bg-black/40 border border-[#d4af37]/30 rounded-2xl p-4 md:p-8 shadow-2xl">

        {/* Lightweight header with Back & Close */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-200 hover:text-white"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="p-1 rounded-full hover:bg-white/10 text-gray-200 hover:text-white"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Healthcare Awards Nomination Form
          </h1>
          <p className="mt-2 text-sm text-gray-200">
            Please provide accurate details. All fields are required.
          </p>
          {user && (
            <p className="mt-1 text-xs text-gray-300">
              Logged in as <span className="font-semibold">{user.name}</span> ({user.email})
            </p>
          )}
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/60 px-3 py-2 text-sm text-red-100">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-md bg-emerald-500/10 border border-emerald-500/60 px-3 py-2 text-sm text-emerald-100">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          {/* Registration Type */}
          <div>
            <label className="block text-sm mb-1 text-white">Registration Type</label>
            <select
              name="registrationType"
              value={form.registrationType}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="" className="bg-black text-white">-- Select --</option>
              {Object.keys(categoryMap).map((t) => (
                <option key={t} value={t} className="bg-black text-white">{t}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1 text-white">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              disabled={!form.registrationType}
              className={inputClass}
            >
              <option value="" className="bg-black text-white">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-black text-white">{c}</option>
              ))}
            </select>
          </div>

          {/* Nominee */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-white">Nominee Name</label>
            <input name="nomineeName" value={form.nomineeName} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Organization / Hospital / Clinic</label>
            <input name="organization" value={form.organization} onChange={handleChange} required className={inputClass} />
          </div>

          {/* Organization Head */}
          <div>
            <label className="block text-sm mb-1 text-white">Name of Organization Head</label>
            <input name="orgHeadName" value={form.orgHeadName} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Organization Head Designation</label>
            <input name="orgHeadDesignation" value={form.orgHeadDesignation} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Organization Head Mobile</label>
            <input name="orgHeadMobile" value={form.orgHeadMobile} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Organization Head Email</label>
            <input name="orgHeadEmail" value={form.orgHeadEmail} onChange={handleChange} required className={inputClass} />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-sm mb-1 text-white">Contact Person Name</label>
            <input name="contactName" value={form.contactName} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Contact Person Designation</label>
            <input name="contactDesignation" value={form.contactDesignation} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Contact Person Mobile</label>
            <input name="contactMobile" value={form.contactMobile} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Contact Person Email</label>
            <input name="contactEmail" value={form.contactEmail} onChange={handleChange} required className={inputClass} />
          </div>

          {/* Website & Turnover */}
          <div>
            <label className="block text-sm mb-1 text-white">Website</label>
            <input name="website" value={form.website} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">Turnover (Last Financial Year)</label>
            <input name="turnover" value={form.turnover} onChange={handleChange} className={inputClass} />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-white">Street Address</label>
            <input name="street" value={form.street} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">City</label>
            <input name="city" value={form.city} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">State / Province</label>
            <input name="state" value={form.state} onChange={handleChange} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-white">ZIP / Postal Code</label>
            <input name="zip" value={form.zip} onChange={handleChange} required className={inputClass} />
          </div>

          {/* Remarks */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-white">Remarks</label>
            <textarea name="remarks" value={form.remarks} onChange={handleChange} rows={3} className={inputClass} />
          </div>

          {/* Terms */}
          <div className="md:col-span-2 flex gap-2 text-sm">
            <input type="checkbox" name="acceptTerms" checked={form.acceptTerms} onChange={handleChange} />
            <p className="text-white">
              By filling and submitting the nomination form, I declare that I have read and understood
              the Application, Selection process and the Terms & Conditions of the related awards and
              the information provided is true to the best of my knowledge.
            </p>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-[#d4af37] px-8 py-2 text-sm font-semibold text-black hover:bg-[#c9a530] disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Nomination"}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
