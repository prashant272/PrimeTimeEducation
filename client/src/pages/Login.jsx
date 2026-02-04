import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
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
      await login(email, password);

      // Agar user kisi protected page (jaise /nominate) se aaya hai
      // to wapas wahi bhejo, warna homepage pe.
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#3b1515] text-white min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl bg-black/40 border border-[#d4af37]/30 p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          User Login
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/60 px-3 py-2 text-sm text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-md bg-black/40 border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-md bg-black/40 border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-full bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black hover:bg-[#c9a530] disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-200">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-[#d4af37] hover:text-[#f1d46b] font-semibold"
          >
            Create Account
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-gray-400">
          Are you an admin?{" "}
          <Link
            to="/admin/login"
            className="text-[#9fd4ff] hover:text-white underline"
          >
            Admin Login
          </Link>
        </p>
      </div>
    </section>
  );
}


