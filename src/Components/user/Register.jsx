
import React, { useState } from 'react'
import FlashMessage from '../../../utils/FlashMessage'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate=useNavigate();
  const [userName,setUserName]=useState('');
  const [fullName,setFullName]=useState('');
   const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [avatar,setAvatar]=useState(null);
  const [coverImage,setCoverImage]=useState(null);
  
  const [apiStatus,setApiStatus]=useState(null)

  const formData = new FormData(); 
  formData.append('userName', userName);
   formData.append('fullName', fullName);
    formData.append('email', email); 
    formData.append('password', password); 
    if (avatar) { formData.append('avatar', avatar); }
     if (coverImage) { formData.append('coverImage', coverImage); }

    const register=(e)=>{
    e.preventDefault();
    
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api-v1/user/register`,formData,{
      headers: 
      { 'Content-Type': 'multipart/form-data', },
    })
    .then((Response)=>{
      const data=Response.data;
      
      setApiStatus(data);
      if(data.success){
        setTimeout(()=>{navigate('/user/login')},1000)
        
      }
    })
    .catch((error)=>{
      setApiStatus({"success":false,"message":error.message})
    })
  }
  return (
    <div>
       <form onSubmit={register}>
            <div className='text-3xl text-cyan-500 relative text-center top-8'>Register Your Account</div>
            <div className='text-white rounded-lg shadow-md shadow-zinc-100 mt-16 md:mt-20 ml-4 mr-4 flex flex-col md:w-[40%] h-[480px] md:m-auto bg-zinc-800'>
                
                <input 
                    className='border-none bg-transparent mt-8 outline-none'  
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    type="text" 
                    name="fullName" 
                    placeholder='Enter your full name' 
                />

                <input 
                    className='border-none bg-transparent mt-8 outline-none'  
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    type="text" 
                    name="userName" 
                    placeholder='Enter your user name' 
                />

                <input 
                    className='border-none bg-transparent mt-8 outline-none'  
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    name="email" 
                    placeholder='Enter your email' 
                />

                <input 
                    className='border-none bg-transparent mt-8 outline-none' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    name="password" 
                    placeholder='Enter your password' 
                />

                <div className='mt-8 text-blue-500'>
                    <label htmlFor="avatar">Upload avatar:</label>
                    <input 
                        className='cursor-pointer rounded-md' 
                        type="file" 
                        name='avatar' 
                        id='avatar' 
                        onChange={(e) => setAvatar(e.target.files[0])} 
                        capture 
                    />
                </div>

                <div className='mt-8 text-blue-500'>
                    <label htmlFor="coverImage">Upload cover image:</label>
                    <input 
                        type="file" 
                        name='coverImage' 
                        id='coverImage' 
                        onChange={(e) => setCoverImage(e.target.files[0])} 
                        capture 
                    />
                </div>

                <input 
                    className='border-none bg-blue-500 w-[20%] h-10 rounded-md text-xl ml-auto mr-auto mt-8 outline-none cursor-pointer'  
                    type="submit" 
                    value="Register" 
                />
               {apiStatus && <FlashMessage success={apiStatus.success} message={apiStatus.message}/>}
            </div>
        </form>
    </div>
  )
}

export default Register
