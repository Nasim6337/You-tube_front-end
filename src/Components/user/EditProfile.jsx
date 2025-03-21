import axios from "axios";
import React, { useState } from "react";
import FlashMessage from "../../../utils/FlashMessage";
const baseurl=import.meta.env.VITE_API_BASE_URL;
function EditProfile() {
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [userName, setUserName] = useState("");
  const [apiStatus, setApiStatus] = useState(null);
  const formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("coverImage", coverImage);
  formData.append("userName", userName);
  const updateProfile = (e) => {
    e.preventDefault();
    axios
      .patch(`${baseurl}/api-v1/user/editProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        console.log("profile edited:", Response.data);
        setApiStatus(Response.data);
      })
      .catch((error) => {
        console.log("error in profile edititng:", error.response.data);
        setApiStatus(error.response.data);
      });
  };

  return (
    <div>
      <form onSubmit={updateProfile}>
        <div className="text-3xl text-cyan-500 relative text-center top-8">
          Edit Your Profile
        </div>
        <div className="text-white rounded-lg shadow-md shadow-zinc-100 mt-16 md:mt-20 ml-4 mr-4 flex flex-col md:w-[40%] h-[380px] md:m-auto bg-zinc-800">
          <input
            className="border-none bg-transparent mt-8 outline-none"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            name="userName"
            placeholder="Enter your user name"
          />

          <div className="mt-8 text-blue-500">
            <label htmlFor="avatar">Upload avatar:</label>
            <input
              className="cursor-pointer rounded-md"
              type="file"
              name="avatar"
              id="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              capture
            />
          </div>

          <div className="mt-8 text-blue-500">
            <label htmlFor="coverImage">Upload cover image:</label>
            <input
              type="file"
              name="coverImage"
              id="coverImage"
              onChange={(e) => setCoverImage(e.target.files[0])}
              capture
            />
          </div>
          <input
            className="border-none bg-blue-500 w-[20%] h-10 rounded-md text-xl ml-auto mr-auto mt-8 outline-none cursor-pointer"
            type="submit"
            value="Update"
          />
          {apiStatus && (
            <FlashMessage
              success={apiStatus.status}
              message={apiStatus.message}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
