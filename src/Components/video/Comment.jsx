import axios from 'axios';
import React, { useEffect, useState } from 'react'
const baseurl=import.meta.env.VITE_API_BASE_URL;
function Comment({video,videoId}) {
    const [show,setShow]=useState(false);
    const [comment,setComment]=useState('');
    const [comments,setComments]=useState([]);
    // const [totalComments,setTotalComments]=useState(0);
    const handleComment=(e)=>{
        e.preventDefault();
        console.log(comment)
        axios.post(`${baseurl}/api-v1/comment/createComment`,{comment,
            videoId
        })
        
    }//function end here

    useEffect(()=>{
        axios.post(`${baseurl}/api-v1/comment/comments`,{videoId})
        .then((Response)=>{
            
                setComments(Response.data.comments);    
                
            
        })
        .catch((error)=>{
            console.log(error.response)
        })
    },[])

    

   

  return (
<>
<div className="flex flex-col mt-4  items-center px-4 md:px-10 lg:px-20 text-white">
    
    <div  onClick={()=>setShow(true)} className={`flex-col  ${show?'h-40 overflow-y-auto':'h-20 overflow-hidden'} md:w-[40vw] w-[90vw] border-t border-b  bg-zinc-800 rounded-lg cursor-pointer`}>
    <p className='pt-2'>Comments {comments.length}</p>
    
    {comments && comments.map((ele)=>{
        
       return(
       <Comments key={ele?._id} comment={ele}/>
       )
    })}
           
    </div>

    {show?
      <div className='flex relative  md:w-[40vw] rounded-md w-[90vw] h-6'>
       <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder=' write your comment....' className='md:w-[35vw] w-[80vw] outline-none absolute   rounded-md bg-zinc-700 ' />

       <input type='submit'  className="  right-0  bg-blue-500 text-white absolute rounded-md hover:bg-blue-600 transition"
          onClick={handleComment}  value={"comment"} />
             
           
       
      </div> 
      :''}

   {show? <button onClick={()=>setShow(false)} className='  w-8 h-8 rounded-full bg-zinc-700 text-2xl font-bold z-10 mb-0 '>^</button>:''}
  </div>
  
</>
  )
}


function Comments({comment}){
return(
    <>
    <div className="w-full gap-4 flex pb-2 ">
   <div className="w-10 text-center h-10 font-bold border-2 text-2xl mt-[6px] text-red-500 rounded-full border-cyan-500 ">N</div>
 <div>
     <p className="text-blue-300">{comment?.commentUser?.userName}</p>
       <p className="overflow-hidden">{comment.comment}</p>
 </div>
   </div>
   <hr />
  </>
)
}
export default Comment