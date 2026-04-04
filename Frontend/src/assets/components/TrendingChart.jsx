import { useState } from "react";

const TRENDING = [
  { rank:1, title:"Pulse Engine",  artist:"Frequency Six", color:"#E8FF47", tag:"+3"  },
  { rank:2, title:"Starfall",      artist:"Celestia",      color:"#c77dff", tag:"+1"  },
  { rank:3, title:"Iron Bloom",    artist:"Velvet Wreck",  color:"#ff6b6b", tag:"-1"  },
  { rank:4, title:"Echo Chamber",  artist:"Void Signal",   color:"#4ecdc4", tag:"+5"  },
  { rank:5, title:"Solar Flare",   artist:"Astral Monks",  color:"#ff9a3c", tag:"NEW" },
  { rank:6, title:"Deep Blue",     artist:"Ocean Drive",   color:"#60a5fa", tag:"+2"  },
];

const isUp = t => t === "NEW" || t.startsWith("+");

export default function TrendingChart() {
  const [liked, setLiked] = useState({});

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 h-full">
      <p className="font-mono text-[10px] tracking-[3px] mb-2" style={{ color:"rgba(232,255,71,0.75)" }}>◈ CHARTS</p>
      <h2 className="font-display font-black italic text-white tracking-tight mb-6" style={{ fontSize:"clamp(24px,3vw,30px)" }}>Trending Today</h2>

      <div className="space-y-1">
        {TRENDING.map(t => (
          <div key={t.rank} className="track-row flex items-center gap-3 md:gap-4 px-3 py-3 rounded-xl">
            {/* Rank */}
            <div className="font-display font-black italic w-6 text-center flex-shrink-0" style={{ fontSize:18, color:t.rank===1?"#E8FF47":"rgba(255,255,255,0.18)" }}>{t.rank}</div>

            {/* Thumb */}
            <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-base"
              style={{ background:`linear-gradient(135deg,${t.color}22,${t.color}44)` }}>🎵</div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold text-white truncate mb-0.5">{t.title}</p>
              <p className="font-mono text-[11px] text-white/38">{t.artist}</p>
            </div>

            {/* Badge */}
            <div className="font-mono text-[10px] font-semibold px-2 py-1 rounded-md flex-shrink-0"
              style={{ color:isUp(t.tag)?"#4ecdc4":"#ff6b6b", background:isUp(t.tag)?"rgba(78,205,196,0.12)":"rgba(255,107,107,0.12)" }}>
              {t.tag}
            </div>

            {/* Like */}
            <button onClick={() => setLiked(p => ({...p,[t.rank]:!p[t.rank]}))}
              className="text-base border-none bg-transparent cursor-pointer transition-all duration-200 hover:scale-125"
              style={{ color:liked[t.rank]?"#ff6b6b":"rgba(255,255,255,0.2)" }}>
              {liked[t.rank]?"♥":"♡"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}