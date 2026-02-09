import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiX, FiRefreshCcw } from "react-icons/fi";
import { Crown } from "lucide-react";
import { createNomination, fetchNominationById, updateUserNomination } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const categoryMap = {
  "Higher Education": {
    "Overall Excellence": [
      "University of the Year",
      "Emerging University of the Year",
      "Best Private University",
      "Best Government / Public University",
      "Best Deemed-to-be University",
      "Best International University (India / Asia / Global)",
      "Excellence in Higher Education Award",
      "University of the Year (India)",
      "Excellence in Higher Education – India",
      "Most Trusted University Brand (India)",
      "Outstanding Vice-Chancellor Leadership Award",
    ],
    "Research & Innovation": [
      "Excellence in Research & Development",
      "Best Research University",
      "Innovation & Technology Excellence Award",
      "Best Patent & Intellectual Property Initiative",
      "Best Incubation & Startup Support University",
      "Excellence in Industry-Academia Collaboration",
      "Research & Innovation Excellence Award",
      "Best Doctoral & Research University",
    ],
    "Internationalization": [
      "Excellence in Global Education",
      "Best International Collaboration",
      "Best Student Exchange Program",
      "Excellence in Study Abroad Programs",
      "Best Foreign University Collaboration",
      "Global Collaboration Excellence (India)",
      "Best International Student Support University",
      "Study in India Excellence Award",
      "International Research Partnerships Award",
    ],
    "Digital & Online Learning": [
      "Excellence in Digital Learning",
      "Best Online University / Program",
      "Excellence in EdTech Integration",
      "Best Learning Management System (LMS)",
      "Digital University of the Year",
    ],
    "Campus & Student Experience": [
      "Best University Infrastructure",
      "Smart & Digital Campus Award",
      "Excellence in Green & Sustainable Campus",
      "Best Residential Campus",
      "Excellence in Student Support Services",
      "Best Campus Life & Student Engagement",
      "Excellence in Alumni Engagement",
    ],
    "Discipline Excellence": [
      "Best Engineering University (India)",
      "Best Medical & Healthcare University",
      "Best Management / Business School",
      "Best Law University",
      "Best Agriculture & Allied Sciences University",
      "Best Science, Technology & Innovation University",
      "Best Liberal Arts & Humanities University",
      "Best Liberal Arts University",
    ],
  },
  "School (K-12)": {
    "Overall Excellence": [
      "Best Private School (K-12)",
      "Outstanding Primary School of the Year",
      "Best School for Holistic Development",
      "Excellence in Smart Classroom Infrastructure",
      "School of the Year",
    ],
    "Innovation & Academic": [
      "Best Curriculum Innovation",
      "Excellence in Teaching & Learning",
      "Best Online & Blended Learning Model",
    ],
    "Campus & Support": [
      "Best School Infrastructure",
      "Excellence in Student Wellness & Counseling",
      "Best Inclusive Education Initiative",
    ],
  },
  "Individual Educator": {
    "Leadership Awards": [
      "Visionary Leader in Education",
      "Outstanding Principal of the Year",
      "Academic Leader of the Year",
      "Outstanding Vice-Chancellor Leadership Award",
      "Lifetime Achievement in Education",
      "Lifetime Contribution to Indian Education",
      "Excellence in Educational Leadership",
      "Education Icon of the Year",
    ],
    "Teaching & Research": [
      "Teacher of the Year (Innovation in Pedagogy)",
      "Outstanding Faculty Award",
      "Young Educator of the Year",
      "Lifetime Achievement in Academic Research",
      "Faculty Excellence Award",
    ],
  },
  "EdTech & Organization": {
    "Solutions & Innovation": [
      "Best EdTech Platform for K-12",
      "Excellence in AI-Powered Learning Solutions",
      "Most Innovative Digital Curriculum Provider",
      "Best Learning Management System (LMS)",
      "Startup & Innovation Ecosystem Award",
      "University Incubation Center of the Year",
      "Future Skills & Emerging Technologies Award",
    ],
    "Employability & Industry": [
      "Skill India Excellence Award",
      "Industry–Academia Collaboration Award",
      "Internship & Apprenticeship Excellence",
      "Employability & Career Readiness Award",
      "Best Placement & Career Excellence",
    ],
  },
  "Social Impact & Special": {
    "Community & Inclusion": [
      "Excellence in Community Education Outreach",
      "Outstanding NGO for Adult Literacy",
      "Best CSR Initiative in Education",
      "Green & Sustainable University (India)",
      "Excellence in Social Impact & Community Development",
      "Inclusive Education & Accessibility Award",
      "Women Empowerment in Higher Education",
      "Rural & Regional Education Excellence",
      "Excellence in Social Responsibility",
      "Best Community Engagement Program",
    ],
    "Special Recognition": [
      "Iconic University of the Decade",
      "Transformational Education Award",
      "University with Best Governance Practices",
      "Excellence in Quality Assurance & Accreditation",
      "Rising Star University Award",
    ],
  },
};

