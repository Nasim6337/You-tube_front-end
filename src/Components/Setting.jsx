import React from 'react'
import { NavLink } from 'react-router-dom'

function Setting() {
  return (
    <div className='bg-white right-0 text-zinc-800 rounded-lg  h-[30vh] w-[200px] z-10 flex flex-col absolute'>
      <NavLink  className={()=>`ml-2 mt-4 cursor-pointer font-bold `} to="/user/changePassword">Change Password</NavLink>
      <NavLink className={()=>`ml-2 mt-4 cursor-pointer font-bold `}  to="/user/editProfile" >Edit Profile</NavLink>
    </div>
  )
}

export default Setting
