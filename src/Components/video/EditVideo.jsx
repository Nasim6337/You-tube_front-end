import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FlashMessage from "../../../utils/FlashMessage";

function EditVideo() {
  const { videoId } = useParams();
  const [video, setVideo] = useState([]);
  const [descriptions, setDescriptions] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setthumbnail] = useState("");

  const [apiStatus,setApiStatus]=useState(null)

  const formData=new FormData();
  formData.append('title',title);
  formData.append('descriptions',descriptions);
  formData.append('thumbnail',thumbnail);
  formData.append('videoId',videoId)
  useEffect(() => {
    //video detail query
    axios
      .post("/api-v1/video/getVideoDetail", { videoid: videoId })
      .then((Response) => {
        const data = Response.data;
       
        setVideo(data.video);
        setTitle(data.video.title);
        setDescriptions(data.video.descriptions);
      })
      .catch((error) => {
        console.log("error in video detail fetching:", error.message);
      });
  },[]);

  const update=(e)=>{
    e.preventDefault();
    axios.patch('/api-v1/video/editVideoDetails',formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    .then((Response)=>{
        setApiStatus(Response.data);
    })
    .catch((error)=>{
        setApiStatus(error.response.data)
    })
  }
  return (
  <>
  
  <form onSubmit={update} >
          <div className="text-3xl text-cyan-500 relative text-center top-8">
            Edit Your Video
          </div>
          <div className="text-white rounded-lg shadow-md shadow-zinc-100 mt-16 md:mt-20 ml-4 mr-4 flex flex-col md:w-[40%] h-[300px] md:m-auto bg-zinc-800">
            <input
              className="border-none bg-transparent mt-8 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Enter your Video title"
            />
  
            <input
              className="border-none bg-transparent mt-8 outline-none"
              value={descriptions}
              onChange={(e) => setDescriptions(e.target.value)}
              type="text"
              name="descriptions"
              placeholder="Enter your video descriptions"
            />
  
          
  
  
            <div className="mt-8 text-blue-500">
              <label htmlFor="thumbnail">Upload thumbnail:</label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                onChange={(e) => setthumbnail(e.target.files[0])}
                capture
              />
            </div>
  
            <input
              className="border-none bg-blue-500 w-[20%] h-10 rounded-md text-xl ml-auto mr-auto mt-8 outline-none cursor-pointer"
              type="submit"
              value="Save"
            />
  
          
            {apiStatus && (
              <FlashMessage
                success={apiStatus.success}
                message={apiStatus.message}
              />
            )}
          </div>
        </form>
  </>
  );
}

export default EditVideo;
