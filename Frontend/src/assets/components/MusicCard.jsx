import { useState } from "react";
import WaveBar from "./WaveBar";  
import { usePlayer } from "../context/PlayerContext";



const GENRE_STYLES = {
  Pop:       "bg-pink-400/10 text-pink-300 border-pink-400/30",
  "Hip-Hop": "bg-yellow-300/10 text-yellow-300 border-yellow-300/25",
  Jazz:      "bg-blue-400/10 text-blue-400 border-blue-400/30",
  Rock:      "bg-red-400/10 text-red-400 border-red-400/30",
  Classical: "bg-teal-400/10 text-teal-400 border-teal-400/30",
  Other:     "bg-purple-400/10 text-purple-400 border-purple-400/30",
};

const fmt      = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const fmtPlays = (n) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${(n / 1000).toFixed(0)}K`;

function GenrePill({ genre }) {
  const cls = GENRE_STYLES[genre] || GENRE_STYLES.Other;
  return (
    <span className={`text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full border font-mono uppercase ${cls}`}>
      {genre}
    </span>
  );
}

export default function MusicCard({
  track,
  onAddToQueue,
  onRemoveFromQueue,
  inQueue,
  playlists = [],
  onAddToPlaylist,
  onCreatePlaylist,
}) {
  const { nowPlaying, play } = usePlayer();
  const isPlaying = nowPlaying?._id === track._id;

  const [hovered,   setHovered]   = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article
        onClick={() => play(track)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden rounded-[20px] cursor-pointer select-none"
        style={{
          background:  "var(--bg-card)",
          aspectRatio: "3/4",
          minHeight:   300,
          border: isPlaying
            ? "1px solid var(--border-accent)"
            : hovered
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid var(--border)",
          boxShadow: isPlaying
            ? "0 20px 60px var(--accent-glow)"
            : hovered
            ? "0 20px 50px rgba(0,0,0,0.7)"
            : "0 4px 20px rgba(0,0,0,0.4)",
          transform:  hovered ? "translateY(-8px) scale(1.012)" : "translateY(0) scale(1)",
          transition: "transform 0.38s cubic-bezier(0.22,1,0.36,1), box-shadow 0.38s ease, border-color 0.25s ease",
        }}
      >
        {/* Cover image */}
        <img
          src={track.image} alt={track.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: hovered ? "brightness(0.58) saturate(1.1)" : "brightness(0.35) saturate(0.85)",
            transition: "filter 0.4s ease",
          }}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        {/* Genre pill */}
        <div className="absolute top-4 left-4 z-10">
          <GenrePill genre={track.genre} />
        </div>

        {/* Action buttons — top right */}
        <div
          className="absolute top-3 right-3 z-10 flex flex-col gap-1.5"
          style={{ opacity: hovered || isPlaying ? 1 : 0, transition: "opacity 0.22s" }}
          onClick={e => e.stopPropagation()}
        >
          {/* + queue */}
          <button
            onClick={() => onAddToQueue?.(track)}
            title="Add to queue"
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200"
            style={{
              background:     inQueue ? "var(--accent-dim)" : "rgba(6,6,8,0.65)",
              border:         inQueue ? "1px solid var(--border-accent)" : "1px solid var(--border)",
              color:          inQueue ? "var(--accent)" : "var(--text-sub)",
              backdropFilter: "blur(12px)",
              boxShadow:      inQueue ? "0 0 10px var(--accent-glow)" : "none",
              cursor:         "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>

          {/* − queue */}
          <button
            onClick={() => onRemoveFromQueue?.(track)}
            title="Remove from queue"
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200"
            style={{
              background: "rgba(6,6,8,0.65)", border: "1px solid var(--border)",
              color: "var(--text-sub)", backdropFilter: "blur(12px)", cursor: "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14"/>
            </svg>
          </button>

          {/* playlist */}
          <button
            onClick={() => setShowModal(true)}
            title="Add to playlist"
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200"
            style={{
              background: "rgba(6,6,8,0.65)", border: "1px solid var(--border)",
              color: "var(--text-sub)", backdropFilter: "blur(12px)", cursor: "pointer",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
              <path d="M17 8V5"/><path d="M15 6.5h4"/>
            </svg>
          </button>
        </div>

      
        {isPlaying && (
          <div
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "var(--accent-dim)", border: "1px solid var(--border-accent)" }}
          >
            <WaveBar color="var(--accent)" active bars={5} />
          </div>
        )}

        {/* Hover play */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ opacity: hovered && !isPlaying ? 1 : 0, transition: "opacity 0.28s ease" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center btn-accent"
            style={{ boxShadow: "0 0 36px var(--accent-glow)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--bg)">
              <path d="M5 3l14 9-14 9V3z"/>
            </svg>
          </div>
        </div>

        {/* Bottom metadata */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 pt-4">
          <div className="h-[2px] rounded-full bg-white/10 overflow-hidden mb-3">
            {isPlaying && (
              <div className="h-full rounded-full" style={{ width: "38%", background: "linear-gradient(90deg, var(--accent), var(--teal))" }} />
            )}
          </div>
          <h3
            className="m-0 font-serif font-bold leading-snug tracking-tight"
            style={{ fontSize: "clamp(15px,2vw,19px)", color: isPlaying ? "var(--accent)" : "var(--text)", transition: "color 0.25s" }}
          >
           {track?.name || "Unknown Track"}
          </h3>
          <p className="mt-1 mb-0 text-[12px] font-medium leading-none" style={{ color: "var(--text-sub)" }}>
            {track.artist.name}
            {track.album && <span style={{ color: "var(--text-muted)" }}> · {track.album.name}</span>}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
              </svg>
              {fmtPlays(track.plays)}
            </span>
            <span className="font-mono text-[12px]" style={{ color: "var(--text-muted)" }}>{fmt(track.duration)}</span>
          </div>
          {inQueue && (
            <span className="mt-2 inline-block font-mono text-[8px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full"
              style={{ color: "var(--accent)", background: "var(--accent-dim)", border: "1px solid var(--border-accent)" }}>
              In Queue
            </span>
          )}
        </div>
      </article>

      {/* Playlist modal */}
      {showModal && (
        <PlaylistModal
          playlists={playlists} track={track}
          onClose={() => setShowModal(false)}
          onAddToPlaylist={(id, t) => { onAddToPlaylist?.(id, t); setShowModal(false); }}
          onCreatePlaylist={onCreatePlaylist}
        />
      )}
    </>
  );
}

/* ── inline PlaylistModal (keeps MusicCard self-contained) ── */
function PlaylistModal({ playlists, track, onClose, onAddToPlaylist, onCreatePlaylist }) {
  const [newName, setNewName]   = useState("");
  const [creating, setCreating] = useState(false);

  return (
    <div onClick={onClose} className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(6,6,8,0.82)", backdropFilter: "blur(10px)" }}>
      <div className="glass rounded-[22px] p-7" onClick={e => e.stopPropagation()}
        style={{ width: "min(390px,92vw)", boxShadow: "0 40px 80px rgba(0,0,0,0.85), 0 0 60px var(--accent-glow)" }}>

        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase mb-1.5" style={{ color: "var(--accent)" }}>— Add to Playlist</p>
            <h3 className="text-base font-black" style={{ color: "var(--text)" }}>{track.name}</h3>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-sub)" }}>{track?.artist?.name || "Unknown Artist"}</p>
          </div>
          <button onClick={onClose} className="glass-card flex items-center justify-center w-8 h-8 rounded-[10px] ml-3 flex-shrink-0"
            style={{ cursor: "pointer", color: "var(--text-sub)", fontSize: 19 }}>×</button>
        </div>

        <div className="flex flex-col gap-2 mb-3.5" style={{ maxHeight: 210, overflowY: "auto" }}>
          {playlists.length === 0 && (
            <p className="text-xs text-center py-4" style={{ color: "var(--text-muted)" }}>No playlists yet — create one below!</p>
          )}
          {playlists.map(pl => {
            const already = pl.tracks.some(t => t._id === track._id);
            return (
              <button key={pl.id} onClick={() => !already && onAddToPlaylist(pl.id, track)}
                className="glass-card flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-all duration-200"
                style={{ cursor: already ? "default" : "pointer", border: already ? "1px solid var(--border-accent)" : undefined, background: already ? "var(--accent-dim)" : undefined }}>
                <div className="flex items-center justify-center w-9 h-9 rounded-[9px] flex-shrink-0"
                  style={{ background: "var(--accent-dim)", border: "1px solid var(--border-accent)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold" style={{ color: "var(--text)" }}>{pl.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{pl.tracks.length} track{pl.tracks.length !== 1 ? "s" : ""}</p>
                </div>
                {already
                  ? <span className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-full"
                      style={{ color: "var(--accent)", background: "var(--accent-dim)", border: "1px solid var(--border-accent)" }}>ADDED</span>
                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                }
              </button>
            );
          })}
        </div>

        {!creating ? (
          <button className="btn-accent w-full rounded-xl py-3 text-[13px] tracking-[0.04em]" onClick={() => setCreating(true)}>
            + Create New Playlist
          </button>
        ) : (
          <div className="flex gap-2">
            <input autoFocus value={newName} onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && newName.trim()) { onCreatePlaylist(newName.trim(), track); setNewName(""); setCreating(false); } if (e.key === "Escape") { setCreating(false); setNewName(""); } }}
              placeholder="Playlist name…" className="flex-1 rounded-xl px-3.5 py-2.5 text-[13px] outline-none"
              style={{ background: "var(--accent-dim)", border: "1px solid var(--border-accent)", color: "var(--text)" }} />
            <button className="btn-accent rounded-xl px-4 text-[13px]"
              onClick={() => { if (newName.trim()) { onCreatePlaylist(newName.trim(), track); setNewName(""); setCreating(false); } }}>
              Create
            </button>
          </div>
        )}
      </div>
    </div>
  );
}