import { useState, useEffect } from "react";
import MusicCard from "../components/MusicCard";
import { usePlayer } from "../context/PlayerContext";
import { PiMusicNotesFill } from "react-icons/pi";
import { TbMusic } from "react-icons/tb";
import { toast } from "react-toastify";

const GENRES = ["All", "Pop", "Hip-Hop", "Jazz", "Rock", "Classical"];

const fmtTotal = (s) =>
  s >= 3600 ? `${(s / 3600).toFixed(1)}h` : `${Math.round(s / 60)}min`;

export default function Music() {
  const [tracks,     setTracks]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [activeGenre, setActiveGenre] = useState("All");
  const [sort,        setSort]        = useState("recent");
  const [queue,       setQueue]       = useState([]);
  const [playlists,   setPlaylists]   = useState([]);

  const { play } = usePlayer(); 

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/music/all-music`);
        const data = await res.json();
        // API returns { allMusic: [...] } or just an array — handle both
        setTracks(Array.isArray(data) ? data : data.allMusic ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPlaylists = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/playlists`, {
          credentials: "include"
        });
        const data = await res.json();
        if (data.success) {
          // Normalize playlist objects to match frontend usage
          const normalized = data.allplaylist.map(pl => ({
            id: pl._id,
            name: pl.name,
            tracks: pl.songs || []
          }));
          setPlaylists(normalized);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchTracks();
    fetchPlaylists();
  }, []);

  // ✅ Derived from state, not from undefined TRACKS constant
  const totalDuration = tracks.reduce((a, t) => a + (t.duration ?? 0), 0);

  const filtered = tracks
    .filter(t => activeGenre === "All" || t.genre === activeGenre)
    .sort((a, b) =>
      sort === "popular"
        ? (b.plays ?? 0) - (a.plays ?? 0)
        : b._id.localeCompare(a._id)
    );

  const addToQueue      = (t) => setQueue(q => q.find(x => x._id === t._id) ? q : [...q, t]);
  const removeFromQueue = (t) => setQueue(q => q.filter(x => x._id !== t._id));

  const createPlaylist = async (name, track = null) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/playlists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name }),
          credentials: "include"
        });
        const data = await res.json();
        if (data.success) {
          const newPl = {
            id: data.alb._id,
            name: data.alb.name,
            tracks: []
          };
          setPlaylists(ps => [...ps, newPl]);
          
          if (track) {
            await addToPlaylist(data.alb._id, track);
          } else {
            toast.success("Playlist created!");
          }
        } else {
          toast.error(data.message || "Failed to create playlist");
        }
      } catch (error) {
        console.error("Error creating playlist:", error);
        toast.error("Error creating playlist");
      }
    };

  const addToPlaylist = async (plId, track) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/playlists/add-in-playlist/${plId}/song/${track._id}`, {
        method: "POST",
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setPlaylists(ps => ps.map(pl =>
          pl.id === plId ? { ...pl, tracks: [...pl.tracks, track] } : pl
        ));
        toast.success(`Added to ${data.playlist.name}`);
      } else {
        toast.error(data.message || "Failed to add song");
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      toast.error("Error adding song");
    }
  };

  return (
    <div className="min-h-screen font-body pt-20 pb-24" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <header className="mb-10 anim-up">
          <p className="font-mono text-[11px] tracking-[0.22em] mb-2 uppercase" style={{ color: "var(--accent)" }}>
            — Your Library
          </p>
          <h1 className="accent-shimmer text-[clamp(32px,5vw,52px)] font-black tracking-tight mb-1.5 leading-none">
            Music
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {/* ✅ use tracks.length from state */}
            {tracks.length} tracks · {fmtTotal(totalDuration)} total
            {queue.length > 0 && (
              <span style={{ color: "var(--accent)", marginLeft: 6 }}>
                · {queue.length} in queue
              </span>
            )}
          </p>
        </header>

        {/* ── Controls ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 anim-up d1">
          <div className="glass-card flex items-center gap-1 p-1 rounded-xl flex-wrap">
            {GENRES.map(g => (
              <button key={g} onClick={() => setActiveGenre(g)}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${activeGenre === g ? "btn-accent" : "nav-lnk"}`}>
                {g}
              </button>
            ))}
          </div>
          <div className="glass-card flex items-center gap-1 p-1 rounded-xl">
            {[["recent", "Recent"], ["popular", "Popular"]].map(([v, l]) => (
              <button key={v} onClick={() => setSort(v)}
                className="text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 nav-lnk"
                style={sort === v ? { background: "var(--bg-hover)", color: "var(--accent)" } : {}}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* ── Playlists strip ── */}
        {playlists.length > 0 && (
          <div className="anim-up d2 mb-7">
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase mb-3" style={{ color: "var(--text-muted)" }}>
              Your Playlists
            </p>
            <div className="flex flex-wrap gap-2">
              {playlists.map(pl => (
                <div key={pl.id} className="glass-card flex items-center gap-2 px-3 py-2 rounded-xl">
                  {/* ✅ react-icon replaces inline SVG */}
                  <PiMusicNotesFill size={12} style={{ color: "var(--accent)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{pl.name}</span>
                  <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>{pl.tracks.length}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Loading state ── */}
        {loading && (
          <div className="flex items-center justify-center py-24" style={{ color: "var(--text-muted)" }}>
            <p className="text-sm font-medium">Loading tracks...</p>
          </div>
        )}

        {/* ── Card grid ── */}
        {!loading && filtered.length > 0 && (
          <div className="grid gap-4 sm:gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
            {filtered.map((track, i) => (
              <div key={track._id} className="anim-up" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
                <MusicCard
                  track={track}
                  onPlay={play}
                  onAddToQueue={addToQueue}
                  onRemoveFromQueue={removeFromQueue}
                  inQueue={queue.some(t => t._id === track._id)}
                  playlists={playlists}
                  onAddToPlaylist={addToPlaylist}
                  onCreatePlaylist={createPlaylist}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24" style={{ color: "var(--text-muted)" }}>
            {/* ✅ react-icon replaces inline SVG */}
            <TbMusic size={40} strokeWidth={1.5} className="mb-4" />
            <p className="text-sm font-medium">No tracks in this genre</p>
          </div>
        )}

      </div>
    </div>
  );
}