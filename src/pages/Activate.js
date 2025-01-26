import axios from 'axios'
import React, { useCallback, useEffect } from 'react'
import { activateRoute } from '../utils/APIRoutes'
import { useNavigate, useParams } from 'react-router-dom'
import cookie from "js-cookie"

export const Activate = () => {
   const navigate = useNavigate()
   const { token } = useParams()

   const activate = useCallback(async () => {
      try {
         if (!token) return
         const response = await axios.post(activateRoute,{token})
         if (response) {
            console.log(response)
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            cookie.set("token", response.data.token)
            navigate(`/profile/${response?.data?.user?.username}`)
         }
      } catch (err) {
         console.log(err)
      }
   }, [navigate, token])

   useEffect(() => {
      if (!token) {
         navigate("/")
      } else {
         activate()
      }
   },[activate, navigate, token])

   return (
      <div className='flex flex-col items-center justify-center w-screen h-screen' >
            Activating.....
      </div>
   )
}
