import React,{useEffect, useState} from 'react'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function FlashMessage({success,message}) {
  useEffect(()=>{
    
    if(success){
    
        toast.success(message, {
            position:'top-right',
        });
    }
    else{
                toast.error(message, {
            position:'top-right',
        }); 
    }
  },[success,message])
        
  return (
    
      <ToastContainer/>
  )
}

export default FlashMessage
