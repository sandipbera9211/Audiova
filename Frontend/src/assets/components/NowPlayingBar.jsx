import WaveBar from "./WaveBar";
import { usePlayer } from "../context/PlayerContext";


export default function NowPlayingBar() {
  const { nowPlaying, paused, togglePause } = usePlayer();

  if (!nowPlaying) return null;

  return (
    <div
      className="glass fixed bottom-0 left-0 right-0 z-[1000] flex items-center gap-4 px-5 py-3"
      style={{
        boxShadow: "0 -1px 0 var(--border-accent), 0 -16px 40px rgba(0,0,0,0.65)",
      }}
    >
      {/* Album art */}
      <img
        src={nowPlaying.image}
        alt={nowPlaying.name}
        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
        style={{ border: "1px solid var(--border-accent)" }}
      />

    {/* Song info */}
<div className="flex-1 min-w-0">
  <p className="text-sm font-bold truncate leading-tight" style={{ color: "var(--accent)" }}>
    {nowPlaying.name}
  </p>
  <p className="text-[11px] truncate mt-0.5" style={{ color: "var(--text-sub)" }}>
    {nowPlaying.artist?.name}          {/* ← optional chain added */}
    {nowPlaying.album && (
      <span style={{ color: "var(--text-muted)" }}> · {nowPlaying.album.name}</span>
    )}
  </p>
</div>
      {/* Animated wave bars */}
      <WaveBar color="var(--accent)" active={!paused} bars={5} />

      {/* Play / Pause toggle */}
      <button
        onClick={togglePause}
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: paused ? "var(--accent)" : "var(--accent-dim)",
          border:     "1px solid var(--border-accent)",
          boxShadow:  paused ? "none" : "0 0 12px var(--accent-glow)",
          cursor:     "pointer",
        }}
        aria-label={paused ? "Play" : "Pause"}
      >
        {paused
          ? <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--bg)"><path d="M5 3l14 9-14 9V3z"/></svg>
          : <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--accent)"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
        }
      </button>

      {/* Status */}
      <span
        className="font-mono text-[9px] tracking-[0.2em] uppercase hidden sm:block flex-shrink-0"
        style={{ color: "var(--text-muted)" }}
      >
        {paused ? "Paused" : "Now Playing"}
      </span>
    </div>
  );
}