import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { allUsersRoute, getLawyerRoute, host, logoutRoute } from '../utils/APIRoutes'
import ChatLawyer from './ChatLawyer'
import { io } from 'socket.io-client'

const LawyerPage = () => {
   const navigate = useNavigate();
   const [users, setUsers] = useState(null);
   const [lawyer, setLawyer] = useState(null)
   const [lawyerID, setLawyerID] = useState(null)
   const socket = useRef();
   useEffect(() => {
      if (!localStorage.getItem("nayay")) {
         navigate("/");
      } else {
         setLawyerID(
            JSON.parse(localStorage.getItem("nayay"))._id
         );
      }
   }, [])

   useEffect(() => {
      if (lawyerID) {
         socket.current = io(host);
         socket.current.emit("newUser", lawyerID);
      }
   }, [lawyerID]);

   const fetchLawyer = async () => {
      try {
         const lawyerid = await JSON.parse(localStorage.getItem("nayay"))._id
         const response = await axios.get(`${getLawyerRoute}/${lawyerid}`)
         if (response) {
            setLawyer(response.data)
         }
      } catch (err) {
         console.log(err)
      }
   }

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const response = await axios.get(allUsersRoute)
            if (response) {
               setUsers(response.data)
               console.log(response.data)
            }
         } catch (err) {
            console.log(err)
         }
      }
      fetchUsers()
      fetchLawyer()
   }, [])

   const logout = async () => {
      try {
         const id = await JSON.parse(localStorage.getItem("nayay"))._id;
         const data = await axios.get(`${logoutRoute}/${id}`);
         if (data.status === 200) {
            localStorage.clear();
            navigate("/");
         }
      } catch (err) {
         console.log(err)
      }
   }
   return (
      <>
         <div>LawyerPage</div>
         <button className="h-10 bg-violet-800 rounded-lg" onClick={logout}>Logout</button>
         <div>
            <div>

            </div>
            <div>
               <div>Connected users</div>
               {users?.filter(user => lawyer?.users?.includes(user?._id)).map(u => (
                  <>
                     <div>{u.name}</div>
                  </>
               ))}
            </div>
            <div className='min-h-[500px]'>
               <ChatLawyer lawyer={lawyer} users={users} />
            </div>
         </div>
      </>
   )
}

export default LawyerPage