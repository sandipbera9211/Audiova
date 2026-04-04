import mongoose from "mongoose";

const playlistSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String, trim:true,default:""},
    songs:[{type:mongoose.Schema.Types.ObjectId ,ref:"Music"}],
     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPublic:{type:Boolean,default:false}
},{timestamps:true})

const PlayList=mongoose.model("PlayList",playlistSchema);

export default PlayList;