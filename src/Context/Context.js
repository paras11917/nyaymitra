import React, { createContext, useMemo, useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { allUsersRoute, host, userRoute } from "../utils/APIRoutes";
import axios from "axios";
import { isAuth } from "../utils/Utils";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookie from "js-cookie"
import newsData from "../utils/newsData"


export const Context = createContext(null);


export const Provider = (props) => {
   const [userData, setUser] = useState(null)
   const [news, setNews] = useState()
   const socket = useMemo(() => io(host), []);
   const auth = isAuth()
   const token = cookie.get('token')
   
   useEffect(() => {
      socket.emit("newUser", auth?._id);
   })

   const fetchUser = useCallback(async () => {
      try {
         if (!token) return
         const response = await axios.get(userRoute, { headers: { Authorization: `Bearer ${token}` } })
         if (response) {
            setUser(response.data)
         }
      } catch (err) {
         console.log(err)
      }
   }, [token])

   useEffect(() => {
      fetchUser()
   }, [fetchUser])

   

   // const fetchAllLawyers = ({ page, limit, role }) = useCallback(async () => {
   //    try {
   //       const response = await axios.get(`${allUsersRoute}?page=${page}&limit=${limit}&role=${role}`)
   //       if (response) {
   //          setLawyers(response.data)
   //       }
   //    } catch (err) {
   //       console.log(err)
   //    }
   // }, [])




   const getNews = useCallback(async () => {
      // const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=af3e8f8641d642e2b4ec973c47245b97`)
      // if (response.status === 200) {
      //    setNews(response.data.articles)
      // }
      // // else {
      setNews(newsData)
      // }
   }, [])

   useEffect(() => {
      getNews()
   }, [getNews])



   const showToastMessage = (message) => {
      toast.success(message);
   }


   return (
      <Context.Provider value={{ socket, auth, userData, showToastMessage, token, news, fetchUser }}>
         {props.children}
      </Context.Provider>
   );
};