import express from 'express';
import userAuth from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';
import { allSong, artistSong, deleteSong, getAlbumSong, uploadSong } from '../controller/musicController.js';

const musicRouter=express.Router();

musicRouter.post('/upload',userAuth,upload.fields([
    {name:"song",maxCount:1},
    {name:"image",maxCount:1}
]),uploadSong)

musicRouter.get('/all-music',allSong);
musicRouter.get('/album/:id',getAlbumSong);
musicRouter.delete('/delete-song/:id',userAuth,deleteSong);
musicRouter.get('/artistsong/:id',artistSong)

export default musicRouter;