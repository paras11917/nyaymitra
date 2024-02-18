import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { activateRoute } from '../utils/APIRoutes'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import cookie from "js-cookie"

export const Activate = () => {
   const navigate = useNavigate()
   const { token } = useParams()
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (!token) {
         navigate("/")
      }
   },[])

   const activate = async () => {
      setLoading(true)
      try {
         const response = await axios.post(activateRoute, { token })
         if (response) {
            console.log(response)
            localStorage.setItem("user", JSON.stringify(response.data.user));
            cookie.set("token", response.data.token)
            navigate(`/profile/${response?.data?.user.username}`)
         }
      } catch (err) {
         console.log(err)
      }
      setLoading(false)
   }

   const showLoading = () => (
      loading ? <div className="flex justify-center" style={{ position: "fixed", right: "40%", top: "40%" }} >   <RotatingLines width="100" strokeColor="black" strokeWidth="2" /> </div> : ""
   )
   return (
      <div className='flex flex-col items-center justify-center w-screen h-screen' >
         <button onClick={activate} className='px-2 pb-1 bg-[#F05454] rounded-lg'>
            Activate
         </button>
         {showLoading()}
      </div>
   )
}
