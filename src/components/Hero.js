import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom"
const { Heroimg } = require("../images/Hero-Wrapper__image--center.svg")
export const Hero = () => {
  const navigate = useNavigate()
  const [role, setRole] = useState(null)
  console.log(role)
  return (

    <div className="w-full flex flex-col justify-center items-center">
      <div className="mt-[100px] md:mt-[200px] mx-[20px] flex justify-center flex-col-reverse md:flex-row">
        <div className="">
          <div className="text-[30px] text-center sm:text-start md:text-[53px] font-extrabold ">
            Select, Connect and
            Resolve
          </div>
          <div className="md:text-[18px] text-center sm:text-start font-400 not-italic mb-[56px] mt-[28px]">
            Empowering You to Choose, Connect, and Achieve Justice – Where Freedom Begins
          </div>
          <div className="flex items-center flex-row gap-[32px]">
              <Link to={'/signup'} state={{role:"user"}}  className="font-bold flex flex-col items-center justify-center  rounded-[5px] bg-[#F05454] w-[100px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] ">
              User
              </Link>
            <Link to={'/signup'} state={{role: "lawyer" }} className="font-bold flex flex-col items-center justify-center  rounded-[5px] bg-[#F05454] w-[100px] py-[20px] shadow-[_0px_4px_49px_0px_rgba(_0,_0,_0,_0.15)] ">
              Lawyer
              </Link>
            </div>
        </div>
        <div className="h-full max-w-[500px]">
          <img className="h-full w-full" src={require("../images/8778033.png")} alt="hero" />
        </div>
      </div >
    </div >
  );
}
