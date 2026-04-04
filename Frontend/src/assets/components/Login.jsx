import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiMusicNotesFill } from "react-icons/pi";
import { MdEmail, MdLock, MdArrowForward, MdErrorOutline } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function Login() {
  const navigate = useNavigate();
  const [form,    setForm]    = useState({ email: "", password: "" });
  const [show,    setShow]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/authentication/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Log-In Failed");
        return;
      }
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("userUpdated")); // ✅ notify Navbar same-tab
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10"
      style={{ background: "var(--bg)" }}>

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(232,255,71,0.06) 0%, transparent 70%)",
      }} />

      <div className="w-full max-w-md anim-up">

        {/* Brand mark */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
            style={{ background: "var(--accent-dim)", border: "1px solid var(--border-accent)", boxShadow: "0 0 32px var(--accent-glow)" }}>
            <PiMusicNotesFill size={26} style={{ color: "var(--accent)" }} />
          </div>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-2"
            style={{ color: "var(--accent)" }}>— Welcome back</p>
          <h1 className="accent-shimmer text-4xl font-black tracking-tight leading-none">
            Sign In
          </h1>
          <p className="text-sm mt-3" style={{ color: "var(--text-sub)" }}>
            Continue your musical journey
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8"
          style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px var(--border-accent)" }}>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-6 text-sm"
              style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", color: "#ff6b6b" }}>
              <MdErrorOutline size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--text-sub)" }}>
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <MdEmail size={15} style={{ color: "var(--text-muted)" }} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    caretColor: "var(--accent)",
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--border-accent)"}
                  onBlur={e  => e.target.style.borderColor = "var(--border)"}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--text-sub)" }}>
                  Password
                </label>
                <button type="button" className="font-mono text-[10px] tracking-[0.1em] transition-colors duration-200"
                  style={{ color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.color = "var(--accent)"}
                  onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <MdLock size={15} style={{ color: "var(--text-muted)" }} />
                </div>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "var(--bg-hover)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    caretColor: "var(--accent)",
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--border-accent)"}
                  onBlur={e  => e.target.style.borderColor = "var(--border)"}
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}
                >
                  {show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full rounded-xl py-3.5 text-sm font-bold tracking-[0.06em] mt-1 flex items-center justify-center gap-2"
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters size={16} style={{ animation: "spin 0.8s linear infinite" }} />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <MdArrowForward size={15} />
                </>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>OR</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm" style={{ color: "var(--text-sub)" }}>
            Don't have an account?{" "}
            <Link to="/signup"
              className="font-bold transition-colors duration-200"
              style={{ color: "var(--accent)", textDecoration: "none" }}>
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}