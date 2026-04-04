import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md"
import { MdAddCircleOutline } from "react-icons/md"
const ArtistAllMusic = () => {
  const [musicData, setMusicData] = useState([])
  const [albums, setAlbums] = useState([])
  const [showAlbumFor, setShowAlbumFor] = useState(null) // stores songId

  const handleAllAlbum = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/album/artistalbum`, {
        credentials: "include"
      })
      const data = await res.json()
      if (data.success) {
        setAlbums(data.albumall)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAddToAlbum = async (albumId, songId) => {
    try {
     
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/album/${albumId}/song/${songId}`, {
        method: "POST",
        credentials: "include"
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Song added to album!")
        setShowAlbumFor(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAllMusic = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null")
      if (!user) { toast.error("Log In as An Artist First"); return }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/music/artistsong/${user._id}`, {
        credentials: "include"
      })
      const data = await res.json()
      if (data.success) setMusicData(data.allsong)
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDeleteSong = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/music/delete-song/${id}`, {
        credentials: "include",
        method: "DELETE"
      })
      const data = await res.json()
      if (data.success) { toast.success(data.message); handleAllMusic() }
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    handleAllMusic()
    handleAllAlbum() 
  }, [])

  return (
    <div className='pt-4 flex flex-col gap-1'>
      {musicData.map((item, index) => (
        <div
          key={item._id ?? index}
          className='relative flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer group'
          style={{ background: "transparent", border: "1px solid transparent" }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--bg-card)"
            e.currentTarget.style.borderColor = "var(--border)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.borderColor = "transparent"
          }}
        >
          <span className='text-xs w-5 text-center shrink-0' style={{ color: "var(--text-muted)" }}>
            {index + 1}
          </span>

          <div className='w-10 h-10 rounded-lg shrink-0 overflow-hidden' style={{ background: "var(--bg-hover)" }}>
            {item.image
              ? <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
              : <div className='w-full h-full flex items-center justify-center text-xs' style={{ color: "var(--text-muted)" }}>♪</div>
            }
          </div>

          <div className='flex flex-col min-w-0 flex-1'>
            <span className='text-sm font-medium truncate' style={{ color: "var(--text)" }}>{item.name}</span>
            {item.artist && (
              <span className='text-xs truncate' style={{ color: "var(--text-muted)" }}>{item.artist}</span>
            )}
          </div>

          <div className='flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
            <button
              className='text-2xl hover:text-red-500 transition-colors duration-200'
              onClick={(e) => { e.stopPropagation(); handleDeleteSong(item._id) }}
              title="Delete song"
            >
              <MdDelete />
            </button>

            {/* Album picker */}
            <div className='relative'>
              <button
                className='text-2xl hover:text-green-400 transition-colors duration-200'
                style={{ color: "var(--text-muted)" }}
                title="Add to Album"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowAlbumFor(showAlbumFor === item._id ? null : item._id)
                }}
              >
                <MdAddCircleOutline />
              </button>

              {/* Dropdown */}
              {showAlbumFor === item._id && (
                <div
                  className='absolute right-0 bottom-8 z-50 rounded-xl shadow-lg py-1 min-w-40'
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  {albums.length === 0
                    ? <p className='text-xs px-3 py-2' style={{ color: "var(--text-muted)" }}>No albums found</p>
                    : albums.map(album => (
                      <button
                        key={album._id}
                        className='w-full text-left text-sm px-3 py-2 hover:bg-white/10 transition-colors'
                        style={{ color: "var(--text)" }}
                        onClick={(e) => { e.stopPropagation(); handleAddToAlbum(album._id, item._id) }}
                      >
                        {album.name}
                      </button>
                    ))
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArtistAllMusic