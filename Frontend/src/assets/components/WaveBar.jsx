export default function WaveBar({ color, active, bars = 7 }) {
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 18 }}>
      {[...Array(bars)].map((_, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 2, background: color, transformOrigin: "bottom",
          height: active ? `${28 + (i % 4) * 17}%` : "16%",
          animation: active ? `wave ${.48 + i * .07}s ease-in-out ${i * .07}s infinite alternate` : "none",
          transition: "height .3s ease",
          opacity: active ? 1 : 0.35,
        }} />
      ))}
    </div>
  );
}