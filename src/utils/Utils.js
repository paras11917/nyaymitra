import cookie from "js-cookie"
import { logoutRoute } from "./APIRoutes"

export const isAuth = () => {
   // if (process.browser) {
      if (cookie.get('token')) {
         if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'))
         } else {
            return false
         }
      } else  {
         return false
      }
   // }
}

export const logout = async (next) => {
   if ( cookie.get('token')) {
       cookie.remove('token')
   } 
   if (localStorage.getItem('user')) {
      localStorage.removeItem('user')
   } 

   return fetch(logoutRoute, {
      method: 'GET'
   }).then(response => {
      console.log('signout success')
   }).catch(err => console.log(err))
}