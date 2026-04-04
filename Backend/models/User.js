import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
     userName:{type:String, required:true,unique:true,trim: true,minlength: 3,maxlength: 30,},
     email:{type:String,required:true,unique:true,lowercase:true,  trim: true, match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],},
     password:{type:String,required:true,select:false},
    phoneNumber:{type:String, match: [/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"],},
    isPremium:{type:Boolean,default:false},
    avatar:{type:String,default:""},
    role: {type: String, enum: ["user", "artist", "admin"], default: "user"},
    refreshToken: { type: String, select: false, }
},{timestamps:true})

const User=mongoose.model("User",userSchema);
export default User;