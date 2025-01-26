
import { useContext, useEffect, useState } from 'react'
import { createPostRoute, getAllPostRoute } from '../utils/APIRoutes'
import axios from 'axios'
import { CiImageOn } from "react-icons/ci";
import { HiOutlineUpload } from "react-icons/hi";
import PostCard from '../components/PostCard';
import { Context } from '../Context/Context';
import MessageLoading from '../components/MessageLoading';

function Community() {
  const [posts, setPosts] = useState(null)
  const { userData,token } = useContext(Context)
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    image: null,
  });


  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleReset = () => {
    setFormData({
      title: "",
      desc: "",
      image: null,
    })
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("desc", formData.desc);
    if (formData.image) data.append("image", formData.image);

    try {
      const response = await axios.post(createPostRoute, data, { headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 200) {
        console.log(response)
        handleReset()
        fetchallPost()
        setMessage(response?.data?.message)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } else {
        setMessage(response?.data)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };


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
      <div className='flex flex-col gap-2 items-center justify-between w-full sm:w-[50%] '>
        <div className='rounded-[12px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]  backdrop-blur-md gap-2 p-[10px] w-full'>
          <img className="user-image" src={userData?.image || require("../images/download.png")} alt="User 2" />
          <div className="w-full mt-4">
            <form onSubmit={handleSubmit}>
              <div className="flex w-full gap-3 justify-between mb-4">
                <div className="flex w-full gap-2">
                  <div className="w-full">
                    <input
                      name="title"
                      placeholder="Title"
                      className="w-full p-2 rounded-lg bg-[#30475E] text-white focus:outline-none"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <button onClick={() => document.getElementById("postimage").click()} className="p-3 bg-[#F05454] flex justify-center items-center text-[24px] font-bold rounded-lg">
                      <CiImageOn />
                      <input
                        type="file"
                        name="image"
                        className="hidden"
                      onChange={handleChange}
                      id="postimage"
                      />
                  </button>
                </div>

                  <button
                    type="submit"
                    className="p-3 bg-[#F05454] flex justify-center items-center text-[24px] font-bold rounded-lg"
                  >
                    <HiOutlineUpload />
                  </button>
              </div>
              <div>
                <textarea
                  name="desc"
                  placeholder="Description"
                  className="w-full p-2 rounded-lg bg-[#30475E] text-white focus:outline-none"
                  value={formData.desc}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
        </div>
        <MessageLoading message={message} loading={loading} />
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
