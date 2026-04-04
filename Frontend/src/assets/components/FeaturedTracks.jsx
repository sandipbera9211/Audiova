import { useState } from "react";
import WaveBar from "./WaveBar";

const TRACKS = [
  { id:1, title:"Neon Drift",        artist:"Synthwave Collective", genre:"SYNTHWAVE",  dur:"3:57", plays:"2.4M", color:"#E8FF47" },
  { id:2, title:"Midnight Protocol", artist:"Dark Matter",          genre:"ELECTRONIC", dur:"3:18", plays:"1.8M", color:"#4ecdc4" },
  { id:3, title:"Glass Horizon",     artist:"Aurora Fields",        genre:"AMBIENT",    dur:"5:12", plays:"980K", color:"#c77dff" },
  { id:4, title:"Pulse Engine",      artist:"Frequency Six",        genre:"TECHNO",     dur:"4:24", plays:"1.2M", color:"#ff6b6b" },
];

export default function FeaturedTracks() {
  const [playing, setPlaying] = useState(null);
  const [liked,   setLiked]   = useState({});

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24">

      <div className="flex items-end justify-between gap-4 mb-8 md:mb-12 flex-wrap">
        <div>
          <p className="font-mono text-[10px] tracking-[3px] mb-2.5" style={{ color:"rgba(232,255,71,0.75)" }}>◈ FEATURED TRACKS</p>
          <h2 className="font-display font-black italic text-white leading-tight tracking-tight" style={{ fontSize:"clamp(30px,5vw,46px)" }}>Hot Right Now</h2>
        </div>
        <button className="btn-ghost font-mono text-[11px] tracking-widest px-5 py-3 rounded-xl flex-shrink-0">VIEW ALL →</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {TRACKS.map((t, idx) => {
          const ip = playing === t.id;
          const il = liked[t.id];
          return (
            <div key={t.id}
              className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{ background:"rgba(255,255,255,0.028)", border:`1px solid ${ip?`${t.color}38`:"rgba(255,255,255,0.07)"}`, backdropFilter:"blur(20px)", boxShadow:ip?`0 0 40px ${t.color}18,0 16px 40px rgba(0,0,0,0.4)`:"0 8px 32px rgba(0,0,0,0.25)", transition:"transform .25s,box-shadow .25s,border-color .4s" }}
              onMouseEnter={e => { if(!ip) e.currentTarget.style.boxShadow=`0 0 28px ${t.color}14,0 20px 48px rgba(0,0,0,0.5)`; }}
              onMouseLeave={e => { if(!ip) e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.25)"; }}>

              {/* Glow blob */}
              <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-500"
                style={{ background:`radial-gradient(circle,${t.color}18,transparent 70%)`, opacity:ip?1:0.45 }}/>

              <div className="relative z-10 p-5 md:p-7">
                <div className="flex items-center gap-4 md:gap-5 mb-5">
                  {/* Vinyl */}
                  <div className="flex-shrink-0 rounded-full flex items-center justify-center"
                    style={{ width:"clamp(56px,8vw,70px)", height:"clamp(56px,8vw,70px)", background:`conic-gradient(from 45deg,${t.color}66,#1a1a1a 35%,${t.color}44 65%,#1a1a1a 80%,${t.color}66)`, animation:ip?"spin 5s linear infinite":"none", boxShadow:ip?`0 0 28px ${t.color}55`:"none", transition:"box-shadow .4s" }}>
                    <div className="rounded-full" style={{ width:"clamp(16px,2.5vw,22px)", height:"clamp(16px,2.5vw,22px)", background:"#060608", boxShadow:"0 0 0 2px rgba(255,255,255,0.06)" }}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[9px] tracking-[2px] inline-block px-2 py-1 rounded-md mb-2"
                      style={{ color:t.color, background:`${t.color}14`, border:`1px solid ${t.color}28` }}>{t.genre}</span>
                    <h3 className="font-display font-black italic text-white mb-0.5 truncate leading-tight" style={{ fontSize:"clamp(17px,2.5vw,21px)" }}>{t.title}</h3>
                    <p className="font-body text-sm text-white/44 truncate">{t.artist}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <button onClick={e => { e.stopPropagation(); setPlaying(p => p===t.id?null:t.id); }}
                      className="rounded-full flex items-center justify-center font-bold border-none cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
                      style={{ width:"clamp(38px,5vw,44px)", height:"clamp(38px,5vw,44px)", background:t.color, color:"#060608", fontSize:"clamp(13px,1.8vw,16px)", boxShadow:`0 4px 20px ${t.color}44` }}>
                      {ip?"⏸":"▶"}
                    </button>
                    <WaveBar color={t.color} active={ip}/>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <button onClick={e => { e.stopPropagation(); setLiked(p => ({...p,[t.id]:!p[t.id]})); }}
                      className="border-none bg-transparent cursor-pointer transition-all duration-200 hover:scale-125 flex-shrink-0"
                      style={{ fontSize:"clamp(15px,2.2vw,18px)", color:il?t.color:"rgba(255,255,255,0.2)", filter:il?`drop-shadow(0 0 6px ${t.color}88)`:"none" }}>
                      {il?"♥":"♡"}
                    </button>
                    <div className="text-right hidden sm:block">
                      <p className="font-mono text-[10px] text-white/28 whitespace-nowrap">{t.plays} plays</p>
                      <p className="font-mono text-xs text-white/48 font-medium mt-0.5">{t.dur}</p>
                    </div>
                  </div>
                </div>

                {/* Expand progress when playing */}
                <div className="overflow-hidden transition-all duration-500" style={{ maxHeight:ip?28:0, opacity:ip?1:0, marginTop:ip?14:0 }}>
                  <div className="h-[3px] rounded-full overflow-hidden mb-1.5" style={{ background:"rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full" style={{ width:"38%", background:t.color, boxShadow:`0 0 8px ${t.color}` }}/>
                  </div>
                  <div className="flex justify-between font-mono text-[9px] text-white/28"><span>1:29</span><span>{t.dur}</span></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}