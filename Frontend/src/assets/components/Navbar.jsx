import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [sfocus, setSfocus] = useState(false);
  const [sval, setSval] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);

  const NAV_LINKS = [
    { name: "Music",    path: "/music" },
    { name: "Album",    path: "/albums" },
    { name: "Artists",  path: "/artists" },
    { name: "PlayList", path: "/playlist" },
    ...(user?.role === "artist" ? [{ name: "DashBoard", path: "/dashboard" }] : []),
  ];

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("userUpdated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("userUpdated", sync);
    };
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const glass = scrolled || open;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 font-body transition-all duration-500 ${
          glass
            ? "border-b border-[rgba(232,255,71,0.1)] shadow-[0_2px_40px_rgba(0,0,0,0.5)]"
            : "border-b border-transparent"
        }`}
        style={{
          background: glass ? "rgba(6,6,8,0.94)" : "transparent",
          backdropFilter: glass ? "blur(28px) saturate(1.8)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center h-16 lg:h-[76px] gap-4 lg:gap-8">

          {/* Logo */}
          <NavLink
            to="/"
            className="font-display flex-shrink-0 italic font-black tracking-tight select-none leading-none no-underline"
            style={{ fontSize: "clamp(22px,3vw,28px)", color: "#E8FF47" }}
          >
            Audio<span className="not-italic text-white">va</span>
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                className={({ isActive }) =>
                  `text-sm px-4 py-2 rounded-xl font-medium transition-all duration-200 no-underline ${
                    isActive
                      ? "text-[#E8FF47] bg-[rgba(232,255,71,0.08)]"
                      : "text-white/45 bg-transparent hover:text-white/80 hover:bg-white/[0.05]"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {l.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop search */}
          <div
            className={`hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl w-56 flex-shrink-0 transition-all duration-300 ${
              sfocus
                ? "bg-white/[0.07] shadow-[0_0_0_3px_rgba(232,255,71,0.08)]"
                : "bg-white/[0.04] hover:bg-white/[0.06]"
            }`}
            style={{
              border: `1px solid ${
                sfocus ? "rgba(232,255,71,0.35)" : "rgba(255,255,255,0.08)"
              }`,
            }}
          >
            <input
              ref={searchRef}
              value={sval}
              onChange={(e) => setSval(e.target.value)}
              placeholder="Search tracks, artists…"
              onFocus={() => setSfocus(true)}
              onBlur={() => setSfocus(false)}
              className="bg-transparent outline-none border-none w-full font-mono text-xs text-white/70 placeholder:text-white/20 caret-[#E8FF47]"
            />
          </div>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-3 ml-auto flex-shrink-0">
            {user ? (
              <>
                <span className="text-white/60 text-sm">
                  Hi, {user.userName || user.name || "User"}
                </span>

                {/* ✅ Avatar → go to profile */}
                <Link to="/profile">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.userName || user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover cursor-pointer transition-all duration-200 hover:scale-110"
                      style={{ border: "1.5px solid rgba(232,255,71,0.4)" }}
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-200 hover:scale-110"
                      style={{
                        background: "var(--accent-dim)",
                        border: "1.5px solid rgba(232,255,71,0.4)",
                        color: "var(--accent)",
                      }}
                    >
                      {(user.userName || user.name || "U")[0].toUpperCase()}
                    </div>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium px-4 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="btn-accent text-sm px-4 py-2 rounded-xl"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2.5 ml-auto">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="relative w-10 h-10 rounded-xl cursor-pointer flex flex-col items-center justify-center bg-white/[0.07] border border-white/[0.1]"
            >
              <RiMenu3Line size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 z-30 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          top: 64,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed left-0 right-0 z-40 flex flex-col gap-2 px-5 sm:px-8 pt-5 pb-8 transition-all duration-[380ms] ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
        style={{
          top: 64,
          background: "rgba(6,6,8,0.98)",
          backdropFilter: "blur(32px)",
          borderBottom: "1px solid rgba(232,255,71,0.08)",
        }}
      >
        <p className="font-mono text-[9px] tracking-[3px] text-white/20 uppercase">
          Navigate
        </p>

        {NAV_LINKS.map((l) => (
          <NavLink
            key={l.path}
            to={l.path}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between w-full px-5 py-[15px] rounded-2xl text-[15px] font-semibold text-white/60 bg-white/[0.03] border border-white/[0.07]"
          >
            {l.name}
          </NavLink>
        ))}

        <div className="h-px bg-white/[0.07] my-1" />

        {/* Mobile auth */}
        <div className="flex flex-col gap-2.5">
          {user ? (
            /* ✅ User card → go to profile */
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] no-underline"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.userName || user.name || "User"}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  style={{ border: "1.5px solid rgba(232,255,71,0.4)" }}
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: "var(--accent-dim)",
                    border: "1.5px solid rgba(232,255,71,0.4)",
                    color: "var(--accent)",
                  }}
                >
                  {(user.userName || user.name || "U")[0].toUpperCase()}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-white/70 text-sm font-medium">
                  {user.userName || user.name || "User"}
                </span>
                <span className="text-white/30 text-xs font-mono">View Profile →</span>
              </div>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="w-full text-center text-[15px] font-medium py-[15px] px-5 rounded-2xl border border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white transition-all duration-200"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="btn-accent w-full text-center text-[15px] py-[15px] px-5 rounded-2xl"
              >
                Get Started — Free
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}