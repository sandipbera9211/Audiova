const COLS = [
  { title:"Product", links:["Discover","Library","Artists","Podcasts","Radio"] },
  { title:"Company", links:["About","Blog","Careers","Press"] },
  { title:"Support", links:["Help Center","Contact","Privacy","Terms"] },
];

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-12 pb-8"
      style={{ borderTop:"1px solid rgba(232,255,71,0.09)" }}>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div>
          <div className="font-display font-black italic mb-4" style={{ fontSize:"clamp(22px,3vw,28px)", color:"#E8FF47" }}>
            Audio<span className="not-italic text-white">va</span>
          </div>
          <p className="font-body text-sm text-white/32 leading-relaxed max-w-[200px] mb-6">
            Your sonic universe — discover, stream, and share music that moves you.
          </p>
          <div className="flex gap-2 flex-wrap">
            {["𝕏","▶","◎","♪"].map((ic, i) => (
              <button key={i} className="w-9 h-9 rounded-xl flex items-center justify-center text-sm text-white/28 cursor-pointer transition-all duration-200 hover:text-white/80 border-none"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}>
                {ic}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {COLS.map(col => (
          <div key={col.title}>
            <p className="font-mono text-[10px] tracking-[2.5px] text-white/22 mb-4 md:mb-5">{col.title.toUpperCase()}</p>
            {col.links.map(l => (
              <a key={l} href="#" className="block font-body text-sm text-white/32 no-underline mb-3 transition-colors duration-200 hover:text-white/65"
                style={{ textDecoration:"none" }}>{l}</a>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 pt-6"
        style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <p className="font-mono text-[11px] text-white/18">© 2026 AUDIOVA. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/18">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background:"#4ecdc4", boxShadow:"0 0 6px #4ecdc4", animation:"pdot 2s ease-in-out infinite" }}/>
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>
    </footer>
  );
}