import React, { useRef, useState } from 'react'
import MessageLoading from './MessageLoading'
import axios from 'axios';
import { sendRequestRoute } from '../utils/APIRoutes';
import { io } from 'socket.io-client';
import { isAuth } from '../utils/Utils';

const ConnectPopup = ({ open, connectLawyer }) => {
   const formData = new FormData()
   const [values, setValues] = useState({
      sub: "",
      desc: "",
   });
   const [loading, setLoading] = useState(false)
   const socket = useRef();

   const auth  = isAuth()

   const handleSubmit = async () => {
      setLoading(true)
      try {
         socket.current.emit("send-request", {
            to: connectLawyer,
            from: auth.id,
            message: values.sub
         });

         const response = await axios.post(sendRequestRoute, formData);
         if (response) {
            setLoading(false)
            console.log(response)
         }
      } catch (err) {
         console.log(err)
      }
   };

   const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
      formData.set(event.target.name, event.target.value)
      if (event.target.name === "fir") {
         formData.set("fir",event.target.files[0])
      }
   };


   return (
      <div className={`absolute flex-col justify-center items-center w-screen h-screen backdrop-blur-3xl ${open ? "flex" : "hidden"}`}>
         <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-[50%]">
            <div className="text-xl text-center mb-4">Send Connection Request</div>
            <div className="flex flex-col">
               <label className="text-sm mb-1" >Subject</label>
               <input
                  className="p-2 text-black rounded-lg focus:outline-none"
                  type="text"
                  placeholder="Subject"
                  name="sub"
                  value={values.sub}
                  onChange={(e) => handleChange(e)}
               />
            </div>
            <div className="flex flex-col">
               <label className="text-sm mb-1" >Description</label>
               <textarea
                  className="p-2 text-black rounded-lg focus:outline-none"
                  placeholder="Description"
                  name="desc"
                  value={values.desc}
                  onChange={(e) => handleChange(e)}
               />
            </div>
            <div className="connect-form">
               <div onClick={()=>document.getElementById("fir").click()} className='p-3 bg-[#F05454] flex justify-center items-center text-[20px] rounded-lg'>
                  Upload Your Document
               </div>
               <input
                  type="file"
                  accept=".pdf, .doc, .docx, .txt"
                  onChange={(e) => handleChange(e)}
                  hidden
                  name="fir"
                  id="fir"
               />
            </div>
            <button className="h-10 bg-[#F05454] rounded-lg" onClick={handleSubmit}>Send</button>
            <MessageLoading loading={loading} />
         </div>
      </div>
   )
}

export default ConnectPopup