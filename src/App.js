import './styles/App.css';
import './styles/Styles.css'
import './styles/Style.css'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Updates from "./components/Updates";
import Chatbot from "./pages/Chatbot";
import Connect from "./pages/Connect";
import Chat from "./pages/Chat";
import CaseStatusTracking from "./components/CaseStatusTracking";
import Community from "./pages/Community";
import { Activate } from './pages/Activate';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Provider } from './Context/Context';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Provider>
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
          <Route path="/chat" element={<Chat />} />

          <Route path="/tracking" element={<CaseStatusTracking />} />
        </Routes>
        <ToastContainer />

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
      </Provider>
    </BrowserRouter>
  );
}

export default App;
