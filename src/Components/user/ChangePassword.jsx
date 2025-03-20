
import axios from 'axios';
import React, { useState } from 'react'
import FlashMessage from '../../../utils/FlashMessage';
import { useNavigate } from 'react-router-dom';


function ChangePassword() {
    const navigate=useNavigate();
    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [apiStatus,setApiStatus]=useState(null)

    const changepassword=(e)=>{
        e.preventDefault();
        axios.patch('/api-v1/user/changePassword',{oldPassword,newPassword})
        .then((Response)=>{
            setApiStatus(Response.data);
            if(Response.data.status)
            {
                setTimeout(()=>navigate('/user/your-account'),2000)
            }
        })
        .catch((error)=>{
            setApiStatus(error.response.data)
        })
    }
  return (
    <div>
    <form onSubmit={changepassword} >
  <div className='text-3xl text-cyan-500 relative text-center top-8'>Change Your Password</div>
  <div className='text-white rounded-lg shadow-md shadow-zinc-100 mt-16 md:mt-20 ml-4 mr-4 flex flex-col md:w-[40%] h-96 md:m-auto bg-zinc-800'>

  <input className='border-none bg-transparent mt-8 outline-none' value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} type="password" name="oldPassword" id="oldpassword" placeholder='enter your current password' />

  <input className='border-none bg-transparent mt-8 outline-none' value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} type="password" name="newPassword" id="NewPassword" placeholder='enter your New password' />



  <input className='border-none bg-blue-500 w-[20%] h-10 rounded-md text-xl ml-auto mr-auto mt-8 outline-none cursor-pointer'  type="submit" value="Change" />

  {apiStatus && <FlashMessage success={apiStatus.status} message={apiStatus.message}/>}
</div>
</form>
</div>
  )
}

export default ChangePassword
