import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { acceptRequestRoute, logoutRoute, requestsRoute } from "../utils/APIRoutes";
import axios from "axios";
import { Link, NavLink, useLocation, useParams } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { isAuth, logout } from "../utils/Utils";
import { IoIosNotifications } from "react-icons/io";
import { RiMessage3Fill } from "react-icons/ri";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Context } from "../Context/Context";
import { MdDelete } from "react-icons/md";

const Navigation = () => {
    const { userData, socket, token } = useContext(Context)
    // console.log(userData, "userdata")
    const [userID, setUserID] = useState(null);
    const navigate = useNavigate();
    const path = useLocation().pathname
    const [open, setOpen] = useState(false)
    const [openNot, setOpenNot] = useState(false)
    const [popup, setPopup] = useState(false)
    const [openaccept, setOpenAccept] = useState(false)
    const ref = useRef(null);
    let menuRef = useRef();
    const [reqdata, setReqdata] = useState()
    const [requests,setRequests] = useState([])

    const [loading, setLoading] = useState(false)
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

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

    const fetchRequests = useCallback(async () => {
        try {
            const response = await axios.get(requestsRoute, config)
            if (response) {
                console.log(response.data)
                setRequests(response.data)
            }
        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        fetchRequests()
    }, [openNot])

    const handleOpenAccept = (r) => {
        setReqdata(r)
        console.log(r)
        console.log("ckickef")
        setOpenAccept(true)
        setOpenNot(false)
    }

    const handleAccept = async () => {
        setLoading(true)
        try {
            // socket.emit("request", {
            //     to: connectLawyer,
            //     from: auth,
            //     message: values.sub
            // });

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const response = await axios.post(acceptRequestRoute, { userid: reqdata.sender._id ,reqid:reqdata._id}, config);
            if (response) {
                setLoading(false)
                setOpenAccept(false)
                console.log(response)
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    };

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


            </div>

            <div className="flex gap-4 items-center">
                {!isAuth() ?
                    <Link to="/signin" className="h-10 bg-[#F05454] rounded-lg flex flex-col items-center justify-center px-2 " >Sign In</Link> :

                    <div className="flex flex-row items-center gap-4 lg:gap-[40px] justify-between">
                        <div className="text-[28px] relative">
                            <button onClick={() => setOpenNot(!openNot)}>
                                <IoIosNotifications />
                            </button>
                            {true && <div className="w-2 h-2 absolute top-0 right-0 bg-[#F05454] rounded-full"></div>}
                            {openNot &&
                                <div className="absolute top-10 right-[-150px] w-[300px] h-[400px] rounded-[12px] p-2 shadow-xl shadow-white backdrop-blur-0 ">
                                    {requests?.map((r) => (
                                        <button onClick={() => handleOpenAccept(r)} className="border-[1px] text-[20px] p-2 flex justify-between">
                                            {r.sender.name} : {r.subject}
                                        </button>
                                    ))}
                                </div>
                            }
                        </div>
                        <Link to={"/chat"} className="text-[28px] relative"><RiMessage3Fill />
                            {true && <div className="w-2 h-2 absolute top-0 right-0 bg-[#F05454] rounded-full"></div>}
                        </Link>
                        <NavLink to={`/profile/${isAuth().username}`} className="text-[20px]  items-center gap-2 hidden sm:flex"> <span className="text-[32px]"><IoPersonCircleSharp /></span> {isAuth().name} </NavLink>
                        <button className="h-10 bg-[#F05454] rounded-lg px-2 hidden md:block" onClick={logout}>Logout</button>

                    </div>
                }

                <div onClick={() => setOpen(!open)} className='text-[#F05454] cursor-pointer font-extrabold md:hidden text-[24px]'>{!open ? <GiHamburgerMenu /> : <RxCross1 />}</div>
            </div>
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
                    {isAuth() && <button className="h-10 bg-[#F05454] rounded-lg px-2 " onClick={logout}>Logout</button>}
                </div>
            )}

            {openaccept && <div className={`absolute flex flex-col justify-center items-center w-screen h-screen top-0 right-0 backdrop-blur-3xl`}>
                <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-[50%]">
                    <div className="text-xl text-center mb-4">Accept Request</div>
                    <div className='absolute top-5 right-5 text-[24px]' onClick={() => setOpenAccept(false)}>
                        <RxCross2 />
                    </div>
                    <div>{reqdata.sender.name}</div>
                    <div>{reqdata.subject}</div>
                    <div>{reqdata.description}</div>

                    <button className="h-10 bg-[#F05454] rounded-lg" onClick={handleAccept}>Accept</button>
                </div>
            </div>}
        </div>
    );
}


export default Navigation;