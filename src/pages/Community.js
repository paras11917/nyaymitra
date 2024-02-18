
import { useEffect, useState } from 'react'
import { createPostRoute, getAllPostRoute } from '../utils/APIRoutes'
import axios from 'axios'
import { useNavigate } from "react-router";
import { CiImageOn } from "react-icons/ci";
import { HiOutlineUpload } from "react-icons/hi";
import PostCard from '../components/PostCard';

function Community() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState(null)


  const fetchallPost = async () => {
    try {

      const response = await axios.get(getAllPostRoute)
      if (response) {
        console.log(response.data)
        setPosts(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchallPost()
  }, [])

  return (
    <div className="community-page flex flex-col items-center">
      <div className="decor-line"></div>
      <h2 className="page-title text-center">
        Community<br />
        Building Trust Together
      </h2>
      <div className='flex flex-col gap-2 items-center justify-between w-full sm:w-[50%] z-[-2]'>
        <div className='rounded-[12px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]  backdrop-blur-md gap-2 p-[10px] w-full'>
          <img className="user-image" src={require("../images/download.png")} alt="User 2" />
          {/* <div>{}</div> */}
          <div className='w-full mt-4' >
            <div className='flex w-full gap-3 justify-between mb-4'>
              <div className='flex w-full gap-2'>
                <div className='w-full'>
                  <input placeholder='Title' className='w-full p-2 rounded-lg bg-[#30475E]' />
                </div>
                <div className='p-3 bg-[#F05454] flex justify-center items-center text-[24px] font-bold rounded-lg'>
                  <CiImageOn />
                </div>
              </div>

              <div className='p-3 bg-[#F05454] flex justify-center items-center text-[24px] font-bold rounded-lg'>
                <HiOutlineUpload />
              </div>
            </div>
            <div>
              <textarea placeholder='Description' className='w-full p-2 rounded-lg bg-[#30475E]' />
            </div>
          </div>
        </div>
        <div className="flex mt-[20px] flex-col gap-4">
          {posts?.map(post => (
            <PostCard post={post} />
          ))}

        </div>
      </div>
    </div>
  );
}

export default Community;
