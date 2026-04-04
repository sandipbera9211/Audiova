import { useState, useEffect } from "react";
import AlbumCard from "../components/AlbumCard";
import WaveBar from "../components/WaveBar";
import { usePlayer } from "../context/PlayerContext";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { MdAlbum } from "react-icons/md";
import { toast } from "react-toastify";
const SORTS = [["recent", "Recent"], ["az", "A-Z"], ["tracks", "Most Tracks"]];

export default function Album() {
  const [albums,     setAlbums]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [selected,   setSelected]   = useState(null);
  const [sort,       setSort]       = useState("recent");
  const [albumSongs, setAlbumSongs] = useState([]);

  const { nowPlaying, paused, play, togglePause } = usePlayer();


  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/album`, {
          credentials: "include",
        });
        const data = await res.json();
        const list = data.albumall ?? [];
        setAlbums(list);
        if (list.length > 0) setSelected(list[0]._id);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);


  useEffect(() => {
    if (!selected) return;

    const fetchAlbumSongs = async () => {
      try {
        const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/music/album/${selected}`);
        const data = await res.json(); 
        if (data.success) {
          setAlbumSongs(data.album.songs);
        }
      } catch (error) {
        toast.error(error.message ?? "Failed to load album songs");
      }
    };

    fetchAlbumSongs();
  }, [selected]);

  const sorted = [...albums].sort((a, b) => {
    if (sort === "az")     return a.name.localeCompare(b.name);
    if (sort === "tracks") return (b.songs?.length ?? 0) - (a.songs?.length ?? 0);
    return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
  });

  const activeAlbum = albums.find((a) => a._id === selected);
  const totalSongs  = albums.reduce((acc, a) => acc + (a.songs?.length ?? 0), 0);

  // ── Use albumSongs (fetched separately) instead of activeAlbum.songs ──
  const isAlbumPlaying =
    activeAlbum &&
    nowPlaying &&
    albumSongs.some((s) => s._id === nowPlaying._id);

  const handlePlayPause = () => {
    if (!activeAlbum) return;
    if (isAlbumPlaying) {
      togglePause();
    } else {
      const firstTrack = albumSongs[0]; // ← use albumSongs, not activeAlbum.songs
      if (firstTrack) play(firstTrack);
    }
  };

  return (
    <div
      className="min-h-screen font-body pt-20"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">

        {/* ── Page header ── */}
        <header className="mb-10 anim-up">
          <p
            className="font-mono text-[11px] tracking-[0.22em] mb-2 uppercase"
            style={{ color: "var(--accent)" }}
          >
            — Your Library
          </p>
          <h1 className="accent-shimmer text-[clamp(32px,5vw,52px)] font-black tracking-tight mb-1.5 leading-none">
            Albums
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {albums.length} albums · {totalSongs} songs total
          </p>
        </header>

        {/* ── Controls: sort ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 anim-up d1">
          <div className="glass-card flex items-center gap-1 p-1 rounded-xl">
            {SORTS.map(([v, label]) => (
              <button
                key={v}
                onClick={() => setSort(v)}
                className="text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 nav-lnk"
                style={sort === v ? { background: "var(--bg-hover)", color: "var(--accent)" } : {}}
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
            {albums.length} albums
          </span>
        </div>

        {/* ── Selected album banner ── */}
        {activeAlbum && (
          <div className="glass flex items-center gap-4 px-5 py-3.5 rounded-2xl mb-8 anim-up d2">
            <img
              src={activeAlbum.image}
              alt=""
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              style={{ border: "1px solid var(--border-accent)" }}
            />
            <div className="flex-1 min-w-0">
              <p
                className="font-mono text-[10px] tracking-[0.2em] uppercase mb-0.5"
                style={{ color: "var(--accent-glow)" }}
              >
                {isAlbumPlaying && !paused ? "Now Playing" : "Paused"}
              </p>
              <p
                className="text-sm font-bold truncate leading-tight"
                style={{ color: "var(--accent)" }}
              >
                {activeAlbum.name}
                <span className="font-normal" style={{ color: "var(--text-muted)" }}>
                  {" "}— {activeAlbum.artist?.name}
                </span>
              </p>
            </div>

            <WaveBar color="var(--accent)" active={isAlbumPlaying && !paused} bars={5} />

            <button
              onClick={handlePlayPause}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: paused || !isAlbumPlaying ? "var(--accent)" : "var(--accent-dim)",
                border: "1px solid var(--border-accent)",
                boxShadow: paused || !isAlbumPlaying ? "0 0 16px var(--accent-glow)" : "none",
                cursor: "pointer",
              }}
              aria-label={paused || !isAlbumPlaying ? "Play" : "Pause"}
            >
              {paused || !isAlbumPlaying
                ? <BsFillPlayFill size={16} style={{ color: "var(--bg)" }} />
                : <BsPauseFill   size={16} style={{ color: "var(--accent)" }} />
              }
            </button>
          </div>
        )}

        {/* ── Loading state ── */}
        {loading && (
          <div className="flex items-center justify-center py-24" style={{ color: "var(--text-muted)" }}>
            <p className="text-sm font-medium">Loading albums...</p>
          </div>
        )}

        {/* ── Album card grid ── */}
        {!loading && sorted.length > 0 && (
          <div
            className="grid gap-4 sm:gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
            {sorted.map((album, i) => (
              <div
                key={album._id}
                className="anim-up"
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <AlbumCard
                  album={album}
                  isActive={selected === album._id}
                  onClick={() => setSelected(album._id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && sorted.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24"
            style={{ color: "var(--text-muted)" }}
          >
            <MdAlbum size={40} className="mb-4" />
            <p className="text-sm font-medium">No albums found</p>
          </div>
        )}

      </div>
    </div>
  );
}