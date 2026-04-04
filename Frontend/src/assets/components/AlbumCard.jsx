import { useState } from "react";


const fmt = (count) => `${count} ${count === 1 ? "song" : "songs"}`;

export default function AlbumCard({ album, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-[20px] cursor-pointer select-none"
      style={{
        background: "var(--bg-card)",
        aspectRatio: "3/4",
        minHeight: 300,
        border: isActive
          ? "1px solid var(--border-accent)"
          : hovered
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid var(--border)",
        boxShadow: isActive
          ? "0 20px 60px var(--accent-glow)"
          : hovered
          ? "0 20px 50px rgba(0,0,0,0.7)"
          : "0 4px 20px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-8px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "transform 0.38s cubic-bezier(0.22,1,0.36,1), box-shadow 0.38s ease, border-color 0.25s ease",
      }}
    >
      {/* Cover image */}
      <img
        src={album.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80"}
        alt={album.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: hovered
            ? "brightness(0.58) saturate(1.1)"
            : "brightness(0.35) saturate(0.85)",
          transition: "filter 0.4s ease",
        }}
      />

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

      {/* Song count badge — top left */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className="font-mono text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
          style={{
            background: "var(--accent-dim)",
            color: "var(--accent)",
            border: "1px solid var(--border-accent)",
          }}
        >
          {fmt(album.songs?.length ?? 0)}
        </span>
      </div>

      {/* Active indicator — top right */}
      {isActive && (
        <div
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: "var(--accent-dim)",
            border: "1px solid var(--border-accent)",
          }}
        >
          {/* Vinyl disc icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3"  stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="1"  fill="var(--accent)" />
          </svg>
        </div>
      )}

      {/* Hover open button */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{
          opacity: hovered && !isActive ? 1 : 0,
          transition: "opacity 0.28s ease",
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "var(--accent)",
            boxShadow: "0 0 36px var(--accent-glow)",
          }}
        >
          {/* "View" arrow icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="var(--bg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 pt-4">

        {/* Active accent bar */}
        <div className="h-[2px] rounded-full bg-white/10 overflow-hidden mb-3">
          {isActive && (
            <div
              className="h-full rounded-full"
              style={{ width: "60%", background: "linear-gradient(90deg, var(--accent), var(--teal))" }}
            />
          )}
        </div>

        {/* Album name */}
        <h3
          className="m-0 font-serif font-bold leading-snug tracking-tight"
          style={{
            fontSize: "clamp(15px, 2vw, 19px)",
            color: isActive ? "var(--accent)" : "var(--text)",
            transition: "color 0.25s",
          }}
        >
          {album.name}
        </h3>

        {/* Artist */}
        <p className="mt-1 mb-0 text-[12px] font-medium leading-none"
          style={{ color: "var(--text-sub)" }}>
          {album.artist?.name}
        </p>

        {/* Description (truncated, one line) */}
        {album.description && (
          <p
            className="mt-1.5 mb-0 text-[11px] leading-snug line-clamp-2"
            style={{ color: "var(--text-muted)" }}
          >
            {album.description}
          </p>
        )}

        {/* Footer row: song count */}
        <div className="mt-3 flex items-center justify-between">
          <span
            className="flex items-center gap-1.5 font-mono text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {fmt(album.songs?.length ?? 0)}
          </span>

          {/* "Open" label */}
          <span
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
          >
            {isActive ? "Selected" : "View"}
          </span>
        </div>
      </div>
    </article>
  );
}