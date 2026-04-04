import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import artistRouter from './routes/artistRouter.js';
import musicRouter from './routes/musicRouter.js';
import playlistRouter from './routes/playlistRouter.js';
import albumRouter from './routes/albumRouter.js';
import cors from 'cors'

dotenv.config();
const app=express();
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
const PORT=process.env.PORT || 3000;

app.get('/',(req,res)=>{
   res.send("API is working.....") 
})
app.use('/api/authentication',authRouter);
app.use('/api/artist',artistRouter);
app.use('/api/music',musicRouter);
app.use('/api/playlists',playlistRouter);
app.use('/api/album',albumRouter)

app.listen(PORT,()=>{
   console.log(`Server is listening on ${PORT}`);
})

export default app;