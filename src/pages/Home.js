import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Updates from '../components/Updates'
import CaseStatusTracking from '../components/CaseStatusTracking'
import HomeUpdate from '../components/HomeUpdate'
import { Context } from '../Context/Context'

const Home = () => {
   return (
      <div className=''>

         <Hero />
         <HomeUpdate />
         {/* <CaseStatusTracking /> */}
         <Footer />
         {/* <Link to={'user/login'} >UserLogin</Link>
         <Link to={'user/register'} >UserRegister</Link>
         <Link to={'lawyer/login'} >LawyerLogin</Link>
         <Link to={'lawyer/register'} >LawyerRegister</Link>
         <Link to={'post'} >Post</Link>
         <Link to={'chat'}>Chat</Link>
         <Link to={'connect'}>Connect</Link>
         <Link to={'chatbot'}>Chatbot</Link>

         {/* <Link to={'chatbot'}>Chatbot</Link>
         <Link to={'chatbot'}>Chatbot</Link>  */}

      </div>
   )
}

export default Home