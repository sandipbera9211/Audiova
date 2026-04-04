import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './assets/pages/Home';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import Artist from './assets/pages/Artist';
import Music from './assets/pages/Music';
import Album from './assets/pages/Album';
import Login from './assets/components/Login';
import Signup from './assets/components/Signup';
import { PlayerProvider } from './assets/context/PlayerContext';
import NowPlayingBar from './assets/components/NowPlayingBar';
import ArtistDetail from './assets/pages/Artistdetail';
import Dashboard from './assets/components/Dashboard';
import ArtistAllMusic from './assets/pages/Artist/ArtistAllMusic';
import UploadSong from './assets/pages/Artist/UploadSong';
import ArtistAlbum from './assets/pages/Artist/ArtistAlbum';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './assets/components/Profile';
import PlayList from './assets/pages/PlayList';



const App = () => {
  const location = useLocation();

  return (
    <PlayerProvider>
      <div className="min-h-screen flex flex-col bg-[#060608] text-white">
<ToastContainer />
        { <Navbar />}

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/music"   element={<Music />} />
            <Route path="/albums"  element={<Album />} />
            <Route path="/artists" element={<Artist />} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path="/login"   element={<Login />} />
            <Route path="/signup"  element={<Signup />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
            <Route path='/playlist' element={<PlayList/>}/>
           <Route path='/dashboard' element={<Dashboard/>}>
                <Route path='artist-allmusic' element={<ArtistAllMusic/>}/>
                <Route path='upload-song' element={<UploadSong/>}/>
                <Route path='artist-album' element={<ArtistAlbum/>}/>
           </Route>
          </Routes>
        </main>

  
        { <Footer />}

   
        { <NowPlayingBar />}

      </div>
    </PlayerProvider>
  );
};

export default App;