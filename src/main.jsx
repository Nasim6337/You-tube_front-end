import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home.jsx'
import Account from './Components/user/Account.jsx'
import UploadVideo from './Components/video/UploadVideo.jsx'
import Login from './Components/user/Login.jsx'
import PlayVideo from './Components/video/PlayVideo.jsx'
import Register from './Components/user/Register.jsx'
import { LoginStatusContextProvider } from '../utils/LoginStatusContext.jsx'
import WatchHistory from './Components/user/WatchHistory.jsx'
import ChangePassword from './Components/user/ChangePassword.jsx'
import EditProfile from './Components/user/EditProfile.jsx'
import EditVideo from './Components/video/EditVideo.jsx'




const router=createBrowserRouter(
  createRoutesFromElements(
    
      
      <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Home/>} />
      <Route path='user/your-account' element={<Account/>} />
      <Route path='user/uploadVideo' element={<UploadVideo/>} />
      <Route path='user/Login' element={<Login/>} />
       <Route path='videos/PlayVideo/:videoId' element={<PlayVideo/>} />
      <Route path='user/Register' element={<Register/>} /> 
      <Route path='user/your-account/watchHistory' element={<WatchHistory/>}></Route>

      <Route path='user/changePassword' element={<ChangePassword/>}></Route>

      <Route path='user/editProfile' element={<EditProfile/>}></Route>
      
    <Route path='video/editVideo/:videoId' element={<EditVideo/>}></Route>

    </Route>
      

    
  )
)

createRoot(document.getElementById('root')).render(
  <LoginStatusContextProvider>
     
     <RouterProvider router={router}/> 
  
  </LoginStatusContextProvider>
   
)

