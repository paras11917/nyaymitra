import React from "react";
import MessageLoading from "./MessageLoading";

const UserRegister = ({ handleChange, handleSubmit, values, message,loading,same }) => {
   
   return (
      <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-full sm:w-[70%]">
         <div className="text-xl text-center mb-4">User Register</div>
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
         <div className="flex flex-col">
            <label className="text-sm mb-1" >Confirm Password {!same && <span className="text-red-500">Password must be same!</span>} </label>

            <input
               className={`p-2 text-black rounded-lg  ${same ? " focus:outline-none" : "outline-red-500"}`}
               type="password"
               placeholder="Confirm Password"
               name="confirmPassword"
               onChange={(e) => handleChange(e)}
            />
         </div>
         <button className="h-10 bg-[#F05454] rounded-lg" disabled={!same} onClick={handleSubmit}>UserRegister</button>
         <MessageLoading message={message} loading={loading} />     
      </div>

   )
}

export default UserRegister