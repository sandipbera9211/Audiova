import { useState, useEffect } from "react";

const TRACKS = [
  { title:"Neon Drift",        artist:"Synthwave Collective", color:"#E8FF47" },
  { title:"Midnight Protocol", artist:"Dark Matter",          color:"#4ecdc4" },
  { title:"Glass Horizon",     artist:"Aurora Fields",        color:"#c77dff" },
];

export default function Hero() {
  const [idx,     setIdx]     = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = TRACKS[idx];

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setIdx(p => (p+1) % TRACKS.length), 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* BG */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&q=85&auto=format&fit=crop"
          alt="" className="w-full h-full object-cover object-center" style={{ filter:"brightness(0.18) saturate(0.35)" }}/>
        <div className="absolute inset-0" style={{ background:"linear-gradient(150deg,rgba(6,6,8,0.95) 0%,rgba(6,6,8,0.5) 55%,rgba(6,6,8,0.97) 100%)" }}/>
        <div className="absolute inset-0 transition-all duration-1000" style={{ background:`radial-gradient(ellipse 70% 45% at 50% 0%,${t.color}10,transparent 65%)` }}/>
        <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64" style={{ background:"linear-gradient(to top,#060608,transparent)" }}/>
      </div>

      {/* Grain */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"180px" }}/>

      {/* Grid */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize:"72px 72px", maskImage:"radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 100%)" }}/>

      {/* Floating orb */}
      <div className="absolute top-1/2 right-[10%] w-[480px] h-[480px] rounded-full pointer-events-none z-[1] transition-all duration-1000 hidden lg:block"
        style={{ background:`radial-gradient(circle,${t.color}18 0%,transparent 70%)`, filter:"blur(60px)", animation:"floatOrb 8s ease-in-out infinite" }}/>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-center">

          {/* ── LEFT ── */}
          <div style={{ animation: mounted ? "fadeUp .7s ease both .1s" : "none", opacity: mounted?1:0 }}>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 md:mb-10"
              style={{ background:"rgba(232,255,71,0.09)", border:"1px solid rgba(232,255,71,0.22)" }}>
              <span className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                style={{ background:"#E8FF47", animation:"pdot 1.8s ease-in-out infinite", boxShadow:"0 0 6px #E8FF47" }}/>
              <span className="font-mono text-[10px] tracking-[2px]" style={{ color:"#E8FF47" }}>2.4M LISTENERS WORLDWIDE</span>
            </div>

            <h1 className="font-display font-black leading-[0.88] tracking-tight mb-6 md:mb-8 text-white"
              style={{ fontSize:"clamp(42px,7.5vw,78px)" }}>
              <span className="block">Sound That</span>
              <span className="block italic accent-shimmer">Moves You.</span>
            </h1>

            <p className="font-body text-white/44 leading-relaxed mb-10 md:mb-12 max-w-[430px]"
              style={{ fontSize:"clamp(15px,1.8vw,17px)" }}>
              Discover a universe of music for every mood. Stream millions of tracks, follow artists, and let the sound find you.
            </p>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-12 md:mb-16">
              <button className="btn-accent font-body font-bold text-sm rounded-2xl flex items-center gap-3"
                style={{ padding:"clamp(12px,2vw,16px) clamp(24px,4vw,36px)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#060608"><polygon points="5,3 19,12 5,21"/></svg>
                Start Listening Free
              </button>
              <button className="btn-ghost font-body text-sm rounded-2xl flex items-center gap-2"
                style={{ padding:"clamp(12px,2vw,16px) clamp(22px,3.5vw,32px)" }}>
                Explore Library
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>

            <div className="flex items-center gap-8 md:gap-12 flex-wrap">
              {[["50M+","TRACKS"],["180+","COUNTRIES"],["4K+","ARTISTS"]].map(([v,l]) => (
                <div key={l}>
                  <div className="font-display font-black italic leading-none" style={{ color:"#E8FF47", fontSize:"clamp(26px,3.5vw,34px)" }}>{v}</div>
                  <div className="font-mono text-[10px] text-white/28 mt-2 tracking-[2px]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Player card ── */}
          <div className="w-full max-w-[400px] mx-auto lg:mx-0"
            style={{ animation: mounted ? "fadeUp .7s ease both .28s" : "none", opacity: mounted?1:0 }}>
            <div className="rounded-[28px] p-6 md:p-8 transition-all duration-700"
              style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", backdropFilter:"blur(24px) saturate(1.4)", boxShadow:`0 0 80px ${t.color}20,0 30px 60px rgba(0,0,0,0.55)` }}>

              {/* Vinyl */}
              <div className="flex justify-center mb-6 md:mb-8">
                <div className="rounded-full flex items-center justify-center transition-all duration-700"
                  style={{ width:"clamp(140px,22vw,175px)", height:"clamp(140px,22vw,175px)", background:`conic-gradient(from 45deg,${t.color}66,#161616 30%,${t.color}44 62%,#161616 80%,${t.color}66)`, animation:playing?"spin 5.5s linear infinite":"none", boxShadow:playing?`0 0 55px ${t.color}44,inset 0 0 20px rgba(0,0,0,0.5)`:"inset 0 0 20px rgba(0,0,0,0.4)" }}>
                  <div className="rounded-full flex items-center justify-center text-2xl" style={{ width:"clamp(44px,7vw,56px)", height:"clamp(44px,7vw,56px)", background:"#060608", boxShadow:"0 0 0 3px rgba(255,255,255,0.06)" }}>🎵</div>
                </div>
              </div>

              {/* Info */}
              <div className="text-center mb-6">
                <div className="font-mono text-[9px] tracking-[3px] mb-2.5 transition-colors duration-700" style={{ color:t.color }}>NOW PLAYING</div>
                <div className="font-display font-black italic text-white leading-tight mb-1.5" style={{ fontSize:"clamp(20px,3vw,24px)" }}>{t.title}</div>
                <div className="font-body text-sm text-white/44">{t.artist}</div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="h-[3px] rounded-full overflow-hidden mb-2.5" style={{ background:"rgba(255,255,255,0.08)" }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width:"42%", background:t.color, boxShadow:`0 0 8px ${t.color}` }}/>
                </div>
                <div className="flex justify-between font-mono text-[10px] text-white/28"><span>1:42</span><span>3:57</span></div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 md:gap-5 mb-5">
                {["⏮",null,"⏭"].map((ic, i) => i===1 ? (
                  <button key="play" onClick={() => setPlaying(!playing)}
                    className="rounded-full flex items-center justify-center text-xl font-bold border-none cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ width:"clamp(52px,8vw,58px)", height:"clamp(52px,8vw,58px)", background:t.color, color:"#060608", boxShadow:`0 4px 28px ${t.color}55`, transition:"background .8s,box-shadow .8s,transform .15s" }}>
                    {playing?"⏸":"▶"}
                  </button>
                ) : (
                  <button key={ic} className="rounded-full flex items-center justify-center text-white/38 hover:text-white border-none cursor-pointer transition-all duration-200 hover:scale-110"
                    style={{ width:40, height:40, background:"rgba(255,255,255,0.06)", fontSize:14 }}>{ic}</button>
                ))}
              </div>

              {/* Shuffle / Stars / Repeat */}
              <div className="flex items-center justify-between px-1 mb-5">
                <button className="font-mono text-[10px] text-white/28 hover:text-white/60 border-none bg-transparent cursor-pointer tracking-wider transition-colors">SHUFFLE</button>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-xs cursor-pointer" style={{ color:s<=4?t.color:"rgba(255,255,255,0.2)" }}>★</span>)}
                </div>
                <button className="font-mono text-[10px] text-white/28 hover:text-white/60 border-none bg-transparent cursor-pointer tracking-wider transition-colors">REPEAT</button>
              </div>

              {/* Dots */}
              <div className="flex gap-2 justify-center">
                {TRACKS.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)}
                    className="h-[6px] rounded-full border-none cursor-pointer transition-all duration-300"
                    style={{ width:i===idx?24:6, background:i===idx?t.color:"rgba(255,255,255,0.14)" }}/>
                ))}
              </div>
            </div>

            {/* Up next */}
            <div className="mt-3 mx-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", backdropFilter:"blur(12px)" }}>
              <span className="font-mono text-[9px] tracking-[2px] text-white/30 flex-shrink-0">UP NEXT</span>
              <div className="w-px h-3 bg-white/10 flex-shrink-0"/>
              <span className="font-body text-xs text-white/55 truncate">{TRACKS[(idx+1)%TRACKS.length].title}</span>
              <span className="font-mono text-[10px] text-white/28 flex-shrink-0 ml-auto">{TRACKS[(idx+1)%TRACKS.length].artist.split(" ")[0]}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 opacity-30 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[3px] text-white">SCROLL</span>
        <div className="w-px h-9" style={{ background:"linear-gradient(to bottom,rgba(232,255,71,0.6),transparent)" }}/>
      </div>
    </section>
  );
}