import React, { createContext, useMemo, useContext, useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { allUsersRoute, getConnectionsRoute, host, userRoute } from "../utils/APIRoutes";
import axios from "axios";
import { isAuth } from "../utils/Utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookie from "js-cookie"
import newsData from "../utils/newsData"


export const Context = createContext(null);


export const Provider = (props) => {
   const [lawyers, setLawyers] = useState(null);
   const [users, setUsers] = useState(null);
   const [connections, setConnections] = useState([]);
   const [allUsers, setAllUsers] = useState()
   const [userData, setUser] = useState(null)
   const [news,setNews]= useState()
   const socket = useMemo(() => io(host), []);
   const auth = isAuth()
   const token = cookie.get('token')
   const config = {
      headers: { Authorization: `Bearer ${token}` }
   };
   useEffect(() => {
      socket.emit("newUser", auth?._id);
   }, [auth, socket])
   const fetchAllUsers = useCallback(async () => {
      try {
         const response = await axios.get(allUsersRoute)
         if (response) {
            console.log(response.data)
            setAllUsers(response.data)
         }
      } catch (err) {
         console.log(err)
      }
   }, [])

   const fetchUser = useCallback(async () => {
      try {
         const response = await axios.get(userRoute, config)
         if (response) {
            console.log(response.data)
            setUser(response.data)
         }
      } catch (err) {
         console.log(err)
      }
   }, [])

   useEffect(() => {
      fetchUser()
   },[])

   const filterUsers = useCallback(() => {
      if (allUsers) {
         setLawyers(allUsers?.filter(user => (user.role === 1)))
         setUsers(allUsers?.filter(user => (user.role === 0)))
      }
   }, [allUsers])

   useEffect(() => {
      setConnections(allUsers?.filter(user => userData?.connections?.includes(user._id)))
   },[userData,allUsers])

   const getNews = useCallback(async () => {
      // const response = await axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=")
      // if (response.status === 200) {
      //    setNews(response.data.articles)
      // } else {
         setNews(newsData)
      // }
   }, [])
   
   useEffect(() => {
      getNews()
   },[getNews])

   useEffect(() => {
      fetchAllUsers()
   }, [fetchAllUsers])

   useEffect(() => {
      filterUsers()
   }, [filterUsers])


   const showToastMessage = (message) => {
      toast.success(message);
   }


   return (
      <Context.Provider value={{ socket, auth, userData, lawyers, users, allUsers, connections, showToastMessage, token, news, fetchUser }}>
         {props.children}
      </Context.Provider>
   );
};