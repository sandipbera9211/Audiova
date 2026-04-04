import express from 'express';
import userAuth from '../middleware/authMiddleware.js';
import { allAlbum, createAlbum, addSong, removeSong, artistAlbum, } from '../controller/albumController.js';
import upload from '../middleware/multer.js';
import cloudinary from '../config/cloudinary.js';

const albumRouter = express.Router();

albumRouter.get('/', allAlbum);
albumRouter.get('/artistalbum', userAuth, artistAlbum);
albumRouter.post('/', userAuth, upload.fields([
  { name: "image", maxCount: 1 }
]), createAlbum);


albumRouter.post('/:albumId/song/:songId', userAuth, addSong);


albumRouter.delete('/:albumId/song/:songId', userAuth, removeSong);

export default albumRouter;
