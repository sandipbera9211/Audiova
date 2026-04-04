import { useState } from "react";
import { FaInstagramSquare, FaYoutube, FaFacebook } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const SOCIAL_ICONS = {
  instagram: <FaInstagramSquare />,
  twitter: <FaSquareTwitter />,
  youtube: <FaYoutube />,
  facebook: <FaFacebook />,
};

export default function ArtistCard({ artist, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);

  const hasSocials =
    artist.socialLinks &&
    Object.values(artist.socialLinks).some(Boolean);

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-[20px] cursor-pointer select-none"
      style={{
        background: "var(--bg-card)",
        aspectRatio: "3/4",
        minHeight: 280,
        border: isActive
          ? "1px solid var(--border-accent)"
          : hovered
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid var(--border)",
        boxShadow: isActive
          ? "0 20px 60px var(--accent-glow)"
          : hovered
          ? "0 20px 50px rgba(0,0,0,0.7)"
          : "0 4px 20px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-8px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "transform 0.38s cubic-bezier(0.22,1,0.36,1), box-shadow 0.38s ease, border-color 0.25s ease",
      }}
    >
      {/* Cover image */}
      <img
        src={artist.image || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80"}
        alt={artist.name}
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{
          filter: hovered ? "brightness(0.58) saturate(1.1)" : "brightness(0.35) saturate(0.85)",
          transition: "filter 0.4s ease",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

      {/* Active indicator — FaCircleUser replaces the manual SVG */}
      {isActive && (
        <div
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "var(--accent-dim)", border: "1px solid var(--border-accent)" }}
        >
          <FaCircleUser
            size={18}
            style={{ color: "var(--accent)" }}
          />
        </div>
      )}

      {/* Hover arrow — FaArrowRight replaces the manual SVG */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ opacity: hovered && !isActive ? 1 : 0, transition: "opacity 0.28s ease" }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "var(--accent)", boxShadow: "0 0 36px var(--accent-glow)" }}
        >
          <FaArrowRight
            size={18}
            style={{ color: "var(--bg)" }}
          />
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 pt-4">

        {/* Active accent bar */}
        <div className="h-[2px] rounded-full bg-white/10 overflow-hidden mb-3">
          {isActive && (
            <div
              className="h-full rounded-full"
              style={{ width: "60%", background: "linear-gradient(90deg, var(--accent), var(--teal))" }}
            />
          )}
        </div>

        {/* Name */}
        <h3
          className="m-0 font-serif font-bold leading-snug tracking-tight"
          style={{
            fontSize: "clamp(15px, 2vw, 19px)",
            color: isActive ? "var(--accent)" : "var(--text)",
            transition: "color 0.25s",
          }}
        >
          {artist.name}
        </h3>

        {/* Bio */}
        {artist.bio && (
          <p className="mt-1.5 mb-0 text-[11px] leading-snug line-clamp-2"
            style={{ color: "var(--text-muted)" }}>
            {artist.bio}
          </p>
        )}

        {/* Footer: socials + label */}
        <div className="mt-3 flex items-center justify-between">
          {hasSocials ? (
            <div className="flex items-center gap-1.5">
              {Object.entries(artist.socialLinks).map(([platform, url]) =>
                url ? (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center w-5 h-5 rounded-md transition-all duration-200 hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "var(--text-muted)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    aria-label={platform}
                  >
                    {SOCIAL_ICONS[platform]}
                  </a>
                ) : null
              )}
            </div>
          ) : <span />}

          <span
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
          >
            {isActive ? "Selected" : "View →"}
          </span>
        </div>
      </div>
    </article>
  );
}