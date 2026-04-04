import express from 'express';
import userAuth from '../middleware/authMiddleware.js';
import { addSong, allPlayListSong, createPlaylist, getAllPlaylist, removeSong } from '../controller/playlistController.js';

const playlistRouter=express.Router();

playlistRouter.post('/',userAuth,createPlaylist);
playlistRouter.post("/add-in-playlist/:playlistId/song/:songId", userAuth, addSong);
playlistRouter.delete("/remove-from-playlist/:playlistId/song/:songId", userAuth, removeSong);
playlistRouter.get('/',userAuth,getAllPlaylist);
playlistRouter.get("/playlist/:id", userAuth, allPlayListSong);


export default playlistRouter;