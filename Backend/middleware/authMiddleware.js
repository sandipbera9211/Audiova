
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
const userAuth=async(req,res,next)=>{
     try {
        const token=req.cookies.token;
     if(!token){
        return res.status(400).json({
            success:false,
            message:"Log-In again"
        })
     }
     const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
     req.user=await User.findById(tokenDecode.id).select("-password");
     next();
     } catch (error) {
         return res.status(500).json({
            success:false,
            message:error.message
        })
     }
}

export default userAuth;