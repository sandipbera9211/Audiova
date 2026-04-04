import Album from "../models/Album.js"
import Artist from "../models/Artist.js";
import Music from "../models/Music.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

export const allAlbum=async(req,res)=>{
    try {
        const albumall=await Album.find().populate("artist","name image");

     return res.status(200).json({
         success:true,
         message:"Album fetched successfully.",
        albumall
       })
    } catch (error) {
    return res.status(500).json({
    success:false,
     message:error.message
     })
    }
}

export const artistAlbum=async(req,res)=>{
  try {
   const artist = await Artist.findOne({ user: req.user._id }); // ← same lookup as createAlbum
    
    if (!artist) {
      return res.status(403).json({ success: false, message: "Artist not found" });
    }
        const albumall=await Album.find({artist:artist._id}).select("name songs")
        .populate({
  path: "songs",
  select: "title"
})
       return res.status(200).json({
         success:true,
         message:"N",
        albumall
       })
        
  } catch (error) {
      return res.status(500).json({
    success:false,
     message:error.message
     })
  }
}
export const createAlbum = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageFile = req.files?.image?.[0]; 

    if (!name || !description || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

     const alb=await Album.findOne({name:name});
     if(alb){
      return res.status(400).json({
        success:false,
        message:"Album already exist"
      })
     }
    const artist = await Artist.findOne({ user: req.user._id });

    if (!artist) {
      return res.status(403).json({
        success: false,
        message: "Only Artist can create Album."
      });
    }

   
    const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
      folder: "albums",
      resource_type: "image"
    });



    const album = await Album.create({
      name,
      description,
      artist: artist._id,
      image: uploadResult.secure_url 
    });

    return res.status(200).json({
      success: true,
      message: "Album created successfully.",
      album
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const addSong = async (req, res) => {
  try {
    const { albumId, songId } = req.params;

    const album = await Album.findById(albumId);
    if (!album) return res.status(404).json({ success: false, message: "Album not found" });

    const song = await Music.findById(songId);
    if (!song) return res.status(404).json({ success: false, message: "Song not found" });

    if (album.songs.some(id => id.toString() === songId)) {
      return res.status(400).json({ success: false, message: "Song already in album" });
    }

    album.songs.push(new mongoose.Types.ObjectId(songId));
    await album.save();

    return res.status(200).json({ success: true, message: "Song added successfully", album });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeSong = async (req, res) => {
  try {
    const { albumId, songId } = req.params;

    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found"
      });
    }

    album.songs = album.songs.filter(
      (id) => id.toString() === songId
    );

    await album.save();

    return res.status(200).json({
      success: true,
      message: "Song removed successfully",
      album
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
