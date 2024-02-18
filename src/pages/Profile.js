import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isAuth, logout } from '../utils/Utils'

import { useNavigate } from "react-router-dom"
const Profile = () => {
   const navigate = useNavigate()
   const { username } = useParams()

   const user = isAuth()

   useEffect(() => {
      if (!isAuth()) {
         navigate("/")
      }
   }, [])
   
   const [fields, setFields] = useState([])
   const [tags, setTag] = useState([])

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

   return (
      <div className='pt-[300px]'>Profile of {user?.role} {username}
         <button className='px-2 pb-1 bg-[#F05454] rounded-lg' onClick={logout}>logout</button>
      </div>

   )
}

export default Profile