const initialForm = {
  participationType: "nominated as award", // default
  category: "",
  subCategory: "",
  otherSubCategory: "",
  nomineeName: "",
  organization: "",
  designation: "", // for simple form
  mobile: "",      // for simple form
  email: "",       // for simple form

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

  preferredLocation: "",
  remarks: "",
  acceptTerms: false,
};

export default function NominationForm() {
  const { id } = useParams();
  const { token, user: authUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const inputRef = useRef({});

  const isEditMode = !!id;

  // Load existing nomination if editing
  useEffect(() => {
    if (isEditMode && token) {
      const load = async () => {
        try {
          setLoading(true);
          const data = await fetchNominationById(id, token);

          if (data.status !== "nominated") {
            setError("This nomination can no longer be edited.");
            return;
          }

          setForm(prev => ({
            ...prev,
            ...data,
            subCategory: data.subCategory || "",
            otherSubCategory: data.otherSubCategory || "",
            acceptTerms: false,
          }));
        } catch (err) {
          setError(err.message || "Failed to load nomination data");
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [id, token, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (name === "participationType") {
      setForm(() => ({
        ...initialForm,
        participationType: value,
      }));
      setFieldErrors({});
      return;
    }

    if (name === "category") {
      setForm((prev) => ({
        ...prev,
        category: value,
        subCategory: "",
        otherSubCategory: "",
      }));
      return;
    }

    if (name === "subCategory") {
      setForm((prev) => ({
        ...prev,
        subCategory: value,
        otherSubCategory: value === "Other" ? prev.otherSubCategory : "",
      }));
      return;
    }

    // Phone Input Restriction
    const phoneFields = ["mobile", "contactMobile", "orgHeadMobile"];
    if (phoneFields.includes(name)) {
      const allowedRegex = /^[\d\s\+\-\(\)]*$/;
      if (!allowedRegex.test(value)) {
        alert("Text are not allowed! Please enter only phone number.");
        return;
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredAward = [
      "category", "subCategory", "nomineeName", "organization",
      "orgHeadName", "orgHeadDesignation", "orgHeadMobile", "orgHeadEmail",
      "contactName", "contactDesignation", "contactMobile", "contactEmail",
      "street", "city", "state", "zip"
    ];
    const requiredOther = ["nomineeName", "organization", "designation", "mobile", "email"];

    const list = form.participationType === "nominated as award" ? requiredAward : requiredOther;

    list.forEach(field => {
      if (!form[field] || (typeof form[field] === "string" && form[field].trim() === "")) {
        errors[field] = "Required";
      }
    });

    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    const phoneFields = ["mobile", "contactMobile", "orgHeadMobile"];

    phoneFields.forEach(field => {
      if (form[field] && form[field].trim() !== "" && !phoneRegex.test(form[field])) {
        errors[field] = "Invalid format";
      }
    });

    if (form.participationType === "nominated as award" && form.subCategory === "Other" && !form.otherSubCategory) {
      errors.otherSubCategory = "Specify category";
    }

    if (!form.acceptTerms) {
      errors.acceptTerms = "Required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      alert("Please fill all mandatory fields marked in red.");

      const currentErrors = {};
      const requiredAward = ["category", "subCategory", "nomineeName", "organization", "orgHeadName", "orgHeadDesignation", "orgHeadMobile", "orgHeadEmail", "contactName", "contactDesignation", "contactMobile", "contactEmail", "street", "city", "state", "zip"];
      const requiredOther = ["nomineeName", "organization", "designation", "mobile", "email"];
      const list = form.participationType === "nominated as award" ? requiredAward : requiredOther;

      list.forEach(f => { if (!form[f] || (typeof form[f] === "string" && form[f].trim() === "")) currentErrors[f] = true; });

      const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
      ["mobile", "contactMobile", "orgHeadMobile"].forEach(f => {
        if (form[f] && !phoneRegex.test(form[f])) currentErrors[f] = true;
      });

      if (form.participationType === "nominated as award" && form.subCategory === "Other" && !form.otherSubCategory) currentErrors.otherSubCategory = true;
      if (!form.acceptTerms) currentErrors.acceptTerms = true;

      const keys = Object.keys(currentErrors);
      if (keys.length > 0 && inputRef.current[keys[0]]) {
        inputRef.current[keys[0]].scrollIntoView({ behavior: "smooth", block: "center" });
        inputRef.current[keys[0]].focus();
      }
      return;
    }

    try {
      setSubmitting(true);
      if (isEditMode) {
        await updateUserNomination(id, form, token);
        navigate(`/dashboard`);
      } else {
        await createNomination(form, token);
        navigate("/success");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const groupedSubCategories = categoryMap[form.category] || {};

  const getSelectClass = (name) => {
    const base = "w-full bg-black/60 border rounded-lg px-4 py-3 text-white outline-none transition-all focus:ring-2 focus:ring-[#d4af37]/50";
    const errorClass = fieldErrors[name] ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "border-white/20 hover:border-[#d4af37]/40";
    return `${base} ${errorClass}`;
  };

  const getInputClass = (name) => {
    const base = "w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10 focus:ring-2 focus:ring-[#d4af37]/50";
    const errorClass = fieldErrors[name] ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "border-white/20 hover:border-[#d4af37]/40";
    return `${base} ${errorClass}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#3a1418] flex items-center justify-center">
        <FiRefreshCcw className="text-[#d4af37] w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-32 relative overflow-hidden bg-[#3a1418]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#d4af37] opacity-[0.03] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#d4af37] opacity-[0.03] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={() => isEditMode ? navigate(-1) : navigate("/")}
            className="flex items-center gap-2 text-[#d4af37] hover:text-[#f2d06b] transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <FiArrowLeft className="text-lg" /> {isEditMode ? "Go Back" : "Back to Home"}
          </button>
          {authUser && (
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white/5 py-1 px-3 rounded-full border border-white/10">
              Authenticated: {authUser.email}
            </p>
          )}
        </div>

        <div className="mb-8 md:mb-12 text-center relative">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-[#d4af37] animate-pulse" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f2d06b] to-[#c62828] uppercase tracking-tighter leading-none px-2">
              {isEditMode ? "Update Nomination" : "Education Excellence Awards"}
            </h1>
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-[#d4af37] animate-pulse" />
          </div>

          <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto rounded-full mb-8"></div>

          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed px-4 italic">
            {isEditMode
              ? "Refine your submission to ensure every detail shines for the jury review."
              : "Honor the pioneers, celebrate the innovators. Register your presence or nominate for excellence in the education sector."
            }
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-center">
            <p className="font-bold flex items-center justify-center gap-2">
              <span className="text-lg">⚠️</span> {error}
            </p>
          </div>
        )}

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">

            {/* Participation Choice */}
            <div className="md:col-span-2 space-y-4">
              <label className="text-sm font-bold text-[#d4af37] uppercase tracking-widest pl-1">
                Choose Your Presence Role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: "nominated as award", label: "Nominated as Award", icon: "🏆" },
                  { id: "attend as speaker", label: "Attend as Speaker", icon: "🎤" },
                  { id: "attend as exhibitor", label: "Attend as Exhibitor", icon: "🎪" },
                  { id: "attend as sponsor", label: "Attend as Sponsor", icon: "💎" },
                ].map((type) => (
                  <label
                    key={type.id}
                    className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                      ${form.participationType === type.id
                        ? "bg-gradient-to-br from-[#d4af37] to-[#b8860b] border-transparent text-black scale-105 shadow-[0_15px_30px_rgba(212,175,55,0.2)]"
                        : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20"
                      }`}
                  >
                    <input
                      type="radio"
                      name="participationType"
                      value={type.id}
                      checked={form.participationType === type.id}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className={`text-2xl mb-2 transition-transform group-hover:scale-125 ${form.participationType === type.id ? "scale-110" : ""}`}>
                      {type.icon}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {form.participationType === "nominated as award" ? (
              <>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="sm:col-span-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Award Classification
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Primary Sector *</label>
                    <select
                      name="category"
                      ref={el => inputRef.current.category = el}
                      value={form.category}
                      onChange={handleChange}
                      className={getSelectClass("category")}
                    >
                      <option value="" className="bg-[#3a1418]">-- Select Sector --</option>
                      {Object.keys(categoryMap).map((t) => (
                        <option key={t} value={t} className="bg-[#3a1418]">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Award Category *</label>
                    <select
                      name="subCategory"
                      ref={el => inputRef.current.subCategory = el}
                      value={form.subCategory}
                      onChange={handleChange}
                      disabled={!form.category}
                      className={getSelectClass("subCategory")}
                    >
                      <option value="" className="bg-[#3a1418]">-- Pick an Award --</option>
                      {Object.entries(groupedSubCategories).map(([group, list]) => (
                        <optgroup key={group} label={group} className="bg-black text-[#d4af37] font-bold">
                          {list.map((item) => (
                            <option key={item} value={item} className="bg-[#3a1418] text-white font-normal">
                              {item}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      {form.category && (
                        <option value="Other" className="bg-[#3a1418] text-[#d4af37] font-bold italic">Other Category...</option>
                      )}
                    </select>
                  </div>

                  {form.subCategory === "Other" && (
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2">Custom Category Details *</label>
                      <input
                        name="otherSubCategory"
                        ref={el => inputRef.current.otherSubCategory = el}
                        value={form.otherSubCategory}
                        onChange={handleChange}
                        placeholder="Type your suggested category title here"
                        className={`${getInputClass("otherSubCategory")} border-[#d4af37]/30 ring-[#d4af37]/10`}
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Nominee Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Name of Nominee / Professional *</label>
                      <input
                        name="nomineeName"
                        ref={el => inputRef.current.nomineeName = el}
                        placeholder="Ex: Dr. Prashant Kumar"
                        value={form.nomineeName}
                        onChange={handleChange}
                        className={getInputClass("nomineeName")}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Organization / School / Institution *</label>
                      <input
                        name="organization"
                        ref={el => inputRef.current.organization = el}
                        placeholder="Organization Name"
                        value={form.organization}
                        onChange={handleChange}
                        className={getInputClass("organization")}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/5">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Organization Head Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Head Name *</label>
                      <input name="orgHeadName" ref={el => inputRef.current.orgHeadName = el} value={form.orgHeadName} onChange={handleChange} className={getInputClass("orgHeadName")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Designation *</label>
                      <input name="orgHeadDesignation" ref={el => inputRef.current.orgHeadDesignation = el} value={form.orgHeadDesignation} onChange={handleChange} className={getInputClass("orgHeadDesignation")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Mobile Number *</label>
                      <input name="orgHeadMobile" ref={el => inputRef.current.orgHeadMobile = el} value={form.orgHeadMobile} onChange={handleChange} className={getInputClass("orgHeadMobile")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Official Email *</label>
                      <input name="orgHeadEmail" ref={el => inputRef.current.orgHeadEmail = el} value={form.orgHeadEmail} onChange={handleChange} className={getInputClass("orgHeadEmail")} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/5">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Contact Person Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Name *</label>
                      <input name="contactName" ref={el => inputRef.current.contactName = el} value={form.contactName} onChange={handleChange} className={getInputClass("contactName")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Designation *</label>
                      <input name="contactDesignation" ref={el => inputRef.current.contactDesignation = el} value={form.contactDesignation} onChange={handleChange} className={getInputClass("contactDesignation")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Mobile *</label>
                      <input name="contactMobile" ref={el => inputRef.current.contactMobile = el} value={form.contactMobile} onChange={handleChange} className={getInputClass("contactMobile")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email *</label>
                      <input name="contactEmail" ref={el => inputRef.current.contactEmail = el} value={form.contactEmail} onChange={handleChange} className={getInputClass("contactEmail")} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/5 grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Website</label>
                    <input name="website" value={form.website} onChange={handleChange} className={getInputClass("website")} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Annual Turnover</label>
                    <input name="turnover" value={form.turnover} onChange={handleChange} className={getInputClass("turnover")} />
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 border-t border-white/5 space-y-6">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Location & Logistics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Street Address *</label>
                      <input name="street" ref={el => inputRef.current.street = el} value={form.street} onChange={handleChange} className={getInputClass("street")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">City *</label>
                      <input name="city" ref={el => inputRef.current.city = el} value={form.city} onChange={handleChange} className={getInputClass("city")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">State *</label>
                      <input name="state" ref={el => inputRef.current.state = el} value={form.state} onChange={handleChange} className={getInputClass("state")} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">ZIP Code *</label>
                      <input name="zip" ref={el => inputRef.current.zip = el} value={form.zip} onChange={handleChange} className={getInputClass("zip")} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="md:col-span-2 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#d4af37]/20 flex items-center justify-center mb-6 border border-[#d4af37]/30 shadow-inner text-2xl">
                    📝
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#d4af37] mb-2 uppercase tracking-tighter text-center">Registration Info</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-8 text-center max-w-md italic">
                    You are registering to attend as a {form.participationType.split(' ').pop()}. Our team will review your profile and reach out for coordination.
                  </p>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Full Name *</label>
                      <input name="nomineeName" ref={el => inputRef.current.nomineeName = el} placeholder="Ex: Dr. Prashant Kumar" value={form.nomineeName} onChange={handleChange} className={getInputClass("nomineeName")} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Organization *</label>
                      <input name="organization" ref={el => inputRef.current.organization = el} placeholder="Company / Institution Name" value={form.organization} onChange={handleChange} className={getInputClass("organization")} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Designation *</label>
                      <input name="designation" ref={el => inputRef.current.designation = el} placeholder="Current Job Title" value={form.designation} onChange={handleChange} className={getInputClass("designation")} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Mobile Contact *</label>
                      <input name="mobile" ref={el => inputRef.current.mobile = el} placeholder="+91 XXXXX XXXXX" value={form.mobile} onChange={handleChange} className={getInputClass("mobile")} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Official Email *</label>
                      <input name="email" ref={el => inputRef.current.email = el} placeholder="work@domain.com" value={form.email} onChange={handleChange} className={getInputClass("email")} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-3 ml-1">Portfolio / Website</label>
                      <input name="website" placeholder="https://example.com" value={form.website} onChange={handleChange} className={getInputClass("website")} />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="md:col-span-2 pt-8 border-t border-white/5 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#d4af37]"></span> Preferred Event Location
              </h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold ml-1">(Optional - Please select your preference)</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {["New Delhi", "Dubai", ].map((loc) => (
                  <label
                    key={loc}
                    className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer text-center
                      ${form.preferredLocation === loc
                        ? "bg-[#d4af37] border-transparent text-black font-bold shadow-[0_5px_15px_rgba(212,175,55,0.3)]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                      }`}
                  >
                    <input type="radio" name="preferredLocation" value={loc} checked={form.preferredLocation === loc} onChange={handleChange} className="hidden" />
                    <span className="text-xs uppercase tracking-tighter">{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 pt-8 border-t border-white/5">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Additional Remarks</label>
              <textarea name="remarks" value={form.remarks} onChange={handleChange} rows={4} placeholder="Your message..." className={`${getInputClass("remarks")} resize-none`} />
            </div>

            <div className="md:col-span-2 bg-white/5 border border-white/5 p-6 rounded-2xl group transition-all hover:bg-white/[0.07]">
              <label className="flex gap-4 cursor-pointer select-none">
                <div className="relative flex items-center pt-1">
                  <input type="checkbox" name="acceptTerms" ref={el => inputRef.current.acceptTerms = el} checked={form.acceptTerms} onChange={handleChange} className="w-5 h-5 rounded border-2 border-[#d4af37]/40 bg-transparent checked:bg-[#d4af37] appearance-none transition-all cursor-pointer" />
                  {form.acceptTerms && <span className="absolute left-[3px] top-[4px] text-black text-[10px] font-bold pointer-events-none">✓</span>}
                </div>
                <div className="flex-1">
                  <p className={`text-sm tracking-tight transition-colors ${fieldErrors.acceptTerms ? "text-red-400" : "text-gray-300"}`}>
                    <span className="font-bold text-[#d4af37]">DECLARATION:</span> I hereby verify that I have reviewed the Terms & Conditions. The data provided is true to the best of my knowledge.
                  </p>
                </div>
              </label>
            </div>

            <div className="md:col-span-2 flex flex-col items-center gap-4 py-8">
              <button
                type="submit"
                disabled={submitting}
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-12 py-4 font-black tracking-[0.2em] uppercase transition-all duration-300 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black rounded-full overflow-hidden shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_20px_50px_-5px_rgba(212,175,55,0.6)] hover:-translate-y-1 active:scale-95 disabled:grayscale disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {submitting ? "Processing..." : isEditMode ? "Update Submission" : "Submit Registration"}
                  {!submitting && <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>}
                </span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
