import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { FiMusic, FiUpload, FiUser, FiDisc } from "react-icons/fi";

const Dashboard = () => {
  const user=JSON.parse(localStorage.getItem("user"))
   const [activeNav, setActiveNav] = React.useState("All Albums");

const navItems = [
  { label: "Albums", path: "artist-album", icon: <FiDisc /> },
  { label: "All Music", path: "artist-allmusic", icon: <FiMusic /> },
  { label: "Upload Song", path: "upload-song", icon: <FiUpload /> },
  { label: "Share Profile", path: "", icon: <FiUser /> },
];
const navigate=useNavigate();
  return (
<div className="grid grid-cols-1 lg:grid-cols-4  min-h-screen font-body pt-20"  style={{ background: "var(--bg)", color: "var(--text)" }}>
  <div className=" lg:col-span-1 p-3">
   
           <div 
              className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex gap-2 p-4"
              style={{ background:"rgba(255,255,255,0.028)", border: "1px solid #E8FF47", backdropFilter:"blur(20px)", boxShadow: true?`0 0 40px #E8FF47,0 16px 40px rgba(0,0,0,0.4)`:"0 8px 32px rgba(0,0,0,0.25)", transition:"transform .25s,box-shadow .25s,border-color .4s" }}
              onMouseEnter={e => { if(!true) e.currentTarget.style.boxShadow=`0 0 28px #E8FF47,0 20px 48px rgba(0,0,0,0.5)`; }}
              onMouseLeave={e => { if(!true) e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.25)"; }}>
                 <div className="flex-shrink-0 rounded-full flex items-center justify-center"
                    style={{ width:"clamp(56px,8vw,70px)", height:"clamp(56px,8vw,70px)", background:`conic-gradient(from 45deg,#E8FF47,#1a1a1a 35%,#E8FF47 65%,#1a1a1a 80%,#E8FF47)`, animation:true?"spin 5s linear infinite":"none", boxShadow:true?`0 0 28px #E8FF47`:"none", transition:"box-shadow .4s" }}>
                    <div className="rounded-full" style={{ width:"clamp(16px,2.5vw,22px)", height:"clamp(16px,2.5vw,22px)", background:"#060608", boxShadow:"0 0 0 2px rgba(255,255,255,0.06)" }}/>
                  </div>
                  <div className='font-bold mt-5'>Hi {user.userName }</div>

    </div>


<div className="h-[3px] mt-3"  
  style={{ background: "var(--accent)" }} 
/>


<div className='mt-4'>
  {
navItems.map((item,index)=>(
  <div key={index} onClick={()=>{setActiveNav(item.label); navigate(`/dashboard/${item.path}`)}}  className='px-4 py-6  mb-2 rounded-xl flex gap-3'  style={ activeNav==item.label ?{backdropFilter:"blur(10px)", background: "rgba(232,255,71,0.1)"} :{}}>
    <div className='text-2xl text-amber-300 font-bold'>{item.icon}</div>
    <div>{item.label}</div>
  </div>
))
}

</div>
</div>

  
  <div className=" lg:col-span-3">
    <Outlet/>
  </div>
</div>
  )
}

export default Dashboard
