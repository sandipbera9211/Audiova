import mongoose from "mongoose";

const musicSchema=new mongoose.Schema({
       name:{type:String,trim:true,required:true},
      artist:{type: mongoose.Schema.Types.ObjectId,ref:"Artist", required: true},
      album:{type: mongoose.Schema.Types.ObjectId,ref:"Album"},
       url: { type: String, required: true,default:"" },
      genre: { 
    type: String, 
    enum: ["Pop", "Rock", "Hip-Hop", "Jazz", "Classical","Other"], 
    default: "Other" 
   },
   duration:{type:Number,required:true},
   image:{type:String},
   plays: { type: Number, default: 0 }

},{timestamps:true})

const Music=mongoose.model("Music",musicSchema);

export default Music;