import React, { useContext, useEffect, useState } from 'react'
import { isAuth } from '../utils/Utils'
import Select from "react-select"
import { useNavigate } from "react-router-dom"
import { Context } from '../Context/Context'
import axios from 'axios'
import { CiCirclePlus, CiPen } from "react-icons/ci";
import { updateUserRoute, uploadImageRoute } from '../utils/APIRoutes'
import MessageLoading  from '../components/MessageLoading'
const Profile = () => {
   const navigate = useNavigate()
   const { token, userData, fetchUser } = useContext(Context)
   const [values, setValues] = useState({
      name: "",
      phone: "",
      date: "",
      password: "",
      specialization: "",
      tags: "",
      address: "",
      bio:""
   });
   const [file, setFile] = useState()
   const [set, setSet] = useState(false)
   const [same, setSame] = useState(true)

   const [message, setMessage] = useState(null)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      if (!isAuth()) {
         navigate("/")
      }
   })

   const [specialization, setSpecialzation] = useState([])
   const [tags, setTag] = useState([])

   const handleReset = () => {
      setValues({
         name: "",
         phone: "",
         date: "",
         password: "",
         specialzation: "",
         tags: "",
         address: "",
         bio: ""
      })
      setSet(false)
   }

   const handleSubmit = async () => {
      setLoading(true)
      try {
         const response = await axios.patch(updateUserRoute, values, { headers: { Authorization: `Bearer ${token}` } });
         if (response.status === 200) {
            console.log(response)
            handleReset()
            fetchUser()
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

   const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
      if (event.target.name === "confirmPassword") {
         if (event.target.value !== values.password) {
            setSame(false)
         } else {
            setSame(true)
         }
      }
   };

   const options = [
      { value: 'Bankruptcy Lawyer', label: 'Bankruptcy Lawyer' },
      { value: 'Corporate Lawyer', label: 'Corporate Lawyer' },
      { value: 'Criminal Defense Lawyer', label: 'Criminal Defense Lawyer' }
   ]

   const tag = [
      { value: 'Bankruptcy', label: 'Bankruptcy' },
      { value: 'Corporate', label: 'Corporate' },
      { value: 'Crime', label: 'Crime' }
   ]

   const handleProfileUpload = async() => {
      try {
         console.log(token)
         const config = {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
         };
         const formData = new FormData()
         formData.append("avatar", file)
         const response = await axios.patch(uploadImageRoute, formData, config)
         if(response) fetchUser()
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className=' p-4 pt-[80px] flex flex-col md:flex-row w-full items-center justify-center min-h-screen'>
         <div className='w-full md:w-[40%] flex flex-col items-center justify-start'>
            <div className='mb-4 md:mb-[100px] text-3xl'>{userData?.name}</div>
            <div className='h-[200px] w-[200px] rounded-full mb-4'>
               <img className='w-full h-full bg-cover rounded-full' src={userData?.image || require("../images/Vector2.png")} alt='p' />
            </div>
            {file ?
               <button className='text-[24px] bg-red-700 rounded-[12px] py-2 px-4' onClick={handleProfileUpload}><CiCirclePlus /></button>
               : <button className='text-[24px] bg-red-700 rounded-[12px] py-2 px-4' onClick={()=>document.getElementById("profileimg").click()}><CiPen /></button>}
            <input
               filename={file}
               onChange={e => setFile(e.target.files[0])}
               type="file"
               accept="image/*"
               id="profileimg"
               hidden
            ></input>
            
         </div>
         <div className='w-full md:w-[60%]'>
            <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-full md:w-[70%]">
               <div className="text-xl text-center mb-4">Profile Update</div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                     <label className="text-sm mb-1" >Name</label>
                     <input
                        className="p-2 text-black rounded-lg focus:outline-none"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={values.name}
                        onChange={(e) => handleChange(e)}
                     />
                  </div>

                  <div className="flex flex-col">
                     <label className="text-sm mb-1" >Phone Number</label>
                     <input
                        className="p-2 text-black rounded-lg focus:outline-none"
                        type="number"
                        placeholder="Phone Number"
                        name="phone"
                        value={values.phone}
                        
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label className="text-sm mb-1" >Date of Birth</label>
                     <input
                        className="p-2 text-black rounded-lg focus:outline-none"
                        type="date"
                        placeholder="Date"
                        name="date"
                        value={values.date}
                        
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
                  {userData?.role ===1 && <div className="flex flex-col">
                     <label className="text-sm" >Tags</label>
                     <Select
                        className="p-1 text-black rounded-lg focus:outline-none"
                        isMulti
                        isSearchable
                        value={tags}
                        options={tag}
                        onChange={(selected) => {
                           setTag(selected)
                        }}
                     />
                  </div>}
                  <div className="flex flex-col">
                     <label className="text-sm mb-1" >Password</label>
                     <input
                        className="p-2 text-black rounded-lg focus:outline-none"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={(e) => handleChange(e)}
                     />
                  </div>

                  {userData?.role===1 && <div className="flex flex-col">
                     <label className="text-sm" >Specialization</label>
                     <Select
                        className="p-1 text-black rounded-lg focus:outline-none"
                        isMulti
                        isSearchable
                        value={specialization}
                        options={options}
                        onChange={(selected) => {
                           setSpecialzation(selected)
                        }}
                     />
                  </div>}

                  {userData?.role===1 && <div className="flex flex-col">
                     <label className="text-sm mb-1" >Bio</label>
                     <textarea
                        className="p-2 text-black rounded-lg focus:outline-none"
                        placeholder="Bio"
                        name="bio"
                        value={values.bio}
                        onChange={(e) => handleChange(e)}
                     />
                  </div>}

                  <div className="flex flex-col">
                     <label className="text-sm mb-1" >Address</label>
                     <textarea
                        className="p-2 text-black rounded-lg focus:outline-none"
                        placeholder="Address"
                        name="address"
                        value={values.address}
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
                  <div className="flex gap-2 w-full">
                     <button className="h-10 bg-[#F05454] rounded-lg px-2 w-full " onClick={handleSubmit}>Update</button>
                     <button className="h-10 bg-[#F05454] rounded-lg px-2 w-full" onClick={handleReset}>Reset</button>
                  </div>
                  <MessageLoading message={message} loading={loading} />
               </div>
            </div>
         </div>
      </div>

   )
}

export default Profile






