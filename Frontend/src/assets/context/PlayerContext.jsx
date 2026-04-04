import { createContext, useContext, useState, useRef, useEffect } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [paused,     setPaused]     = useState(false);
  const [progress,   setProgress]   = useState(0);   // 0-100
  const [duration,   setDuration]   = useState(0);   // seconds
  const [volume,     setVolume]     = useState(1);   // 0-1

  // ✅ Single Audio instance that persists across renders
  const audioRef = useRef(new Audio());

  // ── Sync audio events → state ──────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () =>
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);

    const onLoadedMetadata = () => setDuration(audio.duration);

    const onEnded = () => {
      setNowPlaying(null);
      setPaused(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate",     onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended",          onEnded);

    return () => {
      audio.removeEventListener("timeupdate",     onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended",          onEnded);
    };
  }, []);

  // ── Actions ────────────────────────────────────────────────
  const play = (track) => {
    const audio = audioRef.current;

    
    const url = track.url;

    if (!url) {
      console.error("No audio URL found on track:", track);
      return;
    }

    // If same track, just resume
    if (nowPlaying?._id === track._id) {
      audio.play();
      setPaused(false);
      return;
    }

    // New track — swap source and play
    audio.src = url;
    audio.volume = volume;
    audio.play().catch(err => console.error("Playback failed:", err));

    setNowPlaying(track);
    setPaused(false);
    setProgress(0);
  };

  const togglePause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setPaused(false);
    } else {
      audio.pause();
      setPaused(true);
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.src = "";
    setNowPlaying(null);
    setPaused(false);
    setProgress(0);
  };

  const seek = (percent) => {
    const audio = audioRef.current;
    if (audio.duration) {
      audio.currentTime = (percent / 100) * audio.duration;
      setProgress(percent);
    }
  };

  const changeVolume = (val) => {
    audioRef.current.volume = val;
    setVolume(val);
  };

  return (
    <PlayerContext.Provider value={{
      nowPlaying,
      paused,
      progress,
      duration,
      volume,
      play,
      togglePause,
      stop,
      seek,
      changeVolume,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}