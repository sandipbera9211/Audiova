
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const avatar = user?.image;
  const name = user?.name || user?.userName || "U";
  const isArtist = user?.role === "artist";
  const navigate = useNavigate();

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [form, setForm] = useState({
    artistName: "", instagram: "", facebook: "", twitter: "", bio: ""
  });

  const [password, setPassword] = useState("");

  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleLogOut=async()=>{
  try {
      const res=await fetch(`${import.meta.env.VITE_API_URL}/api/authentication/logout`,{
      method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
     
        credentials: "include",  
    })
     const data = await res.json();
    if(data.success){
      toast.success(data.message);
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("userUpdated")); 
      navigate('/')
      return;
    }
       toast.error(data.message);
  } catch (error) {
     toast.error(error);
  }
  }

  const handleDelete =async () => {
  try {
    const ans=JSON.parse(localStorage.getItem("user") || "null")
    console.log("Sending:", {
  email: ans?.email,
  password: password
});

   const res= await fetch(`${import.meta.env.VITE_API_URL}/api/authentication/delete-user`,{
        method:"DELETE",
          headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
       body:JSON.stringify({
        email: ans?.email,
        password
       })
      })
      const data= await res.json();
      if(data.success){
        toast.success(data.message);
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("userUpdated"))
        navigate('/');
      }else{
         toast.error(data.message);
      }    
  } catch (error) {
     toast.error(error);
  }
  };

  

const handleArtist=async()=>{
  try {
       const socialLinks = [
      form.instagram && { platform: "instagram", url: form.instagram },
      form.facebook  && { platform: "facebook",  url: form.facebook  },
      form.twitter   && { platform: "twitter",   url: form.twitter   },
    ].filter(Boolean);
       const res= await fetch(`${import.meta.env.VITE_API_URL}/api/artist/`,{
        method:"POST",
          headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
       body:JSON.stringify({
        name:form.artistName,
        bio:form.bio,
        image:       user?.image || "",
        socialLinks, 
       })
      })
      const data=await res.json();
      if(data.success){
            toast.success(data.message);
            localStorage.setItem("user",JSON.stringify(data.user));
            window.dispatchEvent(new Event("userUpdated"))
            navigate('/')
      }else{
         toast.error(data.message);
      }
  } catch (error) {
     toast.error(error);
  }
}

  return (
    <div
      className="min-h-screen px-4 pt-24 pb-16 flex flex-col items-center"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="w-full max-w-xl flex flex-col gap-6">

        {/* Avatar + Info */}
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 lg:w-24 lg:h-24 shrink-0
              flex items-center justify-center
              font-bold text-2xl lg:text-3xl font-[Poppins]
              rounded-full backdrop-blur-md overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1.5px solid var(--accent)",
              color: "var(--accent)",
              boxShadow: "0 0 20px var(--accent)33",
            }}
          >
            {avatar
              ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
              : name?.[0]?.toUpperCase()
            }
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-xl font-semibold font-[Poppins]">Hi, {name}</p>
            <p className="text-sm" style={{ color: "var(--text-sub)" }}>{user?.email}</p>
            {isArtist && (
              <span
                className="mt-1 text-xs px-2 py-0.5 rounded-full w-fit font-medium"
                style={{
                  background: "var(--accent)22",
                  color: "var(--accent)",
                  border: "1px solid var(--accent)55",
                }}
              >
                Artist
              </span>
            )}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="flex gap-3">
          <button
            onClick={() => { setLogoutOpen(!logoutOpen); setDeleteOpen(false); }}
            className="px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-white/10"
            style={{
              color: "var(--text)",
              border: "1px solid var(--border)",
              background: logoutOpen ? "rgba(255,255,255,0.08)" : "transparent"
            }}
          >
            Log Out
          </button>
          <button
            onClick={() => { setDeleteOpen(!deleteOpen); setLogoutOpen(false); }}
            className="px-4 py-2 rounded-lg text-sm font-medium transition"
            style={{
              border: "1px solid rgba(255,107,107,0.4)",
              color: "var(--coral)",
              background: deleteOpen ? "rgba(255,107,107,0.08)" : "transparent"
            }}
          >
            Delete Account
          </button>
        </div>

        {/* ── Logout Confirm ── */}
        {logoutOpen && (
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Enter your password to confirm"
              value={password}
              onChange={e => setPassword(e.target.value)} 
              className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
              onFocus={e => e.currentTarget.style.borderColor = "var(--accent)"}
              onBlur={e  => e.currentTarget.style.borderColor = "var(--border)"}
            />
            <button
              onClick={handleLogOut}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition"
              style={{ background: "var(--accent)", color: "#000", border: "none" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Confirm
            </button>
          </div>
        )}

        {/* ── Delete Confirm ── */}
        {deleteOpen && (
          <div className="flex gap-2">
            <input
              type="password" required
              placeholder="Enter your password to delete"
              value={password}
              onChange={e => setPassword(e.target.value)} 
              className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,107,107,0.4)",
                color: "var(--text)",
              }}
              onFocus={e => e.currentTarget.style.borderColor = "var(--coral)"}
              onBlur={e  => e.currentTarget.style.borderColor = "rgba(255,107,107,0.4)"}
            />
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition"
              style={{ background: "var(--coral)", color: "#000", border: "none" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"} 
            >
              Confirm
            </button>
          </div>
        )}

        <div style={{ borderTop: "1px solid var(--border)" }} />

        {/* ── Become Artist Form ── */}
        {!isArtist && (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold font-[Poppins]"
              style={{ color: "var(--accent)" }}>
              Become an Artist
            </p>

            {[
              { label: "Artist Name", name: "artistName", placeholder: "Your stage name" },
              { label: "Instagram",   name: "instagram",  placeholder: "@handle" },
              { label: "Facebook",    name: "facebook",   placeholder: "facebook.com/yourpage" },
              { label: "Twitter",     name: "twitter",    placeholder: "@handle" },
            ].map(({ label, name: fieldName, placeholder }) => (
              <div key={fieldName} className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide"
                  style={{ color: "var(--text-muted)" }}>{label}</label>
                <input
                  type="text"
                  name={fieldName}
                  value={form[fieldName]}
                  onChange={handleFormChange}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "var(--accent)"}
                  onBlur={e  => e.currentTarget.style.borderColor = "var(--border)"}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wide"
                style={{ color: "var(--text-muted)" }}>Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleFormChange}
                placeholder="Tell us about yourself..."
                rows={4}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
                onFocus={e => e.currentTarget.style.borderColor = "var(--accent)"}
                onBlur={e  => e.currentTarget.style.borderColor = "var(--border)"}
              />
            </div>

            <button
              className="w-full py-2.5 rounded-lg text-sm font-semibold transition hover:opacity-85"
              style={{ background: "var(--accent)", color: "#000" }} onClick={handleArtist}
            >
              Submit
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;