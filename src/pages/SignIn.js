import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { signinRoute } from "../utils/APIRoutes";
import cookie from "js-cookie"
import MessageLoading from '../components/MessageLoading';
import { isAuth } from '../utils/Utils';

const SignIn = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      email: "",
      password: "",
   });
   const [loading, setLoading] = useState(false)
   const [message,setMessage] = useState(null)

   useEffect(() => {
      const user = isAuth();
      if (user) {
         navigate(`/profile/${user.username}`)
      }
   }, [])

   const handleSubmit = async () => {
      setLoading(true)
      try {
         const { email, password } = values;
         const response = await axios.post(signinRoute,values);
         setLoading(false)
         if (response.status===200) {
            console.log(response)
            localStorage.setItem("user", JSON.stringify(response.data.user));
            cookie.set("token", response.data.token)
            navigate(`/profile/${response.data.user.username}`)
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
   };
   return (
      <div className="flex items-center justify-between h-screen gap-3">
         <div className="flex flex-col justify-center items-center w-[50%] ">
            <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-[70%]">
               <div className="text-xl text-center mb-4">User Login</div>
               <div className="flex flex-col">
                  <label className="text-sm mb-1" >Email</label>
                  <input
                     className="p-2 text-black rounded-lg focus:outline-none"
                     type="email"
                     placeholder="Email"
                     name="email"
                     value={values.email}
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
               <button className="h-10 bg-[#F05454] rounded-lg" onClick={handleSubmit}>UserLogin</button>
               <MessageLoading  loading={loading} message={message} />             
            </div>
         </div>
         <div className="h-full top-[80px] right-0 fixed w-[50%] bg-[#F05454]">
            <img className="h-full w-full" src={require("../images/8778033.png")} alt="hero" />
         </div>
      </div>
   )
}

export default SignIn