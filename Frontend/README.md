<div align="center">

# 🎵 Audiova
![Audiova Screenshot](./font.png)
### A full-stack music streaming platform — listen, upload, discover.

**[🌐 Live Demo](https://audiova-o67l.vercel.app)** · Built with React + Node.js + MongoDB + Cloudinary

---

</div>

## What is Audiova?

Audiova is an open music platform where **anyone can listen** to music for free, and **any registered artist can upload** their songs and albums. No gatekeeping — just music.

- 🎧 **Listeners** — browse, play, and create playlists without signing up
- 🎤 **Artists** — register, upload songs, create albums, and build a profile
- 🔍 **Discover** — explore by genre, artist, or album

---

## Features

| Feature | Details |
|---|---|
| 🎵 Music playback | Persistent now-playing bar with seek, volume, pause |
| 📁 Upload songs | Artists upload audio + cover image via Cloudinary |
| 💿 Albums | Create albums, add/remove songs |
| 🎤 Artist profiles | Bio, social links, all songs in one place |
| 📋 Playlists | Personal playlists, add/remove songs |
| 🔐 Auth | JWT via httpOnly cookies, bcrypt passwords |
| 👤 Roles | User → become Artist → full upload dashboard |

---

## Tech Stack

### Frontend
- **React 19** + Vite
- **React Router v7** — client-side routing
- **Tailwind CSS v4** — utility styling
- **React Toastify** — notifications
- Deployed on **Vercel**

### Backend
- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose** — database
- **JWT** + **bcrypt** — authentication
- **Cloudinary** — audio and image storage
- **Multer** — file upload handling
- Deployed on **Vercel** (serverless)

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB URI (Atlas or local)
- Cloudinary account

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/Audiova.git
cd Audiova
```

### 2. Backend setup
```bash
cd Backend
npm install
```

Create `Backend/.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
PORT=3000
NODE_ENV=development
```

```bash
npm run dev   # starts with nodemon
```

### 3. Frontend setup
```bash
cd Frontend
npm install
```

Create `Frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev   # starts at http://localhost:5173
```

---

## Project Structure

```
Audiova/
├── Backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Cloudinary config
│   ├── controller/
│   │   ├── userController.js  # Auth — register, login, logout
│   │   ├── artistController.js
│   │   ├── musicController.js
│   │   ├── albumController.js
│   │   └── playlistController.js
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── multer.js          # File upload + type validation
│   ├── models/
│   │   ├── User.js
│   │   ├── Artist.js
│   │   ├── Music.js
│   │   ├── Album.js
│   │   └── PlayList.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   ├── artistRouter.js
│   │   ├── musicRouter.js
│   │   ├── albumRouter.js
│   │   └── playlistRouter.js
│   └── server.js
│
└── Frontend/
    └── src/
        ├── assets/
        │   ├── components/    # Navbar, NowPlayingBar, Login, etc.
        │   ├── pages/         # Home, Music, Album, Artist, etc.
        │   └── context/
        │       └── PlayerContext.jsx  # Global audio player state
        └── App.jsx
```

---

## API Reference

### Auth — `/api/authentication`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | — | Create account |
| POST | `/login` | — | Login |
| POST | `/logout` | ✅ | Logout |
| POST | `/reset-password` | ✅ | Change password |
| DELETE | `/delete-user` | ✅ | Delete account |

### Music — `/api/music`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/all-music` | — | Get all songs |
| POST | `/upload` | ✅ Artist | Upload a song |
| DELETE | `/delete-song/:id` | ✅ Artist | Delete own song |
| GET | `/album/:id` | — | Songs in an album |
| GET | `/artistsong/:id` | — | Songs by artist |

### Albums — `/api/album`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | — | All albums |
| POST | `/` | ✅ Artist | Create album |
| GET | `/artistalbum` | ✅ | Your albums |
| POST | `/:albumId/song/:songId` | ✅ | Add song to album |
| DELETE | `/:albumId/song/:songId` | ✅ | Remove song from album |

### Artists — `/api/artist`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/all-artist` | — | All artists |
| GET | `/:id` | — | Single artist |
| POST | `/become-artist` | ✅ | Become an artist |

### Playlists — `/api/playlists`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/create` | ✅ | Create playlist |
| GET | `/` | ✅ | Your playlists |
| GET | `/:id` | ✅ | Playlist songs |
| POST | `/:playlistId/song/:songId` | ✅ | Add song |
| DELETE | `/:playlistId/song/:songId` | ✅ | Remove song |

---

## Deploying to Vercel

### Backend
1. Import the `Backend` folder as a new Vercel project
2. Add all environment variables from `.env`
3. The `vercel.json` handles routing automatically

### Frontend
1. Import the `Frontend` folder as a new Vercel project
2. Add environment variable: `VITE_API_URL=https://your-backend.vercel.app`
3. **After adding env vars, always redeploy** — Vite bakes them at build time

---

## How to become an artist & upload

1. **Sign up** at [audiova-o67l.vercel.app](https://audiova-o67l.vercel.app/signup)
2. Go to **Profile** → click **Become an Artist**
3. Fill in your artist name and bio
4. Head to your **Dashboard** → **Upload Song**
5. Your music is live instantly 🎉

---

## License

MIT — free to use, modify, and distribute.

---

<div align="center">
Made with ♪ by the Audiova team · <a href="https://audiova-o67l.vercel.app">audiova-o67l.vercel.app</a>
</div>