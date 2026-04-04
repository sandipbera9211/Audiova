import mongoose from "mongoose";

const artistSchema=new mongoose.Schema({
 user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, trim: true, required: true },
    bio:{type:String,trim:true,default:""},
    image:{type:String,default:""},
    socialLinks:{
        instagram:{type:String,default:""},
        facebook:{type:String,default:""},
        twitter:{type:String,default:""},
        youtube:{type:String,default:""},
    },

},{timestamps:true})

const Artist=mongoose.model("Artist",artistSchema);
export default Artist;