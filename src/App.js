import './App.css';
import './pages/Styles.css'
import './pages/Style.css'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";
import Updates from "./components/Updates";
// import Post from "./pages/Post";
import UserPage from "./pages/UserPage";
import LawyerPage from "./pages/LawyerPage";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import LawyerLogin from "./pages/LawyerLogin";
import LawyerRegister from "./pages/LawyerRegister";
import Chat from "./pages/ChatL";
import Chatbot from "./pages/Chatbot";
import Connect from "./pages/Connect";
import ChatL from "./pages/ChatL";
import ChatU from "./pages/ChatU";
import CaseStatusTracking from "./components/CaseStatusTracking";
import Community from "./pages/Community";
import Footer from './components/Footer';
// import PostPage from "./pages/PostPage";

function App() {
  return (
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/updates" element={<Updates />} />
           <Route path="user/login" element={<UserLogin />} />
          <Route path="user/register" element={<UserRegister />} />
          <Route path="lawyer/login" element={<LawyerLogin />} />
          <Route path="lawyer/register" element={<LawyerRegister />} />
        {/* <Route path="/post" element={<PostPage />} />*/}
          <Route path="/user/userpage" element={<UserPage />} />
          <Route path="/lawyer/lawyerpage" element={<LawyerPage />} />
           <Route path="/chatl" element={<ChatL />} />
           <Route path="/chatu" element={<ChatU />} />
           <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/connect" element={<ChatU />} />
          <Route path="/tracking" element={<CaseStatusTracking />} />
          <Route path="/community" element={<Community />} />  
      </Routes> 
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      </BrowserRouter>
  );
}

export default App;
