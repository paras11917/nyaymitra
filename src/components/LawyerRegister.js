import React, { useState, useEffect } from "react";
import MessageLoading from "./MessageLoading";
const LawyerRegister = ({handleChange,handleReset,handleSubmit,values,set,message,loading}) => {
   return (
      <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-full sm:w-[70%] pt-12">
         <div className="text-xl text-center mb-4">Lawyer Registration</div>

         <div className="flex flex-col gap-2">
            <div className="flex flex-col">
               <label className="text-sm mb-1" >Registration Number</label>
               <input
                  className="p-2 text-black rounded-lg focus:outline-none"
                  type="text"
                  placeholder="Registration Number"
                  name="regno"
                  value={values.regno}
                  disabled={set}
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
            <div className="flex gap-2 w-full">
               <button className="h-10 bg-[#F05454] rounded-lg px-2 " onClick={handleSubmit}>Lawyer Register</button>
               <button className="h-10 bg-[#F05454] rounded-lg px-2 " onClick={handleReset}>Reset</button>
            </div>
            <MessageLoading message={message} loading={loading} /> 
         </div>
      </div>


   )
}

export default LawyerRegister

{/* <div className="flex flex-col">
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
                     </div> */}

{/* <input
                     type="password"
                     placeholder="OTP"
                     name="otp"
                     value={inputotp}
                     onChange={(e) => setinputotp(e.target.value)}
                  />
                  <button className="h-10 bg-violet-800 rounded-lg" onClick={() => inputotp === otp && setOtpCheck(true)}>verify</button> */}
