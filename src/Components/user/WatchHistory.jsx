import React,{useContext,useEffect,useState} from "react";
import axios from "axios";
const baseurl=import.meta.env.VITE_API_BASE_URL;

function WatchHistory() {
  const [historyVideos,setHistoryVideos]=useState(null)

  useEffect(()=>{
    axios.get(`${baseurl}/api-v1/user/getUser`)
    .then((Response)=>{
      const data=Response.data;
      if(data.status){
        setStatus(true)
        setUser(data.user)
      }
    })
    .catch((error)=>{
      console.log("error in user fetching:",error.message);
    })

    axios.get(`${baseurl}/api-v1/user/getWatchHistoryVideo`)
    .then((Response)=>{
      setHistoryVideos(Response.data.HistoryVideo)
    })
    .catch((error)=>{
      console.log("error in fetching history videos:",error.message)
    })
},[])
  console.log("check context:",historyVideos)
  return (
    <div className=" flex flex-wrap relative">
     {

      historyVideos?.map((historyVideo,index)=>{
        return <Watchhistory key={historyVideo.watchHistory._id} historyVideo={historyVideo} />
      })

     }
    </div>
  );
}

function Watchhistory({historyVideo}) {

  const [owner,setOwner]=useState([]);
  useEffect(()=>{
    axios.post(`${baseurl}/api-v1/video/getVideoDetail`,{videoid:historyVideo.watchHistory._id})
    .then((Response)=>{
      const data=Response.data;
      setOwner(data.video.owner);
    })
    .catch((error)=>{
      console.log("error in video detail fetching:",error.message)
    })
  },[]);
  return (
    <div className="flex flex-row md:flex-col text-white md:m-4 m-auto mt-4 w-[95vw] md:w-[20vw]  md:h-[40vh]  shadow-blue-500 shadow-md border-red-500">

      <div className=" text-white basis-1/2  md:w-[20vw] md:h-[40vh]">
        <video src={historyVideo.watchHistory.videoFile} controls></video>
      </div>

      <div className="md:h-[30%] basis-1/2 border-blue-500  rounded-b-md flex flex-col bg-zinc-500">
        <div className="relative flex  items-center ">
          <img src={owner.avatar} alt="avatar" className="h-8 ml-2 mt-2 w-10 h-10 rounded-full" />
          <p className="text-center ml-4 ">{historyVideo.watchHistory.title}</p>
        </div>
        <div className="flex justify-between overflow-hidden ">
          <p>{owner.userName}</p>
          <p>{historyVideo.watchHistory.views} Views</p>
        </div>
      </div>
    </div>
  );
}

export default WatchHistory;
