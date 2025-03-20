import React, { useContext, useEffect, useState } from "react";
import FlashMessage from "../../../utils/FlashMessage";
import axios from "axios";
import Loader from "../../../utils/Loader";


function Profile() {
   const [status, setStatus] = useState(false);
  const [isLoading,setIsLoadng]=useState(false);
  const [descriptions, setdescriptions] = useState("");
  const [title, settitle] = useState("");
  const [videoFile, setvideoFile] = useState(null);
  const [thumbnail, setthumbnail] = useState(null);

  const [apiStatus, setApiStatus] = useState(null);

  const formData = new FormData();
  formData.append("descriptions", descriptions);
  formData.append("title", title);
  if (videoFile) {
    formData.append("videoFile", videoFile);
  }
  if (thumbnail) {
    formData.append("thumbnail", thumbnail);
  }

useEffect(()=>{
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
})

  const upload = (e) => {
    setIsLoadng(true);
    e.preventDefault();
    axios
      .post("/api-v1/video/uploadVideo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((Response) => {
        console.log(Response.data);
        setApiStatus(Response.data);
        
      })
      .catch((error) => {
        console.log("error in video uloading:", error.response.data.message);
        setApiStatus(error.response.data);
      })
      .finally(()=>{
        setIsLoadng(false)
      })

  };

  
  if(!status){
    return(
      <div className="h-screen w-screen flex items-center justify-center text-white text-2xl">
      You have not logged in
    </div>
    )
  }
  else{
    return (
      <div>
        {/* loader initialization */}

        {isLoading && <Loader />}
        <form onSubmit={upload}>
          <div className="text-3xl text-cyan-500 relative text-center top-8">
            upload your Video
          </div>
          <div className="text-white rounded-lg shadow-md shadow-zinc-100 mt-16 md:mt-20 ml-4 mr-4 flex flex-col md:w-[40%] h-[480px] md:m-auto bg-zinc-800">
            <input
              className="border-none bg-transparent mt-8 outline-none"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Enter your Video title"
            />
  
            <input
              className="border-none bg-transparent mt-8 outline-none"
              value={descriptions}
              onChange={(e) => setdescriptions(e.target.value)}
              type="text"
              name="descriptions"
              placeholder="Enter your video descriptions"
            />
  
            <div className="mt-8 text-blue-500">
              <label htmlFor="videoFile">Upload videoFile:</label>
              <input
                className="cursor-pointer rounded-md"
                type="file"
                name="videoFile"
                id="videoFile"
                onChange={(e) => setvideoFile(e.target.files[0])}
                capture
              />
            </div>
  
  
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
              value="Upload"
            />
  
          
            {apiStatus && (
              <FlashMessage
                success={apiStatus.success}
                message={apiStatus.message}
              />
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Profile;
