import axios from 'axios';
import React, { useEffect, useState,useContext} from 'react'
import { NavLink } from 'react-router-dom';
import Loader from '../../utils/Loader';



function Home() {

const [videos,setVideos]=useState([]);
const [videoOwners,setVideoOwners]=useState();

useEffect(()=>{

    axios.get('/api-v1/video/videos')
    .then((Response)=>{
      const data=Response.data;
      setVideos(data.videos);
      setVideoOwners(data.owner);
      
    })
    .catch((error)=>{
      console.log("error in video fetching:",error.message)
    })

    
},[])
 
if(videos.length<1)
    return (
      <Loader/>
    )
else
  return (    
    <div className='text-white flex flex-wrap '>
     
    {videos.map((video,index)=>{
    const time=getTime(video.createdAt)
     return <VideoBox video={video} 
     key={video._id} videoowner={videoOwners[index].ownerInfo} time={time} />

    })}
    
  </div>
  )
}

function getTime(createdAt) {
  let date = new Date(createdAt);
  const currentDate = new Date();
  const difference = currentDate - date;

  // Convert the difference to days, hours, minutes, and seconds
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  return { months, days, hours, years };
}


function VideoBox({video,videoowner,time}) {
  const { months, days, hours, years } =time;

  const handleWatchHistoryAndViews=()=>{
    axios.post("/api-v1/user/getWatchHistory",{videoId:video._id})

    axios.post("/api-v1/video/manageViews",{videoId:video._id})
  }
 
  return (
    <>
      <div className=" shadow-blue-500 shadow-md border-red-500 relative w-[75vw] md:w-[22vw]  h-64 ml-8 mb-4 md:ml-4 mr-4 rounded-md">
        <div className="h-[70%]  rounded-md">
         
           <NavLink to={`/videos/PlayVideo/${video._id}`} >
           <video onClick={handleWatchHistoryAndViews}
              src={video.videoFile}
              poster={video.thumbnail}
              
              className="h-[100%] w-[100%]"
            ></video>
           </NavLink>
        </div>
        <div className="h-[30%]  border-blue-500  rounded-b-md flex flex-col bg-zinc-500">
          <div className="relative flex  items-center ">
            <img
              src={videoowner.avatar}
              alt="Screenshot"
              className="h-8 ml-2 mt-2 rounded-full"
            />
            <p className="text-center h-12 overflow-hidden ml-4 text-blue-300 truncate">{video.title}</p>
          </div>
          <div className="flex justify-between overflow-hidden ">
            <p>{videoowner.userName}</p>
            <p>{video.views} Views</p>
            <p>
               {(() => {
                if (years > 0) {
                  return <span>{years} years</span>;
                } else if (months > 0) {
                  return <span>{months} months</span>;
                } else if (days > 0) {
                  return <span>{days} days</span>;
                } else {
                  return <span>{hours} hours</span>;
                }
              })()}   
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home
