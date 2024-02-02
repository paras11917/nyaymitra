import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { allLawyersRoute, connectLawyerRoute, getUserRoute, host, logoutRoute } from '../utils/APIRoutes'
import ChatUser from './ChatUser'
import { io } from 'socket.io-client'

const UserPage = () => {
   const navigate = useNavigate();
   const [lawyers, setLawyers] = useState(null);
   const [userID, setUserID] = useState(null);
   const [user, setUser] = useState(null);
   const socket = useRef();

   useEffect(() => {
      if (!localStorage.getItem("nayay")) {
         navigate("/");
      } else {
         setUserID(
            JSON.parse(localStorage.getItem("nayay"))._id
         );
      }
   }, [])

   useEffect(() => {
      if (userID) {
         socket.current = io(host);
         socket.current.emit("newUser", userID);
      }
   }, [userID]);

   const fetchUser = async () => {
      try {
         const userid = await JSON.parse(localStorage.getItem("nayay"))._id
         const response = await axios.get(`${getUserRoute}/${userid}`)
         if (response) {
            setUser(response.data)
            console.log(response.data)
         }
      } catch (err) {
         console.log(err)
      }
   }
   useEffect(() => {
      const fetchLawyers = async () => {
         try {
            const response = await axios.get(allLawyersRoute)
            if (response) {
               setLawyers(response.data)
            }
         } catch (err) {
            console.log(err)
         }
      }

      fetchUser()
      fetchLawyers()
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

   const handleConnect = async (id) => {
      try {
         const response = await axios.put(connectLawyerRoute, { userID, id })
         if (response) {
            console.log(response.data)
            fetchUser()
         }
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className='w-full h-screen'>
         <div>UserPage</div>
         <button className="h-10 bg-violet-800 rounded-lg" onClick={logout}>Logout</button>
         <div className='w-full flex gap-5'>
            <div>
               <div>All Lawyers to connect</div>
               {lawyers?.filter(lawyer => !user?.lawyers.includes(lawyer._id)).map(l => (
                  <>
                     <div>{l.name}</div>
                     <button className="h-10 bg-violet-800 rounded-lg" onClick={() => handleConnect(l._id)}>Connect</button>
                  </>
               ))}
            </div>
            <div>
               <div>Connected lawyers</div>
               {lawyers?.filter(lawyer => user?.lawyers.includes(lawyer._id)).map(l => (
                  <>
                     <div>{l.name}</div>
                  </>
               ))}

            </div>
         </div>
         <div className='min-h-[500px]'>
            <ChatUser lawyers={lawyers} user={user} />
         </div>
      </div>
   )
}

export default UserPage