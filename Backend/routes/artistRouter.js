import express from 'express';
import { becomeArtist, getAllArtist, singleArtist } from '../controller/artistController.js';
import userAuth from '../middleware/authMiddleware.js';

const artistRouter=express.Router();

artistRouter.post('/',userAuth,becomeArtist);
artistRouter.get('/',getAllArtist);
artistRouter.get('/artistdetail/:id',singleArtist);

export default artistRouter;