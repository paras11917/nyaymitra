import './App.css';
import './pages/Styles.css'
import './pages/Style.css'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Updates from "./components/Updates";
// import Post from "./pages/Post";
import UserPage from "./pages/UserPage";
import LawyerPage from "./pages/LawyerPage";
import Chat from "./pages/ChatL";
import Chatbot from "./pages/Chatbot";
import Connect from "./pages/Connect";
import ChatL from "./pages/ChatL";
import ChatU from "./pages/ChatU";
import CaseStatusTracking from "./components/CaseStatusTracking";
import Community from "./pages/Community";
import Footer from './components/Footer';
import { Activate } from './pages/Activate';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import PostPage from "./pages/PostPage";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/auth/account/activate/:token" element={<Activate />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/community" element={<Community />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/nyayai" element={<Chatbot />} />

        <Route path="/chatl" element={<ChatL />} />
        <Route path="/chatu" element={<ChatU />} />
        <Route path="/tracking" element={<CaseStatusTracking />} />
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
