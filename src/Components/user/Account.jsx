import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "boxicons";
import axios from "axios";
import Setting from "../Setting";

const deleteVideo=(videoId)=>{
  axios.post('/api-v1/video/deleteVideo',{videoId})
  .then((Response)=>{
  })
  .catch((error)=>{
    console.log(error.response.data)
  })
}

function Account() {
  const [historyVideos, setHistoryVideos] = useState(null);
  const [myVideos, setMyVideos] = useState([]);
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState(null);
  const [subscribers, setSubscribers] = useState(0);
  const [subscribed, setSubscribed] = useState(0);
  const [viewEdit, setViewEdit] = useState(false);
  useEffect(() => {
    //fetching user details
    axios
      .get("/api-v1/user/getUser")
      .then((Response) => {
        const data = Response.data;
        if (data.status) {
          setStatus(true);
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.log("error in user fetching:", error.message);
      });

    //fetching watch history videos
    axios
      .get("/api-v1/user/getWatchHistoryVideo")
      .then((Response) => {
        setHistoryVideos(Response.data.HistoryVideo);
      })
      .catch((error) => {
        console.log("error in fetching history videos:", error.message);
      });

    //fetching my videos

   

    // subscribed fetching call
    axios
      .get("/api-v1/user/getsubscribed")
      .then((Response) => {
        setSubscribed(Response.data);
      })
      .catch((error) => {
        console.log(
          "error in subscribed fetching within account components:",
          error.message
        );
      });
  }, []);

useEffect(()=>{
  axios
  .get("/api-v1/video/myVideos")
  .then((Response) => {
    setMyVideos(Response.data.videos);
  })
  .catch((error) => {
    console.log("error in fetching my videos:", error.message);
  });
},[deleteVideo,myVideos])

  useEffect(() => {
    if (myVideos?.length > 0) {
      axios
        .post("/api-v1/user/getSubscribers", {
          videoId: myVideos[0]._id,
        })
        .then((Response) => {
          setSubscribers(Response.data);
        })
        .catch((error) => {
          console.log(
            "error in subscriber fetching within account components:",
            error.message
          );
        });
    }
  }, [myVideos]);

  if (!status) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-white text-2xl">
        You have not logged in
      </div>
    );
  } else {
    return (
      <div className="text-white ">
        <div className="flex justify-end mt-2 cursor-pointer pr-4 text-red-500 font-bold  ">
          Setting &nbsp;{" "}
          <span onClick={() => setViewEdit(!viewEdit)}>
            <box-icon name="cog" type="solid" color="#ffffff"></box-icon>
          </span>{" "}
        </div>
        {viewEdit ? <Setting /> : ""}
        <div className="flex  md:h-[130vh] h-[150vh] flex-col">
          <div className=" flex justify-center flex-col items-center">
            <img
              src={user.avatar}
              alt="logo"
              className="w-24 h-24 mt-2 relative rounded-full border-2 border-cyan-500 border-2"
            />
            <p>{user.fullName}</p>
            <p>{user.userName}</p>
            <p>
              {subscribers.totalSubscriber} Subscribers &nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; {subscribed.totalsubscribed}{" "}
              subscribed{" "}
            </p>
          </div>
          {/* your videos sections */}

          <h1 className="text-center text-2xl mt-4">Your Videos</h1>

          <div className="border-[1px] rounded-md border-zinc-700 box-shadow h-full flex flex-wrap overflow-scroll md:p-4 ">
            {myVideos?.length ? (
              myVideos.map((video, index) => {
                return <MyVideos key={video._id} video={video} />;
              })
            ) : (
              <p className="text-zinc-300">You have not any Videos.</p>
            )}
          </div>

          <h1 className="text-center text-2xl mt-4">Your History</h1>
          {/* //watchHistory videos */}
          <div className="border-[1px] rounded-md border-zinc-700 box-shadow h-full flex flex-wrap overflow-hidden p-4 ">
            {historyVideos?.length ? (
              historyVideos.map((historyVideo, index) => (
                <HistoryVideos
                  historyVideo={historyVideo}
                  key={historyVideo._id || index}
                />
              ))
            ) : (
              <p className="text-zinc-300">No videos in history.</p>
            )}
          </div>
          <NavLink
            to="/user/your-account/watchHistory"
            className={() =>
              `m-auto text-center rounded-lg font-bold text-[1.1rem] w-24 shadow-sm  shadow-zinc-700 `
            }
          >
            See More{" "}
          </NavLink>
        </div>
      </div>
    );
  }
}

