import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, ArrowLeft, Image as ImageIcon, Video, Calendar, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
    fetchPreviousEditions,
    createPreviousEdition,
    updatePreviousEdition,
    deletePreviousEdition
} from "../services/api";

export default function AdminPreviousEditions({ customToken }) {
    const { token: authContextToken } = useAuth();
    const token = customToken || authContextToken;

    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEdition, setEditingEdition] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        year: "",
        title: "",
        editionLabel: "",
        locations: "",
        date: "",
        hero: "",
        videoLinks: "",
    });

    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        loadEditions();
    }, []);

    const loadEditions = async () => {
        try {
            setLoading(true);
            const data = await fetchPreviousEditions();
            setEditions(data);
        } catch (err) {
            setError(err.message || "Failed to load previous editions");
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = () => {
        setEditingEdition(null);
        setFormData({
            year: "", title: "", editionLabel: "", locations: "",
            date: "", hero: "", videoLinks: ""
        });
        setExistingImages([]);
        setNewImages([]);
        setIsModalOpen(true);
    };

    const openEditModal = (edition) => {
        setEditingEdition(edition);
        setFormData({
            year: edition.year,
            title: edition.title,
            editionLabel: edition.editionLabel,
            locations: Array.isArray(edition.locations) ? edition.locations.join(", ") : edition.locations,
            date: edition.date,
            hero: edition.hero,
            videoLinks: Array.isArray(edition.videoLinks) ? edition.videoLinks.join(", ") : edition.videoLinks,
        });
        setExistingImages(edition.images || []);
        setNewImages([]);
        setIsModalOpen(true);
    };

    const handleRemoveExistingImage = (idx) => {
        setExistingImages(prev => prev.filter((_, i) => i !== idx));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(prev => [...prev, ...files]);
    };

    const handleRemoveNewImage = (idx) => {
        setNewImages(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const dataToSubmit = new FormData();
            dataToSubmit.append("year", formData.year);
            dataToSubmit.append("title", formData.title);
            dataToSubmit.append("editionLabel", formData.editionLabel);

            // Parse locations
            const locs = formData.locations.split(",").map(s => s.trim()).filter(Boolean);
            locs.forEach(loc => dataToSubmit.append("locations", loc));

            dataToSubmit.append("date", formData.date);
            dataToSubmit.append("hero", formData.hero);

            // Parse video links
            const vids = formData.videoLinks.split(",").map(s => s.trim()).filter(Boolean);
            vids.forEach(vid => dataToSubmit.append("videoLinks", vid));

            if (editingEdition) {
                // Append existing images
                existingImages.forEach(img => dataToSubmit.append("existingImages", img));
                // Append new images
                newImages.forEach(file => dataToSubmit.append("newImages", file));

                await updatePreviousEdition(editingEdition._id, dataToSubmit, token);
            } else {
                newImages.forEach(file => dataToSubmit.append("images", file));
                await createPreviousEdition(dataToSubmit, token);
            }

            setIsModalOpen(false);
            loadEditions();
        } catch (err) {
            setError(err.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this edition?")) return;
        try {
            await deletePreviousEdition(id, token);
            loadEditions();
        } catch (err) {
            alert("Delete failed: " + err.message);
        }
    };

    // Helper input classes from main admin dashboard
    const inputClass = "w-full rounded-lg bg-[#23251c]/60 border border-[#d4af3790]/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60 ";

    return (
        <div className="p-6 md:p-10 pt-24 md:pt-32 w-full min-h-screen bg-[#0f0c08]/50 text-white relative">
            <header className="mb-14 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-[#d4af37]/20 pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#ffe78c] via-[#c09a21] to-[#fae36e] bg-clip-text text-transparent">
                        Previous Editions
                    </h1>
                    <p className="text-[#eddfae] text-lg font-medium opacity-80">
                        Manage the event archive for the public
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="relative z-50 flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa8920] text-black font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition transform hover:-translate-y-1"
                >
                    <Plus size={18} /> Add New Edition
                </button>
            </header>

            {error && <div className="mb-6 p-4 bg-red-900/40 border border-red-500 rounded-xl text-red-200 relative z-40">{error}</div>}

            {loading ? (
                <div className="flex animate-pulse text-[#d4af37]">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {editions.map(ed => (
                        <div key={ed._id} className="bg-gradient-to-br from-[#1a160a] to-[#241b0a] border border-[#d4af37]/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 flex gap-2 z-10">
                                <button onClick={() => openEditModal(ed)} className="w-8 h-8 rounded-full bg-[#2b2512]/90 text-[#d4af37] border border-[#d4af37]/50 flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition">
                                    <Edit2 size={14} />
                                </button>
                                <button onClick={() => handleDelete(ed._id)} className="w-8 h-8 rounded-full bg-red-900/60 text-red-400 border border-red-400/50 flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <div className="text-3xl font-black text-[#d4af37] opacity-20 absolute -bottom-2 -right-2 tracking-tighter z-0">
                                {ed.year}
                            </div>

                            <div className="relative z-10">
                                <span className="inline-block px-2 py-1 rounded bg-[#d4af37]/10 text-[#fbe376] text-xs font-bold uppercase tracking-wider mb-2 border border-[#d4af37]/20">
                                    {ed.editionLabel}
                                </span>
                                <h3 className="text-xl font-bold text-[#eed99b] mb-1">{ed.title}</h3>

                                <div className="flex items-center gap-2 text-sm text-[#c7ba7e] mb-2">
                                    <Calendar size={14} /> {ed.date}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#c7ba7e] mb-4">
                                    <MapPin size={14} /> {ed.locations?.join(", ")}
                                </div>

                                <div className="flex gap-4 mb-2">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <ImageIcon size={14} /> {ed.images?.length || 0} Photos
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <Video size={14} /> {ed.videoLinks?.length || 0} Videos
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {editions.length === 0 && (
                        <div className="col-span-full py-10 text-center text-gray-500 border border-dashed border-gray-700 rounded-2xl">
                            No previous editions found.
                        </div>
                    )}
                </div>
            )}

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999] p-4 backdrop-blur-sm">
                    <div className="bg-[#120f0a] border border-[#d4af37]/40 p-8 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl leading-none">
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold text-[#d4af37] mb-6">
                            {editingEdition ? `Edit Edition: ${editingEdition.title}` : "Add New Previous Edition"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-[#f6e589] font-semibold mb-1 block">Year</label>
                                    <input type="number" required className={inputClass} value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} placeholder="e.g. 2025" />
                                </div>
                                <div>
                                    <label className="text-sm text-[#f6e589] font-semibold mb-1 block">Edition Label</label>
                                    <input type="text" required className={inputClass} value={formData.editionLabel} onChange={e => setFormData({ ...formData, editionLabel: e.target.value })} placeholder="e.g. 13th Edition" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm text-[#f6e589] font-semibold mb-1 block">Title</label>
                                    <input type="text" required className={inputClass} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Global Healthcare Awards 2025" />
                                </div>
                                <div>
                                    <label className="text-sm text-[#f6e589] font-semibold mb-1 block">Date</label>
                                    <input type="text" required className={inputClass} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} placeholder="e.g. 22nd February 2025" />
                                </div>
                                <div>
                                    <label className="text-sm text-[#f6e589] font-semibold mb-1 block">Locations (comma separated)</label>
                                    <input type="text" required className={inputClass} value={formData.locations} onChange={e => setFormData({ ...formData, locations: e.target.value })} placeholder="Dubai, India" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm text-[#f6e589] font-semibold mb-1 block">Hero / Description</label>
                                    <textarea rows={3} required className={inputClass} value={formData.hero} onChange={e => setFormData({ ...formData, hero: e.target.value })} placeholder="Short description..." />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm text-[#f6e589] font-semibold mb-1 block flex items-center gap-2">
                                        <Video size={16} /> Video Links (raw YouTube URLs, comma separated)
                                    </label>
                                    <textarea rows={3} className={inputClass} value={formData.videoLinks} onChange={e => setFormData({ ...formData, videoLinks: e.target.value })} placeholder="https://www.youtube.com/watch?v=123, https://youtu.be/456" />
                                </div>
                            </div>

                            <div className="border border-[#d4af37]/20 p-4 rounded-xl bg-[#0a0805]">
                                <label className="text-sm text-[#f6e589] font-semibold mb-2 flex items-center gap-2">
                                    <ImageIcon size={16} /> Media Gallery Photos
                                </label>

                                {/* Existing Images */}
                                {existingImages.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-400 mb-2">Existing Images:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {existingImages.map((img, idx) => (
                                                <div key={idx} className="relative group w-20 h-20 rounded shadow-md overflow-hidden bg-white/5">
                                                    <img src={img} className="w-full h-full object-cover" alt="existing" />
                                                    <button type="button" onClick={() => handleRemoveExistingImage(idx)} className="absolute inset-0 bg-red-900/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* New Images */}
                                <div className="mb-2">
                                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37]/20 file:text-[#d4af37] hover:file:bg-[#d4af37]/30 transition" />
                                </div>

                                {newImages.length > 0 && (
                                    <div>
                                        <p className="text-xs text-gray-400 mb-2">Selected New Images:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {newImages.map((file, idx) => (
                                                <div key={idx} className="relative group w-20 h-20 rounded shadow-md overflow-hidden bg-white/10 flex items-center justify-center text-xs text-center p-1 break-all">
                                                    {file.name}
                                                    <button type="button" onClick={() => handleRemoveNewImage(idx)} className="absolute inset-0 bg-red-900/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-[#d4af37]/20">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800 transition">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading} className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa8920] text-black font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition">
                                    {loading ? "Saving..." : "Save Edition"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
