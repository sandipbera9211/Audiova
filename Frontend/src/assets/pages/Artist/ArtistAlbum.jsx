import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify'
const ArtistAlbum = () => {
  const [preview, setPreview] = useState(null)
  const [image, setImage] = useState(null)
  const fileRef = useRef()
const [albumName, setAlbumName] = useState('')
const [description, setDescription] = useState('')
  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }


const handleCreateAlbum=(async()=>{
  
try {
  if(!description || !albumName || !image){
    toast.error("All Fields are required.");
    return;
  }
    const formData = new FormData();
  formData.append("name",albumName)
  formData.append("description",description)
  formData.append("image", image)
  console.log(formData);
  
      const res=await fetch(`${import.meta.env.VITE_API_URL}/api/album`,{
      method:"POST",
      credentials:'include',
      body:formData
    },
  );
    const data=await res.json();
    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
} catch (error) {
   toast.error(error.message)
}
  })
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-2xl border border-zinc-800">

        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-1">Create Album</h1>
        <p className="text-zinc-500 text-sm mb-8">This album will be visible to all users.</p>

        <div className="flex flex-col gap-6">

          {/* Album Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Album Name
            </label>
            <input
              type="text" value={albumName} onChange={(e)=>setAlbumName(e.target.value)}
              placeholder="e.g. Summer Highlights"
              className="bg-zinc-800 text-white text-sm placeholder-zinc-600 rounded-lg px-4 py-3 outline-none border border-transparent focus:border-indigo-500 transition duration-200"
            />
          </div>

          {/* Cover Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Cover Image
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="relative cursor-pointer rounded-xl border-2 border-dashed border-zinc-700 hover:border-indigo-500 transition duration-200 overflow-hidden bg-zinc-800 flex items-center justify-center"
              style={{ height: preview ? 'auto' : '130px' }}
            >
              {preview ? (
                <img
                  src={preview}
                  
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-zinc-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M16.5 12L12 7.5m0 0L7.5 12M12 7.5V19.5" />
                  </svg>
                  <span className="text-xs">Click to upload or drag & drop</span>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                
                onChange={handleImage}
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Description
            </label>
            <textarea
              placeholder="Write a short description..."
              rows={3} value={description} onChange={(e)=>setDescription(e.target.value)}
              className="bg-zinc-800 text-white text-sm placeholder-zinc-600 rounded-lg px-4 py-3 outline-none border border-transparent focus:border-indigo-500 transition duration-200 resize-none"
            />
          </div>

          {/* Submit */}
          <button onClick={handleCreateAlbum} className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-sm font-semibold py-3 rounded-xl transition duration-200 tracking-wide mt-1">
            Publish Album
          </button>

        </div>
      </div>
    </div>
  )
}

export default ArtistAlbum