import Artist from "../models/Artist.js";
import User from "../models/User.js";
export const becomeArtist=async(req,res)=>{
     try {
        const {name,bio,image,socialLinks}=req.body;
       if(!name){
        return res.status(400).json({
            success:false,
            message:"Artist name required"
        })
       }
 const existingArtist = await Artist.findOne({ user: req.user._id });
    if (existingArtist) {
      return res.status(400).json({
        success: false,
        message: "Artist already exists for this user",
      });
    }
       const artist=await Artist.create({
        user:req.user._id,
        name,
        bio,
        image,
        socialLinks 
       })
    
     const user=await  User.findByIdAndUpdate(
      req.user._id,
      {role:"artist"},
      {new:true}
    );
     
      return res.status(201).json({
        success:true,
        message:"You are Artist now, add your songs...",
        user
       })
     } catch (error) {
         return res.status(500).json({
        success:false,
        message:error.message
       })
     }
}

export  const getAllArtist=async(req,res)=>{
    try {
         const allArtist=await Artist.find()
         .populate("user","userName email");
     res.status(200).json({
        success:true,
        message:"All Artists",
        count:allArtist.length
        ,allArtist
     })
    } catch (error) {
          res.status(400).json({
        success:false,
        message:error.message,
     })
    }
}


export const singleArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate("user", "_id userName");
    if (!artist) {
      return res.status(400).json({ success: false, message: "Artist is not present now" });
    }
    return res.status(200).json({ success: true, message: "Artist fetched successfully.", artist });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

