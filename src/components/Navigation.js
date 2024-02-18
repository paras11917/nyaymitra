import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { logoutRoute } from "../utils/APIRoutes";
import axios from "axios";
import { Link, NavLink, useLocation, useParams } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { isAuth, logout } from "../utils/Utils";
import { IoIosNotifications } from "react-icons/io";
import { RiMessage3Fill } from "react-icons/ri";
import { IoPersonCircleSharp } from "react-icons/io5";

const Navigation = () => {
    const [userID, setUserID] = useState(null);
    const navigate = useNavigate();
    const path = useLocation().pathname
    const [open, setOpen] = useState(false)
    const ref = useRef(null);
    let menuRef = useRef();

    // useEffect(() => {
    //     let handler = (e) => {
    //         if (!menuRef?.current?.contains(e.target)) {
    //             setOpen(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", handler);
    //     return () => {
    //         document.removeEventListener("mousedown", handler);
    //     }
    // });

    // useEffect(() => {
    //     if (!localStorage.getItem("nayay")) {
    //         navigate("/");
    //     } else {
    //         setUserID(
    //             JSON.parse(localStorage.getItem("nayay"))._id
    //         );
    //     }
    // }, [])

    // const handleClick = () => {
    //     ref.current?.scrollIntoView({ behavior: 'smooth' });
    // };


    return (
        <div className="w-full fixed flex flex-row items-center justify-between px-[10px] lg:px-[30px] py-[20px] backdrop-blur-xl z-[100]">
            <div className="hover:cursor-pointer" onClick={() => navigate("/")}>
                <div className="flex flex-row gap-[10px] items-center">
                    <div className="w-[50px] h-[40px]">
                        <img className="h-full w-full" src={require("../images/Vector.png")} alt="home" />
                    </div>
                    <div className="flex flex-row">
                        <div className="text-[24px] leading-[34px] font-[400]">Nyay</div>
                        <div className="text-[24px] leading-[34px] font-[700]"> Mitra</div>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex flex-row items-center gap-4 lg:gap-[40px] justify-between">
                <NavLink to={"/"} className={`${path === "/" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Home</NavLink>

                <NavLink to={"/connect"} className={`${path === "/connect" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Lawyers</NavLink>
                <NavLink to={"/nyayai"} className={`${path === "/nyayai" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Nyay AI</NavLink>
                <NavLink to={"/community"} className={`${path === "/community" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Community</NavLink>
                <NavLink to={"/updates"} className={`${path === "/updates" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>News Feed</NavLink>
                {/* <NavLink to={"/tracking"} className={`${path === "/tracking" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Track</NavLink> */}

                {isAuth() && <> <NavLink to={`/profile/${isAuth().username}`} className="text-[32px] "><IoPersonCircleSharp /> {isAuth().name} </NavLink>
                    <div className="text-[28px] relative"><IoIosNotifications />
                        {true && <div className="w-2 h-2 absolute top-0 right-0 bg-[#F05454] rounded-full"></div>}
                    </div>
                    <div className="text-[28px] relative"><RiMessage3Fill />
                        {true && <div className="w-2 h-2 absolute top-0 right-0 bg-[#F05454] rounded-full"></div>}
                    </div></>}

            </div>

         
                {!isAuth() ? <Link to="/signin" className="h-10 bg-[#F05454] rounded-lg flex flex-col items-center justify-center px-2 " >Sign In</Link> : <button className="h-10 bg-[#F05454] rounded-lg px-2 " onClick={logout}>Logout</button>}
          
            <div onClick={() => setOpen(!open)} className='text-[#F05454] cursor-pointer font-extrabold md:hidden text-[24px]'>{!open ? <GiHamburgerMenu /> : <RxCross1 />}</div>


            {open && (

                <div className="flex fixed w-[50%] top-[80px] shadow-lg p-[40px] h-screen backdrop-blur-2xl bg-[#222831] right-0 flex-col md:hidden items-start gap-[40px] ">
                    <NavLink to={"/"} className={`${path === "/" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Home</NavLink>
                    <NavLink to={"/community"} className={`${path === "/community" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Community</NavLink>
                    <NavLink to={"/updates"} className={`${path === "/updates" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Updates</NavLink>
                    <NavLink to={"/nyayai"} className={`${path === "/nyayai" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Nyay Ai</NavLink>
                    <NavLink to={"/connect"} className={`${path === "/connect" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Lawyers</NavLink>
                    {/* <NavLink to={"/tracking"} className={`${path === "/tracking" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Track</NavLink> */}
                    <NavLink className={`${path === "/" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Profile</NavLink>
                    <NavLink className={`${path === "/" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Contact us</NavLink>


                    {userID && <div onClick={logout} className="max-w-[124px] h-[42px] px-[25px] py-[14px] text-[14px] font-[600] leading-[14px] rounded-[5px] bg-gradient-to-r from-[#6675F7]
                           to-[#57007B]">Logout</div>}

                </div>

            )}
        </div>
    );
}


export default Navigation;