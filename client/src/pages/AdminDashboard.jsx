import { useEffect, useMemo, useState } from "react";
import {
  fetchAdminNominations,
  updateNominationStatus,
  updateNomination,
  deleteNomination,
} from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { ShieldCheck, Edit2, Trash2, Eye } from "lucide-react";
import AdminPreviousEditions from "./AdminPreviousEditions.jsx";

/* ------------------ Constants ------------------ */
const goldGrad =
  "linear-gradient(90deg,#e9d781 0%,#dac24a 29.69%,#fee19a 70%,#bc9830 100%)";

const STATUS_OPTIONS = [
  { value: "nominated", label: "Nomination Received" },
  { value: "evaluation", label: "Under Evaluation" },
  { value: "in_progress", label: "In Progress (Shortlisted for user)" },
  { value: "selected", label: "Selected (Winner)" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  ...STATUS_OPTIONS,
];

const PARTICIPATION_TYPE_FILTER_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "nominated as award", label: "Award Nomination" },
  { value: "attend as speaker", label: "Speaker" },
  { value: "attend as exhibitor", label: "Exhibitor" },
  { value: "attend as sponsor", label: "Sponsor" },
];

const LOCATION_FILTER_OPTIONS = [
  { value: "all", label: "All Locations" },
  { value: "New Delhi", label: "New Delhi" },
  { value: "Dubai", label: "Dubai" },
  { value: "London", label: "London" },
  { value: "USA", label: "USA" },
];

/* ------------------ Status Badge ------------------ */
function StatusBadge({ status }) {
  const normalized = status || "nominated";
  const adminLabel =
    STATUS_OPTIONS.find((s) => s.value === normalized)?.label ||
    "Nomination Received";

  const colorClasses = {
    nominated:
      "bg-gradient-to-r from-[#393d63] to-[#5263a6] text-blue-50 border-blue-400/60 shadow shadow-blue-800/40",
    evaluation:
      "bg-gradient-to-r from-[#a38e65] to-[#ffe69d] text-yellow-800 border-yellow-400/60 shadow shadow-yellow-900/20",
    in_progress:
      "bg-gradient-to-r from-[#4d7330] to-[#bafa6b] text-lime-900 border-lime-400/60 shadow shadow-lime-800/20",
    selected:
      "bg-gradient-to-r from-[#155449] to-[#4eecbe] text-emerald-50 border-emerald-400/70 shadow shadow-emerald-800/20",
    rejected:
      "bg-gradient-to-r from-[#512a23] to-[#a04534] text-red-50 border-red-400/60 shadow shadow-red-800/30",
  }[normalized];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.3 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm ${colorClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {adminLabel}
    </span>
  );
}

const PAYMENT_STATUS_OPTIONS = [
  { value: "not_paid", label: "Not Paid" },
  { value: "initial_paid", label: "Initial Payment" },
  { value: "paid", label: "Paid (Completed)" },
  { value: "not_interested", label: "Not Interested" },
];

