import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import UserRegister from '../components/UserRegister'
import LawyerRegister from '../components/LawyerRegister'
import axios from 'axios'
import { preSignupRoute } from '../utils/APIRoutes'
import { Lawyer } from "../utils/data";
import { RotatingLines } from 'react-loader-spinner'
import MessageLoading from '../components/MessageLoading'
import { isAuth } from '../utils/Utils'
const SignUp = () => {
   const { state } = useLocation()
   const navigate = useNavigate()
   const [values, setValues] = useState({
      name: "",
      email: "",
      regno: "",
      phone: "",
      date: "",
      password: "",
      role: state.role === "user" ? 0 : 1
   });
   const [set, setSet] = useState(false)
   const [same, setSame] = useState(true)

   const [message, setMessage] = useState(null)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      const user = isAuth();
      if (user) {
         navigate(`/profile/${user.username}`)
      }
   }, [])

   const handleSubmit = async () => {
      setLoading(true)
      try {
         const response = await axios.post(preSignupRoute, values);
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
      if (event.target.name === "regno" && event.target.value.length > 7) {
         const lawyer = Lawyer.filter(l => l['regno'].toLowerCase() === event.target.value.toLowerCase())
         if (lawyer.length !== 0) {
            setSet(true)
            const [day, month, year] = lawyer[0]["dob"].split('/');
            setValues({
               ...values,
               name: lawyer[0]["name"],
               phone: lawyer[0]["mobile"],
               date: `${year}-${month}-${day}`,
               regno: event.target.value
            })
         }
      }
   };

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

   return (
      <div className="flex items-center justify-between h-screen gap-3">
         <div className="flex flex-col justify-center items-center w-full md:w-[50%] ">
            {
               state?.role === "user" ?
                  <UserRegister handleChange={(e) => handleChange(e)} handleSubmit={handleSubmit} values={values} message={message} loading={loading} same={same} />
                  : state?.role === "lawyer" ?
                     <LawyerRegister handleReset={handleReset} handleChange={handleChange} handleSubmit={handleSubmit} values={values} set={set} message={message} loading={loading} same={same} />
                     : <Navigate to="/" />
            }
         </div>
         <div className="h-full top-[80px] right-0 fixed w-[50%] bg-[#F05454] hidden md:block ">
            <img className="h-full w-full" src={require("../images/8778033.png")} alt="hero" />
         </div>
      </div>
   )
}

export default SignUp