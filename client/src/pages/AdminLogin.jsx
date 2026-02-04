import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminLogin() {
  const { loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      await loginAsAdmin(email, password);

      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to login as admin");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#111827] text-white min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl bg-black/50 border border-blue-500/40 p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Admin Dashboard Login
        </h1>
        <p className="mb-6 text-xs text-center text-gray-300">
          Restricted access. Only authorised award administrators are allowed.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/60 px-3 py-2 text-sm text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Admin Email</label>
            <input
              type="email"
              className="w-full rounded-md bg-black/40 border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-md bg-black/40 border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-400 disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Login to Admin"}
          </button>
        </form>
      </div>
    </section>
  );
}







