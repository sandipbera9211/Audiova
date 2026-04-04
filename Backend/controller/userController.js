import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import Artist from '../models/Artist.js';
import Album from '../models/Album.js';
import Music from '../models/Music.js';
import PlayList from '../models/PlayList.js';
dotenv.config();

export const registerUser = async (req,res)=>{
   try {
     const {userName,email,password,phoneNumber,avatar,role}=req.body;
    if(!userName || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All Fields are required"
        })
    }

    const userAlreadyExist=await User.findOne({
        $or:[
        {userName},
        {email}
    ]
    })

    if(userAlreadyExist){
        return res.status(400).json({
            success:false,
            message:"User Already Exists"
        })
    }

    const hashPassword=await bcrypt.hash(password,10);

    const user=await User.create({
        userName,
        email,
        password:hashPassword,
        phoneNumber,
        avatar,
        role
    })

    const token=jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET, { expiresIn: "7d" } );

res.cookie("token", token, {
  httpOnly: true,
  secure: true,       
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: "none",     
});
    return res.status(201).json({
        success:true,
        message:"User created successfully",
        user
    })
   } catch (error) {
       return res.status(500).json({
        success:false,
        message:error.message
       })
   }
}


export const logIn=async (req,res)=>{
        try {
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Email & password are required"
        })
    }

        const user = await User.findOne({ email }).select("+password");

        if(!user){
             return res.status(400).json({
            success:false,
            message:"You have no account in this email."
        })
        }

        const ishpass=await bcrypt.compare(password,user.password);
        if(!ishpass){
                return res.status(400).json({
            success:false,
            message:"Invalid password"
        })
        }

     const token=jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET, { expiresIn: "7d" } );


     res.cookie("token", token, {
      httpOnly: true,           
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,  
      sameSite: "lax"      
    });
    return res.status(200).json({
        success:true,
        message:"Log in successfully",
        user
    })
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const resetPasssword=async (req,res)=>{
    try {
        const {email,password,newPassword}=req.body;
        if(!email || !password || !newPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user=await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"You have no account in this email."
            })
        }
        const ishpass= await bcrypt.compare(password,user.password);
        if(!ishpass){
            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            })
        }
res.clearCookie("token");
        const hashPassword=await bcrypt.hash(newPassword,10);
        user.password=hashPassword;
        await user.save();
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: "lax"
});
         return res.status(200).json({
                success:true,
                message:"Password changed successfully.",
                user
            })
    } catch (error) {
           return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const logOut=async(req,res)=>{
   try {
     res.clearCookie("token");
    res.status(200).json({
        success:true,
        message:"Logged Out successfully."
    })
   } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
   }
}


export const deleteUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
            if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No account found with this email."
            });
        }
         const ishpass= await bcrypt.compare(password,user.password);
        if(!ishpass){
            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            })
        }
      
       const artist= await Artist.findOne({user:user._id});
       if(artist){
        await Music.deleteMany({artist:artist._id});
        await Album.deleteMany({artist:artist._id});
        await Artist.findByIdAndDelete(artist._id);
       }
      await PlayList.deleteMany({user:user._id});
        await User.findByIdAndDelete(user._id);
       res.clearCookie("token")
          return res.status(200).json({
                success:true,
                message:"Account Deleted successfully."
            })
    } catch (error) {
           return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}