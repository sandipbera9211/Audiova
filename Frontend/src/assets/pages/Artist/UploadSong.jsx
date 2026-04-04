import React, { useState, useRef } from 'react'
import { FaImage, FaMusic } from "react-icons/fa";
import { toast } from 'react-toastify';
const GENRES = ["Pop", "Rock", "Hip-Hop", "Classical", "Other"];

const UploadSong = () => {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [audio, setAudio] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [name, setName] = useState("")
  const [duration, setDuration] = useState("")
  const [genre, setGenre] = useState(null)   
  const imageRef = useRef()
  const audioRef = useRef()

  const handleImage = (file) => {
    if (!file) return
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !audio) return toast.error("Select image and audio.")
    if (!name || !duration) return toast.error("Name and duration are required.")
    if (!genre) return toast.error("Please select a genre.")

    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("song", audio);
      formData.append("image", image);
      formData.append("name", name);
      formData.append("duration", duration);
      formData.append("genre", genre);   // ← send genre

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/music/upload`, {
        method: "POST",
        credentials: "include",
        body: formData
      })

      if (!res.ok) {
        const text = await res.text()
        console.log("Server error:", text)
        toast.error("Upload failed.")
        return
      }

      const data = await res.json()
      data.success ? toast.success("Upload successful.") : toast.error(data.message || "Upload failed.")

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[0.82rem] text-[#f0f0f8] placeholder:text-[#6b6b80] outline-none focus:border-white/25 transition"

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090f] px-4">
      <form onSubmit={handleSubmit} className="w-full sm:w-[70%] lg:w-[45%] px-6 py-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.028)" }}>

        <div className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--accent)]">Music Upload</div>
        <div className="font-bold text-[#f0f0f8] text-[1.75rem] leading-[1.2] mt-1">Upload Your Track</div>
        <div className="text-[0.85rem] text-[#6b6b80] mt-1">Share Your Sound with the World</div>

        {/* Name + Duration */}
        <div className="mt-6 flex gap-3">
          <div className="flex-1">
            <div className="text-sm text-[#6b6b80] mb-2">Song Name</div>
            <input className={inputClass} placeholder="e.g. Blinding Lights" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="w-28">
            <div className="text-sm text-[#6b6b80] mb-2">Duration (s)</div>
            <input className={inputClass} placeholder="240" type="number" value={duration} onChange={e => setDuration(e.target.value)} />
          </div>
        </div>

        {/* Genre */}
        <div className="mt-4">
          <div className="text-sm text-[#6b6b80] mb-2">Genre</div>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                key={g}
                type="button"           // ← prevents form submit
                onClick={() => setGenre(g)}
                className="px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: genre === g ? "var(--accent)22" : "transparent",
                  color: genre === g ? "var(--accent)" : "#6b6b80",
                  border: genre === g ? "1px solid var(--accent)55" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Cover Image */}
        <div className="mt-4">
          <div className="text-sm text-[#6b6b80] mb-2">Select Cover Image</div>
          <div onClick={() => imageRef.current.click()} className="flex items-center gap-3 border border-dashed border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:border-white/20 transition">
            {imagePreview
              ? <img src={imagePreview} className="w-10 h-10 rounded-lg object-cover" />
              : <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white"><FaImage /></div>
            }
            <span className="text-[0.82rem] text-[#bccf16] font-semibold truncate">{image ? image.name : 'Click to browse'}</span>
          </div>
          <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={e => handleImage(e.target.files[0])} />
        </div>

        {/* Audio */}
        <div className="mt-4">
          <div className="text-sm text-[#6b6b80] mb-2">Select Music File</div>
          <div onClick={() => audioRef.current.click()} className="flex items-center gap-3 border border-dashed border-white/10 rounded-xl px-4 py-3 cursor-pointer hover:border-white/20 transition">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white"><FaMusic /></div>
            <span className="text-[0.82rem] font-semibold text-[#b7d433] truncate">{audio ? audio.name : 'Click to browse'}</span>
          </div>
          <input ref={audioRef} type="file" accept="audio/*" className="hidden" onChange={e => setAudio(e.target.files[0])} />
        </div>

        <button
          disabled={!image || !audio || !name || !duration || !genre || loading}
          className="mt-8 w-full py-2.5 rounded-xl bg-[#c9f53b] text-[#0a0a0a] font-semibold text-sm tracking-wide disabled:opacity-30 hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Uploading...
            </>
          ) : "Submit"}
        </button>

      </form>
    </div>
  )
}

export default UploadSong