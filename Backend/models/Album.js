import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }], 
}, { timestamps: true });

const Album = mongoose.model("Album", albumSchema);
export default Album;