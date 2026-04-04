import { Mic, Guitar, Headphones, Music, Disc3, Music2 } from "lucide-react";

const GENRES = [
  { 
    name:"Pop", 
    count:"12.4K", 
    icon: Mic,
    color:"#4ecdc4",
    bg:"rgba(78,205,196,0.07)"
  },
  { 
    name:"Rock",  
    count:"8.1K",  
    icon: Guitar,
    color:"#E8FF47",
    bg:"rgba(232,255,71,0.07)"
  },
  { 
    name:"Hip-Hop",    
    count:"6.7K",  
    icon: Headphones,
    color:"#c77dff",
    bg:"rgba(199,125,255,0.07)"
  },
  { 
    name:"Jazz",     
    count:"9.3K",  
    icon: Music,
    color:"#ff6b6b",
    bg:"rgba(255,107,107,0.07)"
  },
  { 
    name:"Classical",  
    count:"4.2K",  
    icon: Disc3,
    color:"#f9a8d4",
    bg:"rgba(249,168,212,0.07)"
  },
  { 
    name:"Others",      
    count:"15.8K", 
    icon: Music2,
    color:"#ff9a3c",
    bg:"rgba(255,154,60,0.07)"
  },
];

export default function GenreGrid() {
  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 h-full">
      
      <p 
        className="font-mono text-[10px] tracking-[3px] mb-2" 
        style={{ color:"rgba(232,255,71,0.75)" }}
      >
        ◈ EXPLORE
      </p>

      <h2 
        className="font-display font-black italic text-white tracking-tight mb-6" 
        style={{ fontSize:"clamp(24px,3vw,30px)" }}
      >
        Browse Genres
      </h2>

      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {GENRES.map(g => {
          const Icon = g.icon;   // ✅ important fix

          return (
            <div 
              key={g.name} 
              className="genre-card rounded-2xl p-3 md:p-4 cursor-pointer"
              style={{ background:g.bg, border:`1px solid ${g.color}20` }}
              onMouseEnter={e => 
                e.currentTarget.style.borderColor = `${g.color}55`
              }
              onMouseLeave={e => 
                e.currentTarget.style.borderColor = `${g.color}20`
              }
            >
              
              {/* ✅ Proper Icon Rendering */}
              <div className="mb-2 md:mb-3">
                <Icon 
                  className="w-6 h-6 md:w-7 md:h-7 " strokeWidth={2.5}
                  style={{ color: g.color }}
                />
              </div>

              <p className="font-body text-xs md:text-[13px] font-bold text-white mb-1">
                {g.name}
              </p>

              <p 
                className="font-mono text-[9px] tracking-wide" 
                style={{ color:g.color }}
              >
                {g.count} TRACKS
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}