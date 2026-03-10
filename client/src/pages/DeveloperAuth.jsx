import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import AdminPreviousEditions from "./AdminPreviousEditions";
import { developerLogin } from "../services/api";

export default function DeveloperAuth() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [devToken, setDevToken] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await developerLogin({ password });

            setDevToken(data.token);
            localStorage.setItem("dev_token", data.token); // Optional
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (devToken) {
        return <AdminPreviousEditions customToken={devToken} />;
    }

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-[#d4af37]/5 to-transparent blur-[120px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-[#d4af37]/10 to-transparent blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-sm">
                <div className="bg-[#121212]/80 backdrop-blur-xl border border-[#d4af37]/20 p-8 rounded-2xl shadow-2xl shadow-[#d4af37]/5">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2a2410] to-[#1a1708] border border-[#d4af37]/30 flex items-center justify-center shadow-inner">
                            <ShieldAlert className="text-[#d4af37]" size={32} />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-[#ffe78c] via-[#d4af37] to-[#fae36e] bg-clip-text text-transparent">
                        Developer Bypass
                    </h1>
                    <p className="text-center text-[#888] text-sm mb-8">
                        Enter master credential to access Previous Editions management.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Developer Password"
                                className="w-full bg-[#0a0a0a] border border-[#d4af37]/20 rounded-xl px-4 py-3 text-[#d4af37] placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 transition text-center tracking-widest font-mono"
                            />
                        </div>
                        {error && (
                            <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#d4af37] to-[#aa8920] text-black font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition transform hover:-translate-y-0.5"
                        >
                            {loading ? "Authenticating..." : "UNLOCK"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
