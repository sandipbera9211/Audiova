import cloudinary from "../config/cloudinary.js";
import Album from "../models/Album.js";
import Artist from "../models/Artist.js";
import Music from "../models/Music.js";
import mongoose from "mongoose";
import User from "../models/User.js";

export const uploadSong=async(req,res)=>{
    try {
        const{name,album,genre,duration}=req.body;

    if(!name  || !duration){
        return res.status(400).json({
            success:false,
            message:"Name,duartion are required"
        })
    }

    const artist=await Artist.findOne({user:req.user._id});
    if(!artist){
          return res.status(400).json({
            success:false,
            message:"Only Artist can upload songs."
        })
    }

 
  if (!req.files?.song) {
      return res.status(400).json({
        success: false,
        message: "Music file is required",
      });
    }
  const songUpload=await cloudinary.uploader.upload(req.files.song[0].path,{
         resource_type:"video",
         folder:"Audiova/music"
  })
  let imageUrl = "";
    if (req.files?.image) {
      const imageUpload = await cloudinary.uploader.upload(
        req.files.image[0].path, {
          folder: "Audiova/covers"
        }
      );
      imageUrl = imageUpload.secure_url;
    }
    let albumDoc=null;
  if(album){
      albumDoc=await Album.findOne({
        _id:album,
        artist:artist._id
      })
      if (!albumDoc) {
        return res.status(400).json({
          success: false,
          message: "Invalid album",
        });
      }
  }

  const song=await Music.create({
    name,
    artist:artist._id,
    album:albumDoc?._id,
    genre,
    duration,
    url: songUpload.secure_url,
     image: imageUrl,
  })
  
if (albumDoc) {                                      
  albumDoc.songs.push(song._id);
  await albumDoc.save();
}
   return res.status(201).json({
            success:true,
            message:"Music uploaded successfully.",
            song
        })
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const allSong=async(req,res)=>{
    try {
        const allMusic=await Music.find()
        .populate("artist","name")
        .populate("album","name")
          return res.status(200).json({
            success:true,
            message:"Music fetched successfully.",
            total:allMusic.length,
            allMusic
        })
    } catch (error) {
           return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getAlbumSong = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid album ID" });
    }

    const album = await Album.findById(id)  // ← findById, not find()
      .populate("artist", "name image")
      .populate("songs", "name url duration image");

    if (!album) {
      return res.status(404).json({ success: false, message: "Album not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Album songs fetched",
      album
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSong=async(req,res)=>{
    try {
         const {id}=req.params;
     const artist = await Artist.findOne({ user: req.user._id });
     if (!artist) {
  return res.status(403).json({
    success: false,
    message: "Only artists can delete songs"
  });
}
     const result= await Music.deleteOne({_id:id, artist:artist._id});
    
       if (result.deletedCount===0) {
      return res.status(404).json({
        success: false,
        message: "Music not found",
      });
    }
        await Album.updateOne({ songs: id }, { $pull: { songs: id } });

    // TODO: delete song file from Cloudinary (cleanup storage)

          return res.status(200).json({
            success:true,
            message:"Music deleted successfully.",
        })
    } catch (error) {
          return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const artistSong = async (req, res) => {
  try {
    const { id } = req.params; 
    const artistProfile = await Artist.findOne({
      user: new mongoose.Types.ObjectId(id)
    });

    if (!artistProfile) {
      return res.status(404).json({
        success: false,
        message: "Artist profile not found"
      });
    }


    const allsong = await Music.find({
      artist: artistProfile._id
    });

    return res.status(200).json({
      success: true,
      message: "Artist all songs",
      total: allsong.length,
      allsong
    });

  } catch (error) {
    console.error("artistSong error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

