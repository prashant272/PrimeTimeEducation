import { useEffect, useState } from "react";
import {
  fetchAdminNominations,
  updateNominationStatus,
  updateNomination,
  deleteNomination,
} from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { ShieldCheck, Edit2, Trash2, X } from "lucide-react";

/* ------------------ Constants ------------------ */
const goldGrad =
  "linear-gradient(90deg,#dbc267 0%,#d2ad36 40%,#fee19a 70%,#bc9830 100%)";

const STATUS_OPTIONS = [
  { value: "nominated", label: "Nominated" },
  { value: "evaluation", label: "Under Evaluation" },
  { value: "selected", label: "Selected" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  ...STATUS_OPTIONS,
];

/* ------------------ Status Badge ------------------ */
function StatusBadge({ status }) {
  const label =
    STATUS_OPTIONS.find((s) => s.value === status)?.label || "Nominated";

  const colorClasses = {
    nominated: "bg-[#232e45] text-blue-100 border-blue-400/60",
    evaluation: "bg-[#7b6543] text-yellow-200 border-yellow-400/60",
    selected: "bg-[#194f3c] text-emerald-200 border-emerald-400/60",
    rejected: "bg-[#512a23] text-red-200 border-red-400/60",
  }[status || "nominated"];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${colorClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

/* ================== MAIN COMPONENT ================== */
export default function AdminDashboard() {
  const { token } = useAuth();

  const [nominations, setNominations] = useState([]);
  const [filteredNominations, setFilteredNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const [editingNomination, setEditingNomination] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editForm, setEditForm] = useState({});

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
    if (statusFilter === "all") {
      setFilteredNominations(nominations);
    } else {
      setFilteredNominations(
        nominations.filter(
          (n) => (n.status || "nominated") === statusFilter
        )
      );
    }
  }, [nominations, statusFilter]);

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
    "w-full rounded-md bg-black/40 border border-white/20 px-3 py-2 text-sm text-white";

  /* ================== UI ================== */
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#18130d] via-[#392801] to-[#11161c] text-white">
      {/* Gold bar */}
      <div
        className="h-1.5"
        style={{ background: goldGrad, boxShadow: "0 4px 18px #bb970f60" }}
      />

      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-1">Nominations Dashboard</h1>
        <p className="text-sm text-gray-300 mb-4">
          Manage submissions and evaluation status
        </p>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/40 border border-white/20 px-3 py-2 rounded"
          >
            {STATUS_FILTER_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-gray-400">
            ({filteredNominations.length})
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[90vh] border border-white/10 rounded-xl bg-black/40">
          <table className="min-w-[1400px] w-full text-xs">
            <thead className="bg-white/5 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-3 text-left">Reg Type</th>
                <th className="px-3 py-3 text-left">Category</th>
                <th className="px-3 py-3 text-left">Nominee</th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-left">Org Head</th>
                <th className="px-3 py-3 text-left">Contact</th>
                <th className="px-3 py-3 text-left">Business</th>
                <th className="px-3 py-3 text-left">Address</th>
                <th className="px-3 py-3 text-left">Remarks</th>
                <th className="px-3 py-3 text-left">Submitted By</th>
                <th className="px-3 py-3 text-left">Date</th>

                {/* ✅ FIXED ACTIONS HEADER */}
                <th className="px-3 py-3 sticky right-0 bg-[#14100a] text-[#d4af37] z-20 w-[110px]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredNominations.map((n) => (
                <tr key={n._id} className="border-t border-white/10 h-[72px]">
                  <td className="px-3 py-4">{n.registrationType}</td>
                  <td className="px-3 py-4">{n.category}</td>
                  <td className="px-3 py-4">
                    <div className="font-semibold">{n.nomineeName}</div>
                    <div className="text-gray-400 text-[11px]">
                      {n.organization}
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <StatusBadge status={n.status} />
                    <select
                      value={n.status || "nominated"}
                      onChange={(e) =>
                        handleStatusChange(n._id, e.target.value)
                      }
                      className="mt-1 w-full bg-black/40 border border-white/20 text-[10px]"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="px-3 py-4 text-[11px]">
                    {n.orgHeadName}
                    <br />
                    {n.orgHeadEmail}
                  </td>

                  <td className="px-3 py-4 text-[11px]">
                    {n.contactName}
                    <br />
                    {n.contactEmail}
                  </td>

                  <td className="px-3 py-4 text-[11px]">
                    Website: {n.website || "-"}
                    <br />
                    Turnover: {n.turnover || "-"}
                  </td>

                  <td className="px-3 py-4 text-[11px]">
                    {n.city}, {n.state}
                  </td>

                  <td className="px-3 py-4 max-w-xs">
                    <div className="line-clamp-3">{n.remarks}</div>
                  </td>

                  <td className="px-3 py-4 text-[11px]">
                    {n.user?.email}
                  </td>

                  <td className="px-3 py-4 text-[11px]">
                    {new Date(n.createdAt).toLocaleString()}
                  </td>

                  {/* ✅ FIXED ACTIONS CELL */}
                  <td className="px-3 py-4 sticky right-0 bg-[#14100a] z-20">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(n)}
                        className="w-8 h-8 flex items-center justify-center border border-[#d4af37]/40 text-[#d4af37] rounded hover:bg-[#d4af37]/20"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(n._id)}
                        className="w-8 h-8 flex items-center justify-center border border-red-400/40 text-red-400 rounded hover:bg-red-500/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================== EDIT MODAL ================== */}
      {editingNomination && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18130e] p-6 rounded-xl max-w-xl w-full min-h-[320px] flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-4">Edit Nomination</h2>

            <input
              className={inputClass}
              value={editForm.nomineeName || ""}
              onChange={(e) =>
                setEditForm({ ...editForm, nomineeName: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setEditingNomination(null)}>Cancel</button>
              <button
                onClick={handleSaveEdit}
                className="bg-[#d4af37] text-black px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================== DELETE MODAL ================== */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18130e] p-6 rounded-xl max-w-md w-full min-h-[200px] flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-3">
              Delete Nomination?
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setDeleteConfirmId(null)}>Cancel</button>
              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
