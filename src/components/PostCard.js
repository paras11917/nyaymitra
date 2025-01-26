import React from 'react'
// import { BiUpvote, BiDownvote } from "react-icons/bi";
const PostCard = ({ post }) => {
   return (
      <div className="flex px-[10px] rounded-[12px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]  backdrop-blur-md">

         <div className=' border-r-[1px] border-gray-500'>
            {/* <div className='py-[10px] pr-[10px]'>
               <BiUpvote />
            </div>
            <div>
               <BiDownvote />
            </div> */}
         </div>
         <div className='w-full'>
            <div className="flex gap-2 items-center justify-start p-2 border-b-[1px] border-gray-500">
               <img className="user-image" src={require("../images/download.png")} alt="User 2" />
               <span className="user-name text-gray-400">{post?.author?.name}</span>
            </div>
            <div className='flex p-4'>

            {post?.image && <img src={post.image} height={100} width={100} alt={post?.image} />}
            <div className='p-4'>
               <h3 className="post-title text-xl mb-4 font-bold">{post.title}</h3>
               <p className="post-content mb-4 text-gray-400">{post.desc}</p>
            </div>
            </div>
         </div>
      </div>
   )
}

export default PostCard