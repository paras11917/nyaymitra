import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userLoginRoute, userRegisterRoute } from "../utils/APIRoutes";

const UserRegister = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const handleSubmit = async () => {
      try {

         const { name, email, password } = values;
         const response = await axios.post(userRegisterRoute, {
            name,
            email,
            password,
         });
         if (response) {
            console.log(response)
            localStorage.setItem(
               "nayay",
               JSON.stringify(response.data.user)
            );
            navigate('/chatu')
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
               <div className="text-xl text-center mb-4">User Register</div>
               <div className="flex flex-col">
                  <label className="text-sm mb-1" >Name</label>
                  <input
                     className="p-2 rounded-lg"
                     type="text"
                     placeholder="Name"
                     name="name"
                     onChange={(e) => handleChange(e)}
                  />
               </div>
               <div className="flex flex-col">
                  <label className="text-sm mb-1" >Email</label>
                  <input
                     className="p-2 rounded-lg"
                     type="email"
                     placeholder="Email"
                     name="email"
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
                     onChange={(e) => handleChange(e)}
                  />
               </div>

               <button className="h-10 bg-[#F05454] rounded-lg" onClick={handleSubmit}>UserRegister</button>
            </div>
         </div>
         <div className=" mt-[80px] h-[100vh-80px] w-[50%] bg-[#F05454]">
            <img className="h-full w-full" src={require("../images/8778033.png")} alt="hero" />
         </div>
      </div>
   )
}

export default UserRegister