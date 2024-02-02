import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { lawyerRegisterRoute, userLoginRoute } from "../utils/APIRoutes";
import { Lawyer } from "../data";
import Select from 'react-select'
const LawyerRegister = () => {
   const navigate = useNavigate();
   const [check, setCheck] = useState(false);
   const [otpcheck, setOtpCheck] = useState(false);
   const otp = "12AB"
   const [inputotp, setinputotp] = useState("")
   const [data, setData] = useState(null);
   const [values, setValues] = useState({
      name: "",
      regno: "",
      phone: "",
      date: "",
      password: "",
      bio: "",
      fields: [],
      tags: []
   });
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
      { value: 'Crimine', label: 'Crimine' }
   ]

   const handleSubmit = async () => {
      try {
         const f = fields.map(f => f.value)
         const t = tags.map(t => t.value)
         setValues({ ...values, fields: f, tags: t })
         console.log(values)
         const response = await axios.post(lawyerRegisterRoute, values);
         if (response) {
            localStorage.setItem(
               "nayay",
               JSON.stringify(response.data.lawyer)
            );
            navigate('/chatl')
         }
      } catch (err) {
         console.log(err)
      }
   };

   const handleCheck = async (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      const lawyer = Lawyer.filter(l => l['regno'] === e.target.value)
      if (lawyer.length !== 0) {
         setCheck(true);
         const [day, month, year] = lawyer[0]["dob"].split('/');
         setValues({
            ...values,
            name: lawyer[0]["name"],
            phone: lawyer[0]["mobile"],
            date: `${year}-${month}-${day}`
         })
      }
   }

   const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
   };

   return (
      <div className="flex items-center justify-between max-h-[100vh-76px] pt-[74px] gap-3">
         <div className="flex flex-col justify-center items-center w-[50%] overflow-auto ">

            {!check ? (
               <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-[70%]">
                  <div className="text-xl text-center mb-4">Lawyer Registration</div>
                  <div>
                     <div className="flex flex-col">
                        <label className="text-sm mb-1" >Registration Number</label>
                        <input
                           className="p-2 rounded-lg"
                           type="text"
                           placeholder="Registration Number"
                           name="regno"
                           onChange={(e) => handleCheck(e)}
                        />
                     </div>
                     {/* <button className="h-10 bg-violet-800 rounded-lg" onClick={handleCheck}>check</button> */}

                  </div>
               </div>
            ) : (
               <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3  w-[70%]">
                  <div className="text-xl text-center mb-4">Lawyer Registration</div>

                  <div className="">
                     <div className="flex flex-col">
                        <label className="text-sm mb-1" >Name</label>
                        <input
                           className="p-2 rounded-lg"
                           type="text"
                           placeholder="Name"
                           name="name"
                           value={values.name}
                           onChange={(e) => handleChange(e)}
                        />
                     </div>
                     <div className="flex flex-col">
                        <label className="text-sm mb-1" >Registration Number</label>
                        <input
                           className="p-2 rounded-lg"
                           type="text"
                           placeholder="Registration Number"
                           name="regno"
                           value={values.regno}
                           onChange={(e) => handleChange(e)}
                        />
                     </div>
                     <div className="flex flex-col">
                        <label className="text-sm mb-1" >Phone Number</label>
                        <input
                           className="p-2 rounded-lg"
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
                           className="p-2 rounded-lg"
                           type="date"
                           placeholder="Date"
                           name="date"
                           value={values.date}
                           onChange={(e) => handleChange(e)}
                        />
                     </div>
                     <div className="flex flex-col">
                        <label className="text-sm mb-1" >Password</label>
                        <input
                           className="p-2 rounded-lg"
                           type="password"
                           placeholder="Password"
                           name="password"
                           value={values.password}
                           onChange={(e) => handleChange(e)}
                        />
                     </div>

                     <div className="flex flex-col">
                        <label className="text-sm mb-1" >Bio</label>
                        <textarea
                           className="p-2 rounded-lg"
                           placeholder="Bio"
                           name="bio"
                           value={values.bio}
                           onChange={(e) => handleChange(e)}
                        />
                     </div>

                     <div className="flex flex-col">
                        <label className="text-sm mb-1" >Field</label>
                        <Select
                           className="p-2 rounded-lg"
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
                           className="p-2 rounded-lg"
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

                        <button className="h-10 bg-[#F05454] rounded-lg" onClick={handleSubmit}>Lawyer Register</button>
                  </div>
               </div>
            
         )
               }
      </div>

         
         <div className="h-full w-[50%] bg-[#F05454]">
            <img className="h-full w-full" src={require("../images/8778033.png")} alt="hero" />
   </div>
      </div >
   )
}

export default LawyerRegister