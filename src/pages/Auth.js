import { useEffect } from 'react'
import { isAuth } from '../utils/Utils'
import { useNavigate } from 'react-router-dom'

const Auth = ({ children }) => {
   const navigate = useNavigate()
   useEffect(() => {
      if (!isAuth()) {
         navigate("/login")
      } else if (isAuth().role === 0) {
         
      } else if(isAuth().role === 1) {
         
      }
   }, [])
   return <>{children}</>
}

export default Auth