import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMusic, FaInstagram, FaTwitter, FaYoutube, FaFacebook, FaPlay, FaPause } from "react-icons/fa";
import { toast } from "react-toastify";
import { usePlayer } from "../context/PlayerContext";

export default function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { nowPlaying, paused, play, togglePause } = usePlayer();

  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/artist/artistdetail/${id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        setArtist(data.artist);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingArtist(false));
  }, [id]);

  useEffect(() => {
    if (!artist) return;
    if (!artist?.user?._id) { setLoadingSongs(false); return; }
    fetch(`${import.meta.env.VITE_API_URL}/api/music/artistsong/${artist.user._id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);
        setSongs(data.allsong);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingSongs(false));
  }, [artist]);

  const handlePlay = (song) => {
    if (nowPlaying?._id === song._id) {
      togglePause();
    } else {
      play(song);
    }
  };

  const SOCIALS = [
    { key: "instagram", icon: <FaInstagram size={15} /> },
    { key: "twitter",   icon: <FaTwitter size={15} /> },
    { key: "youtube",   icon: <FaYoutube size={15} /> },
    { key: "facebook",  icon: <FaFacebook size={15} /> },
  ];

  if (error && !loadingArtist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--bg)", color: "var(--text-muted)" }}>
        <p style={{ color: "rgba(255,100,100,0.8)" }}>{error}</p>
        <button onClick={() => navigate("/artists")}
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", padding: "8px 20px", borderRadius: 12 }}>
          Back to Artists
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="max-w-4xl mx-auto px-5">

        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-8"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 12 }}>
          <FaArrowLeft size={12} /> All Artists
        </button>

        {/* Skeleton */}
        {loadingArtist && (
          <div className="w-full rounded-3xl mb-8 animate-pulse" style={{ height: 240, background: "var(--bg-card)" }} />
        )}

        {/* Hero */}
        {!loadingArtist && artist && (
          <div className="mb-10">
            <div className="relative w-full rounded-3xl overflow-hidden mb-5"
              style={{ height: "clamp(180px, 28vw, 280px)" }}>
              {artist.image && (
                <img src={artist.image} alt="" className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "blur(20px) brightness(0.3)", transform: "scale(1.1)" }} />
              )}
              <div className="absolute inset-0 flex items-end p-7">
                <div className="flex items-end gap-5">
                  {artist.image
                    ? <img src={artist.image} alt={artist.name} className="rounded-2xl object-cover flex-shrink-0"
                        style={{ width: 90, height: 90, border: "2px solid var(--border-accent)" }} />
                    : <div className="rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl"
                        style={{ width: 90, height: 90, background: "var(--bg-card)" }}>🎤</div>
                  }
                  <div>
                    <p className="text-xs mb-1" style={{ color: "var(--accent)" }}>Artist</p>
                    <h1 className="font-black leading-none" style={{ fontSize: "clamp(22px,4vw,46px)" }}>
                      {artist.name}
                    </h1>
                    {artist.user?.userName && (
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        @{artist.user.userName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio + Socials */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between px-1">
              {artist.bio && (
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-sub)", maxWidth: 480 }}>
                  {artist.bio}
                </p>
              )}
              {artist.socialLinks && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  {SOCIALS.map(({ key, icon }) =>
                    artist.socialLinks[key] ? (
                      <a key={key} href={artist.socialLinks[key]} target="_blank" rel="noopener noreferrer"
                        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)", borderRadius: 10, padding: "8px 10px", display: "flex", alignItems: "center" }}>
                        {icon}
                      </a>
                    ) : null
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Songs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black" style={{ fontSize: "clamp(18px,3vw,26px)" }}>Songs</h2>
            {!loadingSongs && (
              <span className="text-xs px-3 py-1.5 rounded-xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                {songs.length} {songs.length === 1 ? "song" : "songs"}
              </span>
            )}
          </div>

          {loadingSongs && (
            <div className="flex flex-col gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-14 rounded-2xl animate-pulse" style={{ background: "var(--bg-card)" }} />
              ))}
            </div>
          )}

          {!loadingSongs && songs.length > 0 && (
            <div className="flex flex-col gap-2">
              {songs.map((song, i) => {
                const isThis = nowPlaying?._id === song._id;
                const playing = isThis && !paused;
                return (
                  <div key={song._id} className="flex items-center gap-4 px-4 py-3 rounded-2xl"
                    style={{ background: isThis ? "var(--bg-hover)" : "var(--bg-card)", border: "1px solid var(--border)" }}>

                    <span className="text-xs w-5 text-right flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                      {i + 1}
                    </span>

                    <div className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: 38, height: 38 }}>
                      {song.coverImage
                        ? <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center"
                            style={{ background: "var(--border)", color: "var(--text-muted)" }}>
                            <FaMusic size={12} />
                          </div>
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate"
                        style={{ color: isThis ? "var(--accent)" : "var(--text)" }}>
                        {song.title}
                      </p>
                      {song.album && (
                        <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                          {song.album?.name ?? song.album}
                        </p>
                      )}
                    </div>

                    {song.duration && (
                      <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                        {song.duration}
                      </span>
                    )}

                    <button onClick={() => handlePlay(song)}
                      className="flex-shrink-0 flex items-center justify-center rounded-full"
                      style={{ width: 32, height: 32, background: playing ? "var(--accent-dim)" : "var(--accent)", border: "none", cursor: "pointer" }}>
                      {playing
                        ? <FaPause size={11} style={{ color: "var(--accent)" }} />
                        : <FaPlay  size={11} style={{ color: "var(--bg)" }} />
                      }
                    </button>

                  </div>
                );
              })}
            </div>
          )}

          {!loadingSongs && songs.length === 0 && (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>No songs yet.</p>
          )}
        </section>

      </div>
    </div>
  );
}