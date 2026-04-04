
import PlayList from "../models/PlayList.js";
import Music from "../models/Music.js";

export const createPlaylist=async(req,res)=>{
  
    try {
          const{name,description,isPublic}=req.body;
    if(!name){
       return res.status(400).json({
    success: false,
    message: "Write name for the playlist."
  });
    }
      const alb=await PlayList.create({
        name,
        description,
        user:req.user._id,
        isPublic: isPublic ?? false
      })
 return res.status(201).json({
    success: true,
    message: "playlist created successfuly.",
    alb
  });
    } catch (error) {
    return res.status(500).json({
  success:false,
  message:error.message
 })
    }
}

export const addSong = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    // 1️⃣ find playlist (must belong to user)
    const playlist = await PlayList.findOne({
      _id: playlistId,
      user: req.user._id,
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // 2️⃣ check song exists
    const song = await Music.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // 3️⃣ prevent duplicate song
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song already in playlist",
      });
    }

    // 4️⃣ add song
    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json({
      success: true,
      message: "Song added to playlist successfully",
      playlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const removeSong = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    // 1️⃣ find playlist owned by user
    const playlist = await PlayList.findOne({
      _id: playlistId,
      user: req.user._id,
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // 2️⃣ check if song exists in playlist
    if (!playlist.songs.includes(songId)) {
      return res.status(400).json({
        success: false,
        message: "Song not found in playlist",
      });
    }

    // 3️⃣ remove song
    playlist.songs = playlist.songs.filter(
      (id) => id.toString() !== songId
    );

    await playlist.save();

    return res.status(200).json({
      success: true,
      message: "Song removed from playlist successfully",
      playlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllPlaylist=async(req,res)=>{
try {
    const allplaylist=await PlayList.find({user:req.user._id}).populate("songs","name image url");;

    return res.status(200).json({
        success: true,
        message: "All Playlist fetched successsfully.",
        total:allplaylist.length,
        allplaylist
      });
} catch (error) {
      return res.status(500).json({
      success: false,
      message: error.message,
    });
}
}

export const allPlayListSong=async(req,res)=>{
  try {
    const {id}=req.params;
     const allsong=await PlayList.findById(id).populate("songs","name image url");
     if(!allsong){
        return res.status(400).json({
        success: false,
        message: "no song in album"
      });
     }
 
    return res.status(200).json({
        success: true,
        message: "All song",
        allsong
      });
} catch (error) {
      return res.status(500).json({
      success: false,
      message: error.message,
    });
}
}
