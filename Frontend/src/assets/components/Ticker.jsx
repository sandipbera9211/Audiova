const TAGS = ["ELECTRONIC","SYNTHWAVE","AMBIENT","TECHNO","DREAM POP","INDIE","HIP-HOP","JAZZ","LO-FI","HOUSE","R&B","CLASSICAL"];

export default function Ticker() {
  return (
    <div className="relative overflow-hidden py-3.5 select-none"
      style={{ borderTop:"1px solid rgba(232,255,71,0.1)", borderBottom:"1px solid rgba(232,255,71,0.1)", background:"rgba(232,255,71,0.018)" }}>
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background:"linear-gradient(to right,#060608,transparent)" }}/>
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background:"linear-gradient(to left,#060608,transparent)" }}/>

      <div className="flex whitespace-nowrap" style={{ width:"max-content", animation:"ticker 32s linear infinite" }}>
        {[0,1].map(r => TAGS.map((tag, i) => (
          <span key={`${r}-${i}`} className="font-mono text-[10px] tracking-[2.5px] px-8 inline-flex items-center gap-5"
            style={{ color: i%3===1 ? "rgba(232,255,71,0.65)" : "rgba(255,255,255,0.2)" }}>
            {tag}<span className="opacity-25 text-[8px]">✦</span>
          </span>
        )))}
      </div>
    </div>
  );
}