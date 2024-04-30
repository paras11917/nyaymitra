import React, { useContext, useRef, useState } from 'react'
import MessageLoading from './MessageLoading'
import axios from 'axios';
import { sendRequestRoute } from '../utils/APIRoutes';
import { RxCross2 } from "react-icons/rx";
import { Context } from '../Context/Context';

const ConnectPopup = ({ open, connectLawyer, setOpen }) => {
   const { auth, socket, token } = useContext(Context)
   const [values, setValues] = useState({
      sub: "",
      desc: "",
      lawyer: ""
   });
   const [loading, setLoading] = useState(false)


   const handleSubmit = async () => {
      setLoading(true)
      try {
         socket.emit("request", {
            to: connectLawyer,
            from: auth,
            message: values.sub
         });

         const config = {
            headers: { Authorization: `Bearer ${token}` }
         };
         console.log(token)

         values.lawyer = connectLawyer

         const response = await axios.post(sendRequestRoute, values, config);
         if (response) {
            setLoading(false)
            setOpen(false)
            console.log(response)
         }
      } catch (err) {
         setLoading(false)
         console.log(err)
      }
   };


   return (
      <div className={`absolute flex-col justify-center items-center w-screen h-screen backdrop-blur-3xl ${open ? "flex" : "hidden"}`}>
         <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-[50%]">
            <div className="text-xl text-center mb-4">Send Connection Request</div>
            <div className='absolute top-5 right-5 text-[24px]' onClick={setOpen}>
               <RxCross2 />
            </div>
            <div className="flex flex-col">
               <label className="text-sm mb-1" >Subject</label>
               <input
                  className="p-2 text-black rounded-lg focus:outline-none"
                  type="text"
                  placeholder="Subject"
                  name="sub"
                  value={values.sub}
                  onChange={(e) => setValues({ ...values, sub: e.target.value })}
               />
            </div>
            <div className="flex flex-col">
               <label className="text-sm mb-1" >Description</label>
               <textarea
                  className="p-2 text-black rounded-lg focus:outline-none"
                  placeholder="Description"
                  name="desc"
                  value={values.desc}
                  onChange={(e) => setValues({ ...values, desc: e.target.value })}
               />
            </div>
            <button className="h-10 bg-[#F05454] rounded-lg" onClick={handleSubmit}>Send</button>
            <MessageLoading loading={loading} />
         </div>
      </div>
   )
}

export default ConnectPopup