function HistoryVideos({ historyVideo }) {
  const [owner, setOwner] = useState([]);
  useEffect(() => {
    axios
      .post("/api-v1/video/getVideoDetail", {
        videoid: historyVideo.watchHistory._id,
      })
      .then((Response) => {
        const data = Response.data;
        setOwner(data.video.owner);
      })
      .catch((error) => {
        console.log("error in video detail fetching:", error.message);
      });
  }, []);

  return (
    <>
      <div className=" shadow-blue-500 shadow-md border-red-500 relative w-[40vw] md:w-[20vw]  h-56 md:h-64 h-32 ml-2  md:ml-8 mb-4 md:ml-4 md:mr-4 rounded-md">
        <div className="h-[70%]  rounded-md">
          <NavLink to={`/videos/PlayVideo/${historyVideo.watchHistory._id}`}>
            <video
              src={historyVideo.watchHistory.videoFile}
              poster={historyVideo.watchHistory.thumbnail}
              controls
              className="h-[100%] w-[100%]"
            ></video>
          </NavLink>
        </div>
        <div className="h-[30%]  border-blue-500  rounded-b-md flex flex-col bg-zinc-500">
          <div className="relative flex  items-center ">
            <img
              src={owner.avatar}
              alt="avatar"
              className="h-8 ml-2 mt-2 w-10 h-10 rounded-full"
            />
            <span className="text-center ml-4 ">
              {historyVideo.watchHistory.title}
            </span>
          </div>
          <div className="flex justify-between overflow-hidden ">
            <p>{owner.userName}</p>
            <p>{historyVideo.watchHistory.views} Views</p>
          </div>
        </div>
      </div>
    </>
  );
}

function MyVideos({ video }) {

 const [isclicked,setIsClicked]=useState(false);


 
  return (
    <>
      <div
        className=" shadow-blue-500 shadow-md border-red-500 relative w-[80vw] md:w-[20vw]  
    h-64   m-auto   mb-4 md:ml-4 md:mr-4 rounded-md"
      >
        <div className="h-[70%]  rounded-md">
          <NavLink to={`/videos/PlayVideo/${video._id}`}>
            <video
           
              src={video.videoFile}
              poster={video.thumbnail}
              controls
              className="h-[100%] w-[100%] "
            ></video>
          </NavLink>
        {/* Dynamic Message Poster */}
        {isclicked && (
            <div
              className="absolute bg-black/70 text-white p-3 rounded-lg flex flex-col gap-2 z-10"
              style={{
                top: `${100}px`,
                left: `${25}px`,
               
              }}
            >
              <NavLink to={`/video/editVideo/${video._id}`} className={()=>`bg-blue-500 px-4 py-2 rounded hover:bg-blue-600`}>Edit Video</NavLink>

              <button
                onClick={()=>deleteVideo(video._id)}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Video
              </button>
            </div>
          )}

        </div>
        <div className="  h-[30%]   border-blue-500  rounded-b-md flex flex-col bg-zinc-500">
          <div className="relative flex  items-center ">
          <span onClick={()=>setIsClicked(!isclicked)} className="text-2xl transform rotate-90
          ml-2 font-bold relative  cursor-pointer text-blue-300">&hellip;</span>
            <img
              src={video.owner.avatar}
              alt="avatar"
              className="h-8 ml-2 mt-2 w-10 h-10 rounded-full"
            />
            <span className="text-center ml-4 ">{video.title}</span>
            
          </div>
          <div className="flex justify-between overflow-hidden ">
            <p>{video.owner.userName}</p>
            <p> {video.views} Views</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Account;
