import React,{ useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
const baseurl=import.meta.env.VITE_API_BASE_URL;
function Header() {

  const [userLoggedIn, setUserLoggedIn]=useState();
  const [userAvatar,setUserAvatar]=useState([])
  const navigate=useNavigate();

  useEffect(()=>{
    axios.get(`${baseurl}/api-v1/user/getUser`)
    .then((Response)=>{
      setUserAvatar(Response.data.user)
    })
  },[])



  const logout=()=>{
    axios.post(`${baseurl}/api-v1/user/logout`,{})
    .then((Response)=>{
      const data=Response.data;
      if(data.success){
        setUserLoggedIn(false);
        navigate('/user/login');
      }
    })
  }

    useEffect(()=>{
      const myCookies=Cookies.get('token');
      (myCookies?setUserLoggedIn(true):setUserLoggedIn(false))
     
      
  },[logout])
  return (
    <div className='flex bg-zinc-700 h-[5vh]'>
    <div className='text-orange-700 md:basis-1/4 text-[1.1rem] md:text-2xl ' >Youtube Clone</div>
    <div className='flex basis-2/3 text-white relative right-0 justify-evenly md:text-xl'>
      <div>
          <NavLink  to="/"   className={({isActive})=>`${isActive ?"text-red-500" : "text-white"}`} >Home</NavLink>
      </div>
      <div>
          <NavLink to="/user/your-account"  className={({isActive})=>`${isActive ?"text-red-500" : "text-white"}`} >Your Account</NavLink>
      </div>
     
      <div>
          <NavLink to="/user/uploadVideo"  className={({isActive})=>`${isActive ?"text-red-500" : "text-white"}`} ><box-icon name='cloud-upload' type='solid' color='#ffffff' ></box-icon></NavLink>
      </div>


      <div>
      {userLoggedIn
       ?<button className='text-red-500' onClick={logout}>LogOut</button>
      : <NavLink to="/user/Login" className={({ isActive }) => `${isActive ? "text-red-500" : "text-white"}`}>Login</NavLink>}
      </div>
      <div className='rounded-full bg-red-500'>
          <img src={userLoggedIn==="true"?`${ userAvatar?.avatar || "https://th.bing.com/th/id/OIP.3Ssgm63UbKVvrUkUEQkv-AHaHa?rs=1&pid=ImgDetMain"}`:"https://th.bing.com/th/id/OIP.3Ssgm63UbKVvrUkUEQkv-AHaHa?rs=1&pid=ImgDetMain"} alt="image" className='w-8 h-8 rounded-full ' />
      </div>
    </div>
  </div>
  )
}

export default Header
