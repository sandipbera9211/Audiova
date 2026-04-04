import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName:    "",
    email:       "",
    password:    "",
    confirm:     "",
    phoneNumber: "",
    role:        "user",
  });
  const [show,    setShow]    = useState({ password: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  /* client-side validation matching schema rules */
  const validate = () => {
    if (!form.userName || !form.email || !form.password || !form.confirm)
      return "All required fields must be filled.";
    if (form.userName.length < 3 || form.userName.length > 30)
      return "Username must be between 3 and 30 characters.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      return "Please enter a valid email address.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
    if (form.password !== form.confirm)
      return "Passwords do not match.";
    if (form.phoneNumber && !/^\+?[0-9]{10,15}$/.test(form.phoneNumber))
      return "Please enter a valid phone number (10-15 digits).";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/authentication/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Register Failed");
        return;
      }
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("userUpdated")); // ✅ notify Navbar same-tab
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* reusable input style helpers */
  const inputBase = {
    background: "var(--bg-hover)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    caretColor: "var(--accent)",
  };
  const onFocus = (e) => (e.target.style.borderColor = "var(--border-accent)");
  const onBlur  = (e) => (e.target.style.borderColor = "var(--border)");

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
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </div>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-2"
            style={{ color: "var(--accent)" }}>— Join the community</p>
          <h1 className="accent-shimmer text-4xl font-black tracking-tight leading-none">
            Create Account
          </h1>
          <p className="text-sm mt-3" style={{ color: "var(--text-sub)" }}>
            Start your musical journey today
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8"
          style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px var(--border-accent)" }}>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-6 text-sm"
              style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", color: "#ff6b6b" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--text-sub)" }}>
                Username <span style={{ color: "var(--accent)" }}>*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <input
                  type="text"
                  name="userName"
                  value={form.userName}
                  onChange={handleChange}
                  placeholder="your_username"
                  autoComplete="username"
                  minLength={3} maxLength={30}
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
                  style={inputBase}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>
              <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>3–30 characters</p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--text-sub)" }}>
                Email <span style={{ color: "var(--accent)" }}>*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
                  style={inputBase}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>
            </div>

            {/* Phone (optional) */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--text-sub)" }}>
                Phone{" "}
                <span className="normal-case tracking-normal" style={{ color: "var(--text-muted)", fontFamily: "inherit", fontSize: 9 }}>
                  optional
                </span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1234567890"
                  autoComplete="tel"
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
                  style={inputBase}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>
              <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>10–15 digits, + prefix allowed</p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--text-sub)" }}>
                Password <span style={{ color: "var(--accent)" }}>*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <input
                  type={show.password ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  className="w-full rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all duration-200"
                  style={inputBase}
                  onFocus={onFocus} onBlur={onBlur}
                />
                <button type="button"
                  onClick={() => setShow(s => ({ ...s, password: !s.password }))}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}>
                  {show.password
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--text-sub)" }}>
                Confirm Password <span style={{ color: "var(--accent)" }}>*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <input
                  type={show.confirm ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  className="w-full rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all duration-200"
                  style={{
                    ...inputBase,
                    borderColor: form.confirm && form.confirm !== form.password ? "rgba(255,107,107,0.5)" : undefined,
                  }}
                  onFocus={onFocus} onBlur={onBlur}
                />
                <button type="button"
                  onClick={() => setShow(s => ({ ...s, confirm: !s.confirm }))}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 0 }}>
                  {show.confirm
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              {/* Match indicator */}
              {form.confirm && (
                <p className="text-[10px] font-mono flex items-center gap-1"
                  style={{ color: form.confirm === form.password ? "var(--teal)" : "#ff6b6b" }}>
                  {form.confirm === form.password ? (
                    <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> Passwords match</>
                  ) : (
                    <><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Passwords don't match</>
                  )}
                </p>
              )}
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
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

          {/* Login link */}
          <p className="text-center text-sm" style={{ color: "var(--text-sub)" }}>
            Already have an account?{" "}
            <Link to="/login"
              className="font-bold transition-colors duration-200"
              style={{ color: "var(--accent)", textDecoration: "none" }}>
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}