/* ================== MAIN COMPONENT ================== */
export default function AdminDashboard() {
  const { token } = useAuth();

  const [nominations, setNominations] = useState([]);
  const [filteredNominations, setFilteredNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [participationTypeFilter, setParticipationTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const [editingNomination, setEditingNomination] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [activeTab, setActiveTab] = useState("nominations");
  const [viewingNomination, setViewingNomination] = useState(null);

  /* ------------------ Load Data ------------------ */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAdminNominations(token);
        setNominations(data);
      } catch (err) {
        setError(err.message || "Failed to load nominations");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  /* ------------------ Filter ------------------ */
  useEffect(() => {
    let filtered = [...nominations];

    if (statusFilter !== "all") {
      filtered = filtered.filter((n) => (n.status || "nominated") === statusFilter);
    }

    if (participationTypeFilter !== "all") {
      filtered = filtered.filter((n) => n.participationType === participationTypeFilter);
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter((n) => n.preferredLocation === locationFilter);
    }

    setFilteredNominations(filtered);
  }, [nominations, statusFilter, participationTypeFilter, locationFilter]);

  const paymentSummary = useMemo(() => {
    const summary = {
      total: nominations.length,
      not_paid: 0,
      initial_paid: 0,
      paid: 0,
      not_interested: 0,
    };
    nominations.forEach((n) => {
      const key = n.paymentStatus || "not_paid";
      if (summary[key] != null) summary[key] += 1;
    });
    return summary;
  }, [nominations]);

  /* ------------------ Status Change ------------------ */
  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      const updated = await updateNominationStatus(id, status, token);
      setNominations((prev) =>
        prev.map((n) => (n._id === id ? { ...n, ...updated } : n))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  /* ------------------ Edit ------------------ */
  const handleEdit = (n) => {
    setEditingNomination(n);
    setEditForm({ ...n });
  };

  const handleSaveEdit = async () => {
    try {
      setUpdatingId(editingNomination._id);
      const updated = await updateNomination(
        editingNomination._id,
        editForm,
        token
      );
      setNominations((prev) =>
        prev.map((n) => (n._id === updated._id ? updated : n))
      );
      setEditingNomination(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  /* ------------------ Delete ------------------ */
  const handleDelete = async () => {
    try {
      setUpdatingId(deleteConfirmId);
      await deleteNomination(deleteConfirmId, token);
      setNominations((prev) =>
        prev.filter((n) => n._id !== deleteConfirmId)
      );
      setDeleteConfirmId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const inputClass =
    "w-full rounded-lg bg-gradient-to-br from-[#23251c]/60 to-[#141015]/80 border border-[#d4af3790]/50 px-3 py-2 text-sm text-white shadow focus:(outline-none ring-2 ring-[#d4af37]/60) placeholder:text-[#d1c894]/60 font-semibold transition";

  /* ================== HELPERS ================== */
  const renderNominationsTable = () => (
    <div className="overflow-x-auto max-h-[90vh] border border-[#eaca5f80] rounded-2xl bg-gradient-to-tr from-[#23201aee] via-[#2b2313cf] to-[#10161aee] shadow-xl shadow-[#d4af3722] backdrop-blur relative">
      <table className="min-w-[1600px] w-full text-xs border-separate border-spacing-0">
        <thead className="sticky top-0 z-40">
          <tr className="bg-gradient-to-r from-[#231e09] to-[#2e2612] text-[#f2eab6] border-0">
            <th className="px-4 py-3 text-left bg-inherit">Participation</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Mobile</th>
            <th className="px-4 py-3 text-left">Nominee</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Payment</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left">Org Head</th>
            <th className="px-4 py-3 text-left">Contact</th>
            <th className="px-4 py-3 text-left">Business</th>
            <th className="px-4 py-3 text-left">Address</th>
            <th className="px-4 py-3 text-left">Remarks</th>
            <th className="px-4 py-3 text-left">Admin Remark</th>
            <th className="px-4 py-3 text-left">Submitted By</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 sticky right-0 bg-[#18130e] text-[#fae36f] z-20 w-[110px] rounded-tr-2xl shadow-xl">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredNominations.map((n, idx) => (
            <tr
              key={n._id}
              className={`transition border-t border-[#eaca5f22] h-[72px] ${idx % 2 === 0
                ? "bg-gradient-to-r from-[#14100a]/60 to-[#2a271ed9]"
                : "bg-gradient-to-r from-[#211c12be] to-[#35341be6]"
                }`}
            >
              <td className="px-4 py-4 font-semibold text-[#fee5af]">
                {n.participationType === "nominated as award" ? "🏆 Award" :
                  n.participationType === "attend as speaker" ? "🎤 Speaker" :
                    n.participationType === "attend as exhibitor" ? "🎪 Exhibitor" :
                      n.participationType === "attend as sponsor" ? "💎 Sponsor" : n.participationType}
              </td>
              <td className="px-4 py-4">
                {n.participationType === "nominated as award" ? (
                  <>
                    <div className="font-semibold text-yellow-300">{n.assignedCategory || n.category}</div>
                    <div className="text-[10px] text-gray-400 opacity-70">{n.subCategory}</div>
                  </>
                ) : (
                  <span className="text-gray-500 italic">N/A</span>
                )}
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-0.5">
                  {[n.mobile, n.contactMobile, n.orgHeadMobile].filter(Boolean).map((phone, i) => (
                    <span key={i} className="text-[#a4fbd2] font-mono text-[11px] whitespace-nowrap">
                      {phone}
                    </span>
                  ))}
                  {![n.mobile, n.contactMobile, n.orgHeadMobile].some(Boolean) && (
                    <span className="text-gray-500">—</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="font-semibold text-lg text-[#d4af37]">{n.nomineeName}</div>
                <div className="text-gray-300 text-[11px] font-mono">
                  {n.organization}
                </div>
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={n.status} />
                <select
                  value={n.status || "nominated"}
                  onChange={(e) => handleStatusChange(n._id, e.target.value)}
                  className="mt-1 w-full rounded bg-[#282313]/60 border border-[#fae36f80] px-1 py-1 text-[11px] text-[#d4af37]"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-4">
                <select
                  value={n.paymentStatus || "not_paid"}
                  onChange={(e) =>
                    setNominations((prev) =>
                      prev.map((row) =>
                        row._id === n._id
                          ? { ...row, paymentStatus: e.target.value }
                          : row
                      )
                    )
                  }
                  onBlur={() =>
                    updateNomination(n._id, { paymentStatus: n.paymentStatus }, token)
                  }
                  className="w-full rounded bg-[#282313]/60 border border-[#fae36f80] px-1 py-1 text-[11px] text-[#d6ae37]"
                >
                  {PAYMENT_STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-4 text-[11px] text-[#e3cd96] font-semibold">
                {n.amount || <span className="text-gray-400 italic">—</span>}
              </td>
              <td className="px-4 py-4 text-[11px]">
                {n.orgHeadName}
                <br />
                <span className="text-gray-400">{n.orgHeadEmail}</span>
              </td>
              <td className="px-4 py-4 text-[11px]">
                {n.contactName}
                <br />
                <span className="text-gray-400">{n.contactEmail}</span>
              </td>
              <td className="px-4 py-4 text-[11px]">
                <span className="font-semibold">Website:</span>{" "}
                {n.website || "-"}
                <br />
                <span className="font-semibold">Turnover:</span>{" "}
                {n.turnover || "-"}
              </td>
              <td className="px-4 py-4 text-[11px]">
                {n.city}, {n.state}
              </td>
              <td className="px-4 py-4 max-w-xs">
                <div className="line-clamp-3">{n.remarks}</div>
              </td>
              <td className="px-4 py-4 max-w-xs text-[11px]">
                <div className="line-clamp-3">
                  {n.adminRemark || <span className="text-gray-500">—</span>}
                </div>
              </td>
              <td className="px-4 py-4 text-[11px]">
                {n.user?.email}
              </td>
              <td className="px-4 py-4 text-[11px] whitespace-nowrap">
                {new Date(n.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-4 sticky right-0 bg-gradient-to-l from-[#18130e] to-[#1f1810ac] z-20 shadow-lg rounded-tr-xl rounded-br-xl">
                <div className="flex gap-2">
                  {n.pdfUrl && (
                    <a
                      href={n.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center border border-blue-400/50 bg-[#101b23]/60 text-blue-400 rounded-full shadow transition hover:bg-gradient-to-tr hover:from-[#99c8fb] hover:to-[#3a86ce] hover:text-[#101b23]"
                      title="View PDF"
                    >
                      <span className="text-sm font-bold">PDF</span>
                    </a>
                  )}
                  <button
                    onClick={() => setViewingNomination(n)}
                    className="w-8 h-8 flex items-center justify-center border border-emerald-400/50 bg-[#10231b]/60 text-emerald-400 rounded-full shadow transition hover:bg-gradient-to-tr hover:from-[#99fbc8] hover:to-[#3ace86] hover:text-[#10231b]"
                    title="View Full Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleEdit(n)}
                    className="w-8 h-8 flex items-center justify-center border border-[#d4af37]/70 bg-[#2b2512]/70 text-[#d4af37] rounded-full shadow transition hover:bg-gradient-to-tr hover:from-[#fbe399] hover:to-[#ceb655] hover:text-[#221d10]"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(n._id)}
                    className="w-8 h-8 flex items-center justify-center border border-red-400/50 bg-[#231010]/60 text-red-400 rounded-full shadow transition hover:bg-gradient-to-tr hover:from-[#fbad99] hover:to-[#ce5a3a] hover:text-[#321010]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="absolute pointer-events-none left-0 top-0 h-full w-8 z-30 bg-gradient-to-r from-[#13110a] via-[#18130e00] to-transparent" />
      <div className="absolute pointer-events-none right-0 top-0 h-full w-8 z-30 bg-gradient-to-l from-[#13110a] via-[#18130e00] to-transparent" />
    </div>
  );

  const renderStatusTab = () => (
    <div className="overflow-x-auto max-h-[90vh] border border-[#eaca5f80] rounded-2xl bg-gradient-to-tr from-[#2b2313cf] via-[#23201aee] to-[#10161aee] shadow-xl shadow-[#d4af3722] backdrop-blur relative">
      <table className="min-w-[1100px] w-full text-xs border-separate border-spacing-0">
        <thead className="sticky top-0 z-40">
          <tr className="bg-gradient-to-r from-[#231e09] to-[#2e2612] text-[#f2eab6]">
            <th className="px-4 py-3 text-left rounded-tl-2xl bg-inherit">Name</th>
            <th className="px-4 py-3 text-left">Mobile</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Nomination Status (User View)</th>
            <th className="px-4 py-3 text-left">Payment Status</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left rounded-tr-2xl">Remark</th>
          </tr>
        </thead>
        <tbody>
          {nominations.map((n, idx) => {
            const userLabel =
              n.status === "in_progress"
                ? "Shortlisted"
                : STATUS_OPTIONS.find((s) => s.value === n.status)?.label ||
                "Nomination Received";
            return (
              <tr
                key={n._id}
                className={`border-t border-[#eaca5f22] h-[60px] ${idx % 2 === 0
                  ? "bg-gradient-to-r from-[#18130a]/60 to-[#352a1eae]"
                  : "bg-gradient-to-r from-[#242108be] to-[#352a1eda]"
                  }`}
              >
                <td className="px-4 py-3">
                  <div className="font-semibold text-lg text-[#eed99b]">{n.nomineeName}</div>
                </td>
                <td className="px-4 py-3 text-[11px]">
                  {n.contactMobile || n.orgHeadMobile || "—"}
                </td>
                <td className="px-4 py-3 text-[11px]">
                  {n.user?.email || n.contactEmail || "—"}
                </td>
                <td className="px-4 py-3 text-[11px]">{userLabel}</td>
                <td className="px-4 py-3 text-[11px]">
                  {PAYMENT_STATUS_OPTIONS.find(
                    (s) => s.value === (n.paymentStatus || "not_paid")
                  )?.label || "Not Paid"}
                </td>
                <td className="px-4 py-3 text-[11px]">
                  {n.amount || "—"}
                </td>
                <td className="px-4 py-3 text-[11px]">
                  {n.adminRemark || "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="absolute pointer-events-none left-0 top-0 h-full w-8 z-30 bg-gradient-to-r from-[#13110a] via-[#18130e00] to-transparent" />
      <div className="absolute pointer-events-none right-0 top-0 h-full w-8 z-30 bg-gradient-to-l from-[#13110a] via-[#18130e00] to-transparent" />
    </div>
  );

  const renderUsersTab = () => {
    const byUser = new Map();
    nominations.forEach((n) => {
      if (!n.user?.email) return;
      const key = n.user.email;
      const existing = byUser.get(key) || {
        email: n.user.email,
        count: 0,
        latestStatus: n.status,
        latestAt: n.createdAt,
      };
      existing.count += 1;
      if (!existing.latestAt || new Date(n.createdAt) > new Date(existing.latestAt)) {
        existing.latestAt = n.createdAt;
        existing.latestStatus = n.status;
      }
      byUser.set(key, existing);
    });
    const rows = Array.from(byUser.values());

    return (
      <div className="overflow-x-auto max-h-[90vh] border border-[#eaca5f80] rounded-2xl bg-gradient-to-tr from-[#23201aee] via-[#2b2313cf] to-[#10161aee] shadow-xl shadow-[#d4af3722] backdrop-blur relative">
        <table className="min-w-[800px] w-full text-xs border-separate border-spacing-0">
          <thead className="sticky top-0 z-40">
            <tr className="bg-gradient-to-r from-[#231e09] to-[#2e2612] text-[#f2eab6]">
              <th className="px-4 py-3 text-left rounded-tl-2xl bg-inherit">Email</th>
              <th className="px-4 py-3 text-left">Total Nominations</th>
              <th className="px-4 py-3 text-left">Latest Status</th>
              <th className="px-4 py-3 text-left rounded-tr-2xl">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.email}
                className={`border-t border-[#eaca5f22] h-[52px] ${idx % 2 === 0
                  ? "bg-gradient-to-r from-[#202012]/60 to-[#392b1eae]"
                  : "bg-gradient-to-r from-[#23201abe] to-[#463a1eda]"
                  }`}
              >
                <td className="px-4 py-3 font-semibold text-[#fee5af]">{row.email}</td>
                <td className="px-4 py-3">{row.count}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.latestStatus} />
                </td>
                <td className="px-4 py-3 text-[11px]">
                  {row.latestAt ? new Date(row.latestAt).toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="absolute pointer-events-none left-0 top-0 h-full w-8 z-30 bg-gradient-to-r from-[#13110a] via-[#18130e00] to-transparent" />
        <div className="absolute pointer-events-none right-0 top-0 h-full w-8 z-30 bg-gradient-to-l from-[#13110a] via-[#18130e00] to-transparent" />
      </div>
    );
  };

  const renderAdminsTab = () => (
    <div className="border border-[#eaca5f80] rounded-2xl bg-gradient-to-tr from-[#23201aee] to-[#18130e] p-8 text-md text-[#e9e5ca] shadow-xl shadow-[#d4af3722] backdrop-blur-[3px]">
      <h2 className="text-2xl font-semibold mb-3 text-[#ffe9a1] flex items-center gap-2">
        <ShieldCheck className="inline text-[#ffe36d]" size={22} /> Admin Section
      </h2>
      <p className="mb-2 text-[#e9e3be]">
        Access administrative controls and oversee the nomination lifecycle.
      </p>
      <ul className="list-disc list-inside space-y-1 text-[13px] text-[#c4b889]">
        <li>
          <span className="font-semibold text-[#e1c36a]">Nominations</span>: View and filter all incoming submissions.
        </li>
        <li>
          <span className="font-semibold text-[#e1c36a]">Status</span>: Track payment and evaluation progress.
        </li>
      </ul>
    </div>
  );

  /* ================== UI ================== */
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#18130d] via-[#241b0a] to-[#11161c] text-white flex flex-col">
      {/* Top golden bar - optional, keeping as accent */}
      <div
        className="h-2 shadow-lg z-30 relative"
        style={{
          background: goldGrad,
          boxShadow: "0 3px 24px 6px #bb970f44, 0 1px 0 0 #d3b94f55",
        }}
      />

      <div className="flex flex-1">
        {/* Sidebar - Fixed to the left side */}
        <aside className="w-72 shrink-0 bg-[#16120b] border-r border-[#edd14830] shadow-2xl z-20 sticky top-0 h-screen overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#fbe376]" size={28} />
              <span className="font-bold text-xl tracking-wider gradient-text bg-gradient-to-r from-[#d2c44c] to-[#eddb92] bg-clip-text text-transparent">
                Admin Panel
              </span>
            </div>

            <div className="text-[13px] text-[#e8e2c7] space-y-2 bg-[#262002]/40 p-4 rounded-xl border border-[#edd14820]">
              <div className="flex justify-between">
                <span>Total Nominations</span>
                <span className="text-[#dbbe4f] font-bold">
                  {paymentSummary.total}
                </span>
              </div>
              <div className="h-px bg-[#edd14830] my-1" />
              <div className="flex justify-between opacity-80">
                <span>Completed</span>
                <span>{paymentSummary.paid}</span>
              </div>
              <div className="flex justify-between opacity-80">
                <span>Pending</span>
                <span>{paymentSummary.not_paid}</span>
              </div>
            </div>

            <nav className="space-y-2 font-medium">
              {[
                { id: "nominations", label: "Nominations", icon: "🏆" },
                { id: "status", label: "Status & Payment", icon: "💸" },
                { id: "users", label: "Registered Users", icon: "👤" },
                { id: "editions", label: "Previous Editions", icon: "🏛️" },
                { id: "admins", label: "Admin Settings", icon: "🛡️" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-semibold tracking-wide flex items-center gap-3 ${activeTab === tab.id
                    ? "bg-gradient-to-r from-[#ffe9a1] to-[#d4af37] text-black shadow-lg translate-x-1"
                    : "text-[#fbe6b8] hover:bg-[#ffffff0d] hover:text-[#ffe090]"
                    }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content - Scrollable */}
        <div className="flex-1 min-w-0 bg-[#0f0c08]/50 p-6 md:p-10">
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#ffe78c] via-[#c09a21] to-[#fae36e] bg-clip-text text-transparent drop-shadow-sm tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-[#eddfae] text-lg font-medium opacity-80">
              Manage nominations and user pipeline
            </p>
          </header>

          <div className="flex flex-wrap items-center gap-4 mb-8 bg-[#1a160a]/40 p-4 rounded-2xl border border-[#ffffff0d] backdrop-blur-md">
            <span className="text-[#c7ba7e] font-semibold text-sm uppercase tracking-wider">
              Filter Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#272316] border border-[#edd14850] rounded-lg px-4 py-2 text-[#fbe376] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition shadow-inner"
            >
              {STATUS_FILTER_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <span className="text-[#c7ba7e] font-semibold text-sm uppercase tracking-wider ml-2">
              Type:
            </span>
            <select
              value={participationTypeFilter}
              onChange={(e) => setParticipationTypeFilter(e.target.value)}
              className="bg-[#272316] border border-[#edd14850] rounded-lg px-4 py-2 text-[#fbe376] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition shadow-inner"
            >
              {PARTICIPATION_TYPE_FILTER_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <span className="text-[#c7ba7e] font-semibold text-sm uppercase tracking-wider ml-2">
              Location:
            </span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-[#272316] border border-[#edd14850] rounded-lg px-4 py-2 text-[#fbe376] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition shadow-inner"
            >
              {LOCATION_FILTER_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <span className="text-xs text-[#ffd975] font-mono bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
              {filteredNominations.length} records
            </span>
            {error && (
              <span className="ml-auto text-sm text-red-400 bg-red-900/20 px-3 py-1 rounded border border-red-500/30">
                Error: {error}
              </span>
            )}
            {loading && (
              <span className="ml-auto text-sm flex items-center gap-2 text-yellow-300">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                Loading data...
              </span>
            )}
          </div>

          <div className="w-full">
            {activeTab === "nominations" && renderNominationsTable()}
            {activeTab === "status" && renderStatusTab()}
            {activeTab === "users" && renderUsersTab()}
            {activeTab === "editions" && <AdminPreviousEditions />}
            {activeTab === "admins" && renderAdminsTab()}
          </div>
        </div>
      </div>

      {/* ================== EDIT MODAL ================== */}
      {editingNomination && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] backdrop-blur-sm p-4">
          <div className="bg-gradient-to-tr from-[#2e2b18] via-[#18130e] to-[#18130e] border-2 border-[#eaca5faa] shadow-2xl shadow-[#d4af3780] p-8 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setEditingNomination(null)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <span className="text-2xl">&times;</span>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#ffe6a3]">Edit Nomination Details</h2>
            <div className="grid md:grid-cols-2 gap-6 pb-6">
              {/* Category 1: Core Identity */}
              <div className="md:col-span-2 border-b border-[#d4af3730] pb-2 text-[#d4af37] text-xs font-black uppercase tracking-widest">
                Core Identity
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Nominee Name</label>
                <input
                  className={inputClass}
                  value={editForm.nomineeName || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, nomineeName: e.target.value })
                  }
                  placeholder="Enter nominee name"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Organization</label>
                <input
                  className={inputClass}
                  value={editForm.organization || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, organization: e.target.value })
                  }
                  placeholder="Organization name"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Designation</label>
                <input
                  className={inputClass}
                  value={editForm.designation || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, designation: e.target.value })
                  }
                  placeholder="Designation"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Participation Type</label>
                <input
                  className={inputClass}
                  value={editForm.participationType || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      participationType: e.target.value,
                    })
                  }
                  placeholder="Type (e.g. nominated as award)"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Portfolio / Profile Link</label>
                <input
                  className={inputClass}
                  value={editForm.portfolio || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, portfolio: e.target.value })
                  }
                  placeholder="Link to portfolio/work"
                />
              </div>

              {/* Category 2: Nomination Specs */}
              <div className="md:col-span-2 border-b border-[#d4af3730] pb-2 text-[#d4af37] text-xs font-black uppercase tracking-widest mt-4">
                Nomination Specs
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Category (User Selected)</label>
                <input
                  className={inputClass}
                  value={editForm.category || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  placeholder="Category"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Sub-Category</label>
                <input
                  className={inputClass}
                  value={editForm.subCategory || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, subCategory: e.target.value })
                  }
                  placeholder="Sub-Category"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Other Sub-Category</label>
                <input
                  className={inputClass}
                  value={editForm.otherSubCategory || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, otherSubCategory: e.target.value })
                  }
                  placeholder="Other Sub-Category (if any)"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Assigned Category (Admin)</label>
                <input
                  className={inputClass}
                  value={editForm.assignedCategory || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      assignedCategory: e.target.value,
                    })
                  }
                  placeholder="Final category decided by admin"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Preferred Location (Comma separated)</label>
                <input
                  className={inputClass}
                  value={Array.isArray(editForm.preferredLocation) ? editForm.preferredLocation.join(", ") : editForm.preferredLocation || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      preferredLocation: e.target.value.split(",").map(i => i.trim()),
                    })
                  }
                  placeholder="New Delhi, Dubai, etc."
                />
              </div>

              {/* Category 3: Contact Details */}
              <div className="md:col-span-2 border-b border-[#d4af3730] pb-2 text-[#d4af37] text-xs font-black uppercase tracking-widest mt-4">
                Contact Connectivity
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Primary Mobile</label>
                <input
                  className={inputClass}
                  value={editForm.mobile || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, mobile: e.target.value })
                  }
                  placeholder="Mobile"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Primary Email</label>
                <input
                  className={inputClass}
                  value={editForm.email || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Org Head Name</label>
                <input
                  className={inputClass}
                  value={editForm.orgHeadName || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, orgHeadName: e.target.value })
                  }
                  placeholder="Org Head Name"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Org Head Designation</label>
                <input
                  className={inputClass}
                  value={editForm.orgHeadDesignation || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, orgHeadDesignation: e.target.value })
                  }
                  placeholder="Org Head Designation"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Org Head Mobile</label>
                <input
                  className={inputClass}
                  value={editForm.orgHeadMobile || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, orgHeadMobile: e.target.value })
                  }
                  placeholder="Org Head Mobile"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Org Head Email</label>
                <input
                  className={inputClass}
                  value={editForm.orgHeadEmail || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, orgHeadEmail: e.target.value })
                  }
                  placeholder="Org Head Email"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Contact Person Name</label>
                <input
                  className={inputClass}
                  value={editForm.contactName || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, contactName: e.target.value })
                  }
                  placeholder="Contact Name"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Contact Mobile</label>
                <input
                  className={inputClass}
                  value={editForm.contactMobile || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, contactMobile: e.target.value })
                  }
                  placeholder="Contact Mobile"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Contact Designation</label>
                <input
                  className={inputClass}
                  value={editForm.contactDesignation || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, contactDesignation: e.target.value })
                  }
                  placeholder="Contact Designation"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Contact Email</label>
                <input
                  className={inputClass}
                  value={editForm.contactEmail || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, contactEmail: e.target.value })
                  }
                  placeholder="Contact Email"
                />
              </div>

              {/* Category 4: Business Insights */}
              <div className="md:col-span-2 border-b border-[#d4af3730] pb-2 text-[#d4af37] text-xs font-black uppercase tracking-widest mt-4">
                Business Insights
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Website</label>
                <input
                  className={inputClass}
                  value={editForm.website || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, website: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Facebook</label>
                <input
                  className={inputClass}
                  value={editForm.facebook || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, facebook: e.target.value })
                  }
                  placeholder="Facebook Link"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Instagram</label>
                <input
                  className={inputClass}
                  value={editForm.instagram || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, instagram: e.target.value })
                  }
                  placeholder="Instagram Link"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">YouTube</label>
                <input
                  className={inputClass}
                  value={editForm.youtube || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, youtube: e.target.value })
                  }
                  placeholder="YouTube Link"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Turnover</label>
                <input
                  className={inputClass}
                  value={editForm.turnover || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, turnover: e.target.value })
                  }
                  placeholder="e.g. 50 Cr"
                />
              </div>

              {/* Category 5: Address */}
              <div className="md:col-span-2 border-b border-[#d4af3730] pb-2 text-[#d4af37] text-xs font-black uppercase tracking-widest mt-4">
                Address Details
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Street</label>
                <input
                  className={inputClass}
                  value={editForm.street || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, street: e.target.value })
                  }
                  placeholder="Street"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">City</label>
                <input
                  className={inputClass}
                  value={editForm.city || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, city: e.target.value })
                  }
                  placeholder="City"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">State</label>
                <input
                  className={inputClass}
                  value={editForm.state || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, state: e.target.value })
                  }
                  placeholder="State"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Zip Code</label>
                <input
                  className={inputClass}
                  value={editForm.zip || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, zip: e.target.value })
                  }
                  placeholder="Zip Code"
                />
              </div>

              {/* Category 6: Administrative */}
              <div className="md:col-span-2 border-b border-[#d4af3730] pb-2 text-[#d4af37] text-xs font-black uppercase tracking-widest mt-4">
                Administrative Information
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Amount Agreed</label>
                <input
                  className={inputClass}
                  placeholder="e.g. ₹25,000"
                  value={editForm.amount || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, amount: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">PDF Profile URL</label>
                <input
                  className={inputClass}
                  value={editForm.pdfUrl || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, pdfUrl: e.target.value })
                  }
                  placeholder="https://bucket.s3.../file.pdf"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-[#f6e589] font-semibold">
                  Public Remarks (User also sees)
                </label>
                <textarea
                  className={`${inputClass} min-h-[70px]`}
                  value={editForm.remarks || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, remarks: e.target.value })
                  }
                  placeholder="Remark for user (visible)"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-[#f6e589] font-semibold">
                  Admin Remark (Internal only)
                </label>
                <textarea
                  className={`${inputClass} min-h-[70px]`}
                  value={editForm.adminRemark || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, adminRemark: e.target.value })
                  }
                  placeholder="Only for admin view"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setEditingNomination(null)}
                className="px-5 py-2.5 text-md font-medium text-[#f4e3a6] bg-gradient-to-r from-[#19140b]/80 to-[#0e0b08]/70 border border-[#bba44b80] rounded-lg shadow hover:bg-[#191400]/80 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-gradient-to-r from-[#ecd26c] to-[#d49d28] text-[#232012] border border-[#d4af37a8] px-8 py-2.5 rounded-lg text-md font-extrabold shadow-lg tracking-wider hover:from-[#fdf0bc] hover:to-[#fae36e] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================== DELETE MODAL ================== */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-[#13110aee] backdrop-blur-[1.5px] flex items-center justify-center z-[9999]">
          <div className="bg-gradient-to-br from-[#292112f6] to-[#18130e] border border-[#edcc68be] shadow-2xl rounded-2xl max-w-md w-full min-h-[220px] flex flex-col justify-between py-10 px-8 gap-2">
            <h2 className="text-2xl font-semibold mb-2 text-[#fae36f] flex gap-2 items-center">
              <Trash2 className="text-red-400" size={26} /> Delete Nomination?
            </h2>
            <p className="text-base text-[#ffe8a7] mb-4">
              This action cannot be undone.<br />
              Are you sure you want to delete this nomination?
            </p>
            <div className="flex justify-end gap-5 mt-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="bg-gradient-to-r from-[#793717] to-[#161614] border border-[#dbbe4fad] text-[#ffe9a1] px-5 py-2 rounded-lg font-semibold hover:bg-[#edca8aec] shadow"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-gradient-to-tr from-[#f43e2c] to-[#7a1b0a] text-[#ffebd2] px-8 py-2 rounded-lg font-extrabold shadow-md hover:from-[#d42121] hover:to-[#772014]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================== VIEW DETAILS MODAL ================== */}
      {viewingNomination && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] backdrop-blur-md p-4">
          <div className="bg-gradient-to-br from-[#1e1a10] to-[#0f0c08] border-2 border-[#d4af3780] shadow-[0_0_50px_-12px_rgba(212,175,55,0.4)] rounded-[2rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative">
            {/* Close Button */}
            <button
              onClick={() => setViewingNomination(null)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <span className="text-2xl">&times;</span>
            </button>

            <div className="p-8 md:p-12">
              <div className="mb-10 text-center md:text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4af37] mb-2 block">Comprehensive Application Data</span>
                <h2 className="text-4xl font-extrabold text-white mb-2">{viewingNomination.nomineeName}</h2>
                <p className="text-[#d4af37] text-lg font-medium">{viewingNomination.organization}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Personal & Basic Details */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#d4af37] border-b border-[#d4af3730] pb-2">Core Identity</h3>
                  <DetailItem label="Full Name" value={viewingNomination.nomineeName} />
                  <DetailItem label="Organization" value={viewingNomination.organization} />
                  <DetailItem label="Designation" value={viewingNomination.designation || viewingNomination.orgHeadDesignation} />
                  <DetailItem label="Type" value={viewingNomination.participationType} />
                  <DetailItem label="Submission Date" value={new Date(viewingNomination.createdAt).toLocaleString()} />
                </div>

                {/* Award Details (if applicable) */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#d4af37] border-b border-[#d4af3730] pb-2">Nomination Specs</h3>
                  <DetailItem label="Category" value={viewingNomination.category} />
                  <DetailItem label="Sub-Category" value={viewingNomination.subCategory || viewingNomination.otherSubCategory} />
                  <DetailItem label="Assigned Cat" value={viewingNomination.assignedCategory} className="text-yellow-400 font-bold" />
                  <DetailItem label="Location Preference" value={viewingNomination.preferredLocation?.join(", ") || viewingNomination.preferredLocation} />
                  <DetailItem label="Status" value={viewingNomination.status} />
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#d4af37] border-b border-[#d4af3730] pb-2">Connectivity</h3>
                  <DetailItem label="Primary Email" value={viewingNomination.email || viewingNomination.contactEmail} />
                  <DetailItem label="Primary Mobile" value={viewingNomination.mobile || viewingNomination.contactMobile} />
                  <DetailItem label="Org Head Email" value={viewingNomination.orgHeadEmail} />
                  <DetailItem label="Org Head Mobile" value={viewingNomination.orgHeadMobile} />
                  <DetailItem label="Contact Name" value={viewingNomination.contactName} />
                </div>

                {/* Business Details */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#d4af37] border-b border-[#d4af3730] pb-2">Business Insights</h3>
                  <DetailItem label="Website" value={viewingNomination.website} isLink />
                  <DetailItem label="Facebook" value={viewingNomination.facebook} isLink />
                  <DetailItem label="Instagram" value={viewingNomination.instagram} isLink />
                  <DetailItem label="YouTube" value={viewingNomination.youtube} isLink />
                  <DetailItem label="Turnover" value={viewingNomination.turnover} />
                </div>

                {/* Location/Address */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#d4af37] border-b border-[#d4af3730] pb-2">Address / Base</h3>
                  <DetailItem label="Street" value={viewingNomination.street} />
                  <DetailItem label="City" value={viewingNomination.city} />
                  <DetailItem label="State" value={viewingNomination.state} />
                  <DetailItem label="Zip Code" value={viewingNomination.zip} />
                </div>

                {/* Financial/Admin Detail */}
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#d4af37] border-b border-[#d4af3730] pb-2">Administrative</h3>
                  <DetailItem label="Amount Agreed" value={viewingNomination.amount} />
                  <DetailItem label="Payment status" value={viewingNomination.paymentStatus} />
                  <DetailItem label="PDF Profile" value={viewingNomination.pdfUrl ? "Uploaded" : "No PDF"} isLink={!!viewingNomination.pdfUrl} linkUrl={viewingNomination.pdfUrl} />
                </div>
              </div>

              {/* Remarks Section */}
              <div className="mt-12 space-y-8">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">User Remarks</h4>
                  <p className="text-gray-300 italic">{viewingNomination.remarks || "No remarks provided"}</p>
                </div>
                {viewingNomination.adminRemark && (
                  <div className="bg-[#d4af3710] border border-[#d4af3730] p-6 rounded-2xl">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-2">Internal Admin Note</h4>
                    <p className="text-[#d4af37]">{viewingNomination.adminRemark}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

/* ------------------ Detail Item Helper ------------------ */
function DetailItem({ label, value, isLink, linkUrl, className = "" }) {
  if (!value && !isLink) return null;
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</div>
      <div className="text-white font-medium text-sm break-words">
        {isLink ? (
          <a
            href={linkUrl || (value?.startsWith('http') ? value : `https://${value}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5ea3ff] hover:underline"
          >
            {value || "View Link"}
          </a>
        ) : (
          value || "—"
        )}
      </div>
    </div>
  );
}
