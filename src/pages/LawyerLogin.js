import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { lawyerLoginRoute, userLoginRoute } from "../utils/APIRoutes";

const LawyerLogin = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      regno: "",
      password: "",
   });

   const handleSubmit = async () => {
      try {
         const { regno, password } = values;
         const response = await axios.post(lawyerLoginRoute, {
            regno,
            password,
         });
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

   const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
   };

   return (
      <div className="flex items-center justify-between h-screen gap-3">

         
         <div className="flex flex-col justify-center items-center w-[50%] ">
            <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-[70%]">
            <div className="text-xl text-center mb-4">LawyerLogin</div>

               <div className="flex flex-col">
                  <label className="text-sm mb-1" >Registration Number</label>
                  <input
                     className="p-2 rounded-lg"
               type="text"
               placeholder="Registration Number"
               name="regno"
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
               <button className="h-10 bg-[#F05454] rounded-lg" onClick={handleSubmit}>LawyerLogin</button>
            </div>

         </div>
         <div className=" mt-[72px] h-[100vh-70px] w-[50%] bg-[#F05454]">
            <img className="h-full w-full" src={require("../images/8778033.png")} alt="hero" />
         </div>
      </div>
   )
}

export default LawyerLogin