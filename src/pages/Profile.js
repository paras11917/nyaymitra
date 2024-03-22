import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isAuth, logout } from '../utils/Utils'
import Select from "react-select"

import { useNavigate } from "react-router-dom"
import { Context } from '../Context/Context'
import axios from 'axios'
import { CiCirclePlus } from "react-icons/ci";
import { uploadImageRoute } from '../utils/APIRoutes'
const Profile = () => {
   const navigate = useNavigate()
   const { token, userData, auth, fetchUser } = useContext(Context)
   const [values, setValues] = useState({
      name: "",
      email: "",
      regno: "",
      phone: "",
      date: "",
      password: ""
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

   const [fields, setFields] = useState([])
   const [tags, setTag] = useState([])

   const handleReset = () => {
      setValues({
         name: "",
         email: "",
         regno: "",
         phone: "",
         date: "",
         password: "",
         role: 1
      })
      setSet(false)
   }

   const handleSubmit = async () => {
      setLoading(true)
      try {
         const response = await axios.post("preSignupRoute", values);
         if (response.status === 200) {
            console.log(response)
            handleReset()
            setLoading(false)
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

   const handleProfileUpload = () => {
      try {
         const config = {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
         };
         const formData = new FormData()
         formData.append("avatar", file)
         const response = axios.patch(uploadImageRoute, formData, config)
         console.log(response.data)
         fetchUser()
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className='pt-[80px] flex w-full'>
         <div className='w-[30%]'>
            <div className='h-[200px] w-[200px] rounded-full'>
               <img className='w-full h-full bg-cover rounded-full' src={userData?.image || require("../images/Vector2.png")} alt='p' />
            </div>
            <button className='text-[30px]' onClick={handleProfileUpload}><CiCirclePlus /></button>
            <input
               filename={file}
               onChange={e => setFile(e.target.files[0])}
               type="file"
               accept="image/*"

            ></input>
            <div>Paras Pipre</div>
         </div>
         <div className='w-[70%]'>
            <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-full sm:w-[70%] pt-12">
               <div className="text-xl text-center mb-4">Profile Update</div>

               <div className="flex flex-col gap-2">
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
                     <label className="text-sm mb-1" >Name</label>
                     <input
                        className="p-2 text-black rounded-lg focus:outline-none"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={values.name}
                        disabled
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label className="text-sm mb-1" >Email</label>
                     <input
                        className="p-2 text-black rounded-lg focus:outline-none"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={values.email}
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
                        disabled
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
                        disabled
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
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
                  <div className="flex flex-col">
                     <label className="text-sm mb-1" >Confirm Password</label>
                     <input
                        className="p-2 text-black rounded-lg focus:outline-none"
                        type="password"
                        placeholder="Confirm Password"
                        name="ConfirmPassword"
                        onChange={(e) => handleChange(e)}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label className="text-sm mb-1" >Bio</label>
                     <textarea
                        className="p-2 text-black rounded-lg focus:outline-none"
                        placeholder="Bio"
                        name="bio"
                        value={values.bio}
                        onChange={(e) => handleChange(e)}
                     />
                  </div>

                  <div className="flex flex-col">
                     <label className="text-sm mb-1" >Field</label>
                     <Select
                        className="p-2 text-black rounded-lg focus:outline-none"
                        isMulti
                        isSearchable
                        value={fields}
                        options={options}
                        onChange={(selected) => {
                           setFields(selected)
                        }}
                     />
                  </div>


                  <div className="flex flex-col">
                     <label className="text-sm mb-1" >Tags</label>
                     <Select
                        className="p-2 text-black rounded-lg focus:outline-none"
                        isMulti
                        isSearchable
                        value={tags}
                        options={tag}
                        onChange={(selected) => {
                           setTag(selected)
                        }}
                     />
                  </div>

                  {/* <input
                     type="password"
                     placeholder="OTP"
                     name="otp"
                     value={inputotp}
                     onChange={(e) => setinputotp(e.target.value)}
                  />
                  <button className="h-10 bg-violet-800 rounded-lg" onClick={() => inputotp === otp && setOtpCheck(true)}>verify</button> */}

                  <div className="flex gap-2 w-full">
                     <button className="h-10 bg-[#F05454] rounded-lg px-2 " onClick={handleSubmit}>Update</button>
                     <button className="h-10 bg-[#F05454] rounded-lg px-2 " onClick={handleReset}>Reset</button>
                  </div>
                  {/* <MessageLoading message={message} loading={loading} /> */}
               </div>
            </div>
         </div>
      </div>

   )
}

export default Profile






