import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "boxicons";
import Comment from "./Comment";
const baseurl=import.meta.env.VITE_API_BASE_URL;

function PlayVideo() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [subscribedStatus, setSubscribedStatus] = useState(false);
  const [subscribers, setSubscribers] = useState(0);

  

  useEffect(() => {
    // Fetch video details
    axios
      .post(`${baseurl}/api-v1/video/getVideoDetail`, { videoid: videoId })
      .then((response) => {
        setVideo(response.data.video);
      })
      .catch((error) => {
        console.error("Error fetching video details:", error.message);
      });

    // Check subscription status
    axios
      .post(`${baseurl}/api-v1/user/manageSubscriptions`, { videoId, status: false })
      .then((response) => {
        setSubscribedStatus(response.data.status);
      })
      .catch((error) => {
        console.error("Error fetching subscription status:", error.message);
      });

    // Fetch subscriber count
    axios
      .post(`${baseurl}/api-v1/user/getSubscribers`, { videoId })
      .then((response) => {
        setSubscribers(response.data.totalSubscriber || 0);
      })
      .catch((error) => {
        console.error("Error fetching subscriber count:", error.message);
      });
  }, [videoId]);

  const handleSubscribe = () => {
    axios
      .post(`${baseurl}/api-v1/user/manageSubscriptions`, { videoId, status: true })
      .then((response) => {
        setSubscribedStatus(response.data.status);
        
      })
      .catch((error) => {
        console.error("Error updating subscription status:", error.message);
      });
  };

  if (!video) {
    return <div className="text-center text-white text-xl">Loading...</div>
  }

  return (
  <>

<div className="flex  flex-col items-center px-4 md:px-10 lg:px-20 text-white">
      {/* Video Player */}
      <div className="w-full md:w-[40vw] aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        <video controls src={video.videoFile} className="w-full h-full" />
      </div>

      {/* Video Info */}
      <div className="w-full md:w-[40vw] mt-2">
        <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>{video.views} views</span>
          <span>Creation Date &nbsp;{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Channel Info */}
      <div className="w-full md:w-[40vw]  flex justify-between items-center mt-6 border-t border-gray-600 pt-2">
        <div className="flex items-center gap-4">
          <img
            src={video.owner?.avatar}
            alt="Channel Avatar"
            className="w-12 h-12 rounded-full border border-gray-500"
          />
          <div>
            <h2 className="text-lg font-medium text-white">{video.owner?.userName}</h2>
            <p className="text-sm text-gray-400">{subscribers} subscribers</p>
          </div>
          
        </div>

       
        <button
          onClick={handleSubscribe}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-md ${
            subscribedStatus
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
          disabled={subscribedStatus}
        >
          {subscribedStatus ? "SUBSCRIBED" : "SUBSCRIBE"}
        </button>
      </div>

      {/* Video Description */}
      <div className="w-full md:w-[40vw] mt-6 text-gray-300">
        <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
        <p className="leading-relaxed truncate">{video.descriptions} </p>
      </div>
    </div>

         
    {/* video comments */}

   <Comment video={video} videoId={videoId}/>
  </>
  );
}

export default PlayVideo;