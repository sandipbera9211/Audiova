import express from'express'
import { deleteUser, logIn, logOut, registerUser, resetPasssword } from "../controller/userController.js";
import userAuth from '../middleware/authMiddleware.js';

const authRouter=express.Router();

authRouter.post('/register',registerUser);
authRouter.post('/login',logIn);
authRouter.post('/reset-password',userAuth,resetPasssword);
authRouter.post('/logout',userAuth,logOut);
authRouter.delete('/delete-user',userAuth,deleteUser);

export default authRouter;