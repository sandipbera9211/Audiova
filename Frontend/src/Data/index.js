export const NAV_LINKS = ["Discover", "Library", "Artists", "Radio"];

export const HERO_TRACKS = [
  { title: "Neon Drift",        artist: "Synthwave Collective", color: "#E8FF47" },
  { title: "Midnight Protocol", artist: "Dark Matter",          color: "#4ecdc4" },
  { title: "Glass Horizon",     artist: "Aurora Fields",        color: "#c77dff" },
];

export const TRACKS = [
  { id: 1, title: "Neon Drift",        artist: "Synthwave Collective", genre: "SYNTHWAVE",  dur: "3:57", plays: "2.4M", color: "#E8FF47" },
  { id: 2, title: "Midnight Protocol", artist: "Dark Matter",          genre: "ELECTRONIC", dur: "3:18", plays: "1.8M", color: "#4ecdc4" },
  { id: 3, title: "Glass Horizon",     artist: "Aurora Fields",        genre: "AMBIENT",    dur: "5:12", plays: "980K", color: "#c77dff" },
  { id: 4, title: "Pulse Engine",      artist: "Frequency Six",        genre: "TECHNO",     dur: "4:24", plays: "1.2M", color: "#ff6b6b" },
];

export const TRENDING = [
  { rank: 1, title: "Pulse Engine",  artist: "Frequency Six", color: "#E8FF47", tag: "+3"  },
  { rank: 2, title: "Starfall",      artist: "Celestia",      color: "#c77dff", tag: "+1"  },
  { rank: 3, title: "Iron Bloom",    artist: "Velvet Wreck",  color: "#ff6b6b", tag: "-1"  },
  { rank: 4, title: "Echo Chamber",  artist: "Void Signal",   color: "#4ecdc4", tag: "+5"  },
  { rank: 5, title: "Solar Flare",   artist: "Astral Monks",  color: "#ff9a3c", tag: "NEW" },
  { rank: 6, title: "Deep Blue",     artist: "Ocean Drive",   color: "#60a5fa", tag: "+2"  },
];

export const GENRES = [
  { name: "Electronic", count: "12.4K", color: "#4ecdc4", bg: "rgba(78,205,196,0.07)",  icon: "⚡" },
  { name: "Synthwave",  count: "8.1K",  color: "#E8FF47", bg: "rgba(232,255,71,0.07)",  icon: "🌆" },
  { name: "Ambient",    count: "6.7K",  color: "#c77dff", bg: "rgba(199,125,255,0.07)", icon: "🌊" },
  { name: "Techno",     count: "9.3K",  color: "#ff6b6b", bg: "rgba(255,107,107,0.07)", icon: "🔧" },
  { name: "Dream Pop",  count: "4.2K",  color: "#f9a8d4", bg: "rgba(249,168,212,0.07)", icon: "✨" },
  { name: "Indie",      count: "15.8K", color: "#ff9a3c", bg: "rgba(255,154,60,0.07)",  icon: "🎸" },
];

export const ARTISTS = [
  { name: "Synthwave Collective", genre: "Synthwave",  followers: "1.2M", tracks: 48, color: "#E8FF47", verified: true  },
  { name: "Aurora Fields",        genre: "Ambient",    followers: "890K", tracks: 32, color: "#c77dff", verified: true  },
  { name: "Dark Matter",          genre: "Electronic", followers: "2.1M", tracks: 67, color: "#4ecdc4", verified: true  },
  { name: "Celestia",             genre: "Dream Pop",  followers: "670K", tracks: 29, color: "#f9a8d4", verified: false },
];

export const TICKER_TAGS = [
  "ELECTRONIC","SYNTHWAVE","AMBIENT","TECHNO","DREAM POP",
  "INDIE","HIP-HOP","JAZZ","LO-FI","HOUSE","R&B","CLASSICAL",
];