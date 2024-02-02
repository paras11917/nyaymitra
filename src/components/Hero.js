import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom"
const { Heroimg } = require("../images/Hero-Wrapper__image--center.svg")
export const Hero = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState(null)
  return (

    <div className="w-full flex flex-col justify-center items-center">
      <div className="mt-[100px] md:mt-[200px] mx-[20px] flex justify-center flex-col-reverse md:flex-row">
        <div>
          <div className="text-[30px] md:text-[53px] font-extrabold ">
            Select, Connect and
            Resolve
          </div>
          <div className="md:text-[18px] font-400 not-italic mb-[56px] mt-[28px]">
            Empowering You to Choose, Connect, and Achieve Justice – Where Freedom Begins
          </div>
          {!role ?

            <div className="flex items-center  flex-row gap-[32px]">
              <div onClick={() => setRole("user")} className="font-bold flex flex-col items-center justify-center  rounded-[5px] bg-[#F05454] w-[100px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] ">
                User
              </div>
              <div onClick={() => setRole("lawyer")} className="font-bold flex flex-col items-center justify-center  rounded-[5px] bg-[#F05454] w-[100px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)]">
                Lawyer
              </div>
            </div>
            : role && role === "user" ?

              <div className="flex items-center  flex-row gap-[32px]">
                <Link to={"/user/login"} className="font-bold flex flex-col items-center justify-center  rounded-[5px] bg-[#F05454] w-[100px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] ">
                  Login
                </Link>
                <Link to={"/user/register"} className="font-bold flex flex-col items-center justify-center  rounded-[5px] bg-[#F05454] w-[100px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] ">
                  Sign Up
                </Link>
              </div>
              : role && role === "lawyer" ?

                <div className="flex items-center  flex-row gap-[32px]">
                  <Link to={"/lawyer/login"} className="font-bold flex flex-col items-center justify-center  rounded-[5px] bg-[#F05454] w-[100px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] ">
                    Login
                  </Link>
                  <Link to={"/lawyer/register"} className="font-bold flex flex-col items-center justify-center  rounded-[5px] bg-[#F05454] w-[100px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] ">
                    Sign Up
                  </Link>
                </div>
                : ""}

        </div>
        <div className="h-full max-w-[500px]">
          <img className="h-full w-full" src={require("../images/8778033.png")} alt="hero" />
        </div>
      </div >
    </div >
  );
}
