import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { logoutRoute } from "../utils/APIRoutes";
import axios from "axios";
import { Link, NavLink, useLocation, useParams } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";


const Navigation = () => {
    const [userID, setUserID] = useState(null);
    const navigate = useNavigate();
    const path = useLocation().pathname
    const [open, setOpen] = useState(false)
    const ref = useRef(null);
    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef?.current?.contains(e.target)) {
                setOpen(false);
                console.log(menuRef.current);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

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

    const logout = async () => {
        try {
            const id = await JSON.parse(localStorage.getItem("nayay"))._id;
            const data = await axios.get(`${logoutRoute}/${id}`);
            if (data.status === 200) {
                localStorage.clear();
                setUserID(null)
                navigate("/");
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="w-full fixed flex flex-row items-center justify-between px-[10px] lg:px-[30px] py-[20px] backdrop-blur-xl">
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

                <NavLink to={"/community"} className={`${path === "/community" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Community</NavLink>
                <NavLink to={"/updates"} className={`${path === "/updates" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Updates</NavLink>
                <NavLink to={"/"} className={`${path === "/ugy" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Nyay Kosh</NavLink>
                <NavLink to={"/connect"} className={`${path === "/connect" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Connect</NavLink>
                {/* <NavLink to={"/tracking"} className={`${path === "/tracking" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Track</NavLink> */}
                <NavLink className="text-[16px] text-[ #DDDDDD] font-[500] leading-[25px]">Profile</NavLink>
                <NavLink className="text-[16px] text-[ #DDDDDD] font-[500] leading-[25px]">Contact us</NavLink>

            </div>

            <div className="flex gap-3">
                {/* <div className="max-w-[124px] h-[42px] px-[25px] py-[14px] text-[14px] font-[600] leading-[14px] rounded-[5px] bg-gradient-to-r from-[#6675F7]
                           to-[#57007B]">Contact us</div> */}

                {userID && <div onClick={logout} className="max-w-[124px] h-[42px] px-[25px] py-[14px] text-[14px] font-[600] leading-[14px] rounded-[5px] bg-gradient-to-r from-[#6675F7]
                           to-[#57007B]">Logout</div>}
            </div>
            <div onClick={() => setOpen(!open)} className='text-blue-500 md:hidden text-[24px]'>{!open ? <GiHamburgerMenu /> : <RxCross1 />}</div>


            {open && (

                <div className="flex fixed w-[50%] top-[74px] shadow-lg p-[40px] h-screen backdrop-blur-3xl bg-white right-0 flex-col md:hidden items-center gap-[40px] ">
                    <NavLink to={"/"} className={`${path === "/" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Home</NavLink>
                    <NavLink to={"/community"} className={`${path === "/community" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Community</NavLink>
                    <NavLink to={"/updates"} className={`${path === "/updates" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Updates</NavLink>
                    <NavLink to={"/"} className={`${path === "/ugy" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Nyay Kosh</NavLink>
                    <NavLink to={"/connect"} className={`${path === "/connect" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Connect</NavLink>
                    {/* <NavLink to={"/tracking"} className={`${path === "/tracking" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Track</NavLink> */}
                    <NavLink className={`${path === "/" ? "text-[#F05454] font-bold" : "text-[#dddddd]"} hover:text-[#F05454]   `}>Profile</NavLink>
                    <div className="max-w-[124px] h-[42px] px-[25px] py-[14px] text-[14px] font-[600] leading-[14px] rounded-[5px] bg-gradient-to-r from-[#6675F7]
                           to-[#57007B]">Contact us</div>

                    {userID && <div onClick={logout} className="max-w-[124px] h-[42px] px-[25px] py-[14px] text-[14px] font-[600] leading-[14px] rounded-[5px] bg-gradient-to-r from-[#6675F7]
                           to-[#57007B]">Logout</div>}

                </div>

            )}
        </div>
    );
}


export default Navigation;