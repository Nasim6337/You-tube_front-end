import axios from 'axios';
import React, {useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import FlashMessage from '../../../utils/FlashMessage'

import { LoginStatusContext } from '../../../utils/LoginStatusContext';
function Login() {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setpassword]=useState("");
  const [apiStatus,setApiStatus]=useState(null)
  
  const login=(e)=>{
    
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api-v1/user/login`,{
      email,
      password
    })
    .then((Response)=>{
      const data=Response.data;
      
      setApiStatus(data);
      if(data.success){
        setTimeout(()=>{navigate('/')},2000)        
      }
      
    })
    .catch((error)=>{
      setApiStatus({"success":false,"message":error.message})
    })
    
  }
  return (
 
      <div>
        <form onSubmit={login} >
      <div className='text-3xl text-cyan-500 relative text-center top-8'>Login Your Account</div>
      <div className='text-white rounded-lg shadow-md shadow-zinc-100 mt-16 md:mt-20 ml-4 mr-4 flex flex-col md:w-[40%] h-96 md:m-auto bg-zinc-800'>

      <input className='border-none bg-transparent mt-8 outline-none'  value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="email" placeholder='enter your email' />

      <input className='border-none bg-transparent mt-8 outline-none' value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" name="password" id="password" placeholder='enter your password' />

      <input className='border-none bg-blue-500 w-[20%] h-10 rounded-md text-xl ml-auto mr-auto mt-8 outline-none cursor-pointer'  type="submit" value="Login" />

      <div className='text-red-500 mt-8 text-2xl'><NavLink to={{pathname: "/user/Register"}}>Register here...</NavLink></div>
      {apiStatus && <FlashMessage success={apiStatus.success} message={apiStatus.message}/>}
    </div>
  </form>
    </div>
  
  )
}

export default Login
