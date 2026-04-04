export default function CTABanner() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16 md:pb-24">
      <div className="relative rounded-[28px] text-center overflow-hidden"
        style={{ background:"linear-gradient(135deg,rgba(232,255,71,0.06),rgba(78,205,196,0.04))", border:"1px solid rgba(232,255,71,0.14)", padding:"clamp(40px,6vw,80px) clamp(20px,5vw,64px)" }}>

        {/* BG texture */}
        <div className="absolute inset-0 rounded-[28px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&q=75&auto=format&fit=crop"
            alt="" className="w-full h-full object-cover" style={{ opacity:.055, filter:"saturate(0.15)" }}/>
        </div>

        {/* Glow blobs */}
        <div className="absolute -left-16 -top-16 pointer-events-none" style={{ width:"clamp(200px,35vw,380px)", height:"clamp(200px,35vw,380px)", borderRadius:"50%", background:"radial-gradient(circle,rgba(232,255,71,0.1),transparent 65%)" }}/>
        <div className="absolute -right-12 -bottom-12 pointer-events-none" style={{ width:"clamp(160px,28vw,320px)", height:"clamp(160px,28vw,320px)", borderRadius:"50%", background:"radial-gradient(circle,rgba(78,205,196,0.08),transparent 65%)" }}/>

        <div className="relative z-10">
          <p className="font-mono text-[10px] tracking-[3px] mb-5" style={{ color:"rgba(232,255,71,0.75)" }}>◈ JOIN AUDIOVA</p>

          <h2 className="font-display font-black italic leading-[0.9] tracking-tight text-white mb-5"
            style={{ fontSize:"clamp(36px,6vw,72px)" }}>
            Your Music.<br/>
            <span className="accent-shimmer">Unlimited.</span>
          </h2>

          <p className="font-body text-white/38 leading-relaxed mx-auto mb-9" style={{ fontSize:"clamp(14px,1.6vw,16px)", maxWidth:420 }}>
            Join over 2.4 million listeners. No ads, no interruptions — pure, unfiltered sound.
          </p>

          <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
            <button className="btn-accent font-body font-bold rounded-2xl"
              style={{ fontSize:"clamp(13px,1.5vw,15px)", padding:"clamp(12px,2vw,16px) clamp(24px,4vw,40px)" }}>
              Try Free for 30 Days
            </button>
            <button className="btn-ghost font-body rounded-2xl"
              style={{ fontSize:"clamp(13px,1.5vw,15px)", padding:"clamp(12px,2vw,16px) clamp(22px,3.5vw,36px)" }}>
              See Plans →
            </button>
          </div>

          <p className="font-mono text-[10px] text-white/18 tracking-[2px] mt-7">NO CREDIT CARD REQUIRED · CANCEL ANYTIME</p>
        </div>
      </div>
    </section>
  );
}