import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArtistCard from "../components/Artistcard";

const SORTS = [
  ["recent", "Recent"],
  ["az",     "A-Z"],
  ["oldest", "Oldest"],
];

function SkeletonCard() {
  return (
    <div
      className="rounded-[20px] overflow-hidden animate-pulse"
      style={{
        aspectRatio: "3/4",
        minHeight: 280,
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="w-full h-full" style={{ background: "var(--bg-hover)" }} />
    </div>
  );
}

export default function Artists() {
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);
  const [sort,    setSort]    = useState("recent");
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`${import.meta.env.VITE_API_URL}/api/artist/`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        setArtists(data.allArtist);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const sorted = [...artists].sort((a, b) => {
    if (sort === "az")     return a.name.localeCompare(b.name);
    if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
    return b.createdAt.localeCompare(a.createdAt);
  });

  return (
    <div
      className="min-h-screen font-body pt-20"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">

        {/* ── Header ── */}
        <header className="mb-10 anim-up">
          <p
            className="font-mono text-[11px] tracking-[0.22em] mb-2 uppercase"
            style={{ color: "var(--accent)" }}
          >
            — Your Library
          </p>
          <h1 className="accent-shimmer text-[clamp(32px,5vw,52px)] font-black tracking-tight mb-1.5 leading-none">
            Artists
          </h1>
          <p className="text-sm" style={{ color: "var(--text-sub)" }}>
            {loading ? "Loading…" : `${artists.length} artists`}
          </p>
        </header>

        {/* ── Sort + count ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 anim-up d1">
          <div className="glass-card flex items-center gap-1 p-1 rounded-xl">
            {SORTS.map(([v, label]) => (
              <button
                key={v}
                onClick={() => setSort(v)}
                className="text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 nav-lnk"
                style={sort === v ? { background: "var(--bg-hover)", color: "var(--text)" } : {}}
              >
                {label}
              </button>
            ))}
          </div>
          <span
            className="font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
          >
            {artists.length} artists
          </span>
        </div>

        {/* ── Skeleton ── */}
        {loading && (
          <div
            className="grid gap-4 sm:gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Error ── */}
        {error && !loading && (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            style={{ color: "var(--text-muted)" }}
          >
            <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,100,100,0.8)" }}>
              Failed to load artists
            </p>
            <p className="text-xs mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 rounded-xl text-xs font-semibold"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        )}

        {/* ── Grid ── */}
        {!loading && !error && sorted.length > 0 && (
          <div
            className="grid gap-4 sm:gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
            {sorted.map((artist, i) => (
              <div
                key={artist._id}
                className="anim-up"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <ArtistCard
                  artist={artist}
                  isActive={false}
                  onClick={() => navigate(`/artist/${artist._id}`)}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && !error && sorted.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24"
            style={{ color: "var(--text-muted)" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" className="mb-4">
              <circle cx="12" cy="7" r="4"/>
              <path d="M4 21c0-4 3.582-7 8-7s8 3 8 7" strokeLinecap="round"/>
            </svg>
            <p className="text-sm font-medium">No artists found</p>
          </div>
        )}

      </div>
    </div>
  );
}