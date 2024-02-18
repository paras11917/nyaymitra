import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
const Footer = () => {

    return (
        <div className="w-full backdrop-blur-xl shadow-xl shadow-white">
            <div className="flex flex-col md:flex-row items-center md:justify-between w-full p-[20px] md:p-[100px] border-b-[1px] border-b-[#30475E]">
                <div className="">
                    <div className="flex flex-row mb-[26px] gap-[10px] items-center">
                        <div className="w-[60px] h-[60px]">
                            <img className="h-full w-full" src={require("../images/Vector.png")} alt="t" />
                        </div>
                        <div className="flex flex-row">
                            <div className="text-[50px]  font-[400]">Nyay</div>
                            <div className="text-[50px]  font-[700]"> Mitra</div>
                        </div>
                    </div>
                    <div className="text-[18px]   font-[400] leading-[36px] max-w-[372px]">
                        Empowering You to Choose, Connect, and Achieve Justice – Where Freedom Begins
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row justify-between  gap-[80px]">
                    <div className="mt-[34px] ">
                        <div className="text-[24px] font-[700] leading-[21px] mb-[19px]">
                            Links
                        </div>
                        <div className="grid grid-cols-2 gap-x-[50px]">
                            <div className="text-[16px]   font-[400] leading-[37px]">Home</div>
                            <div className="text-[16px]   font-[400] leading-[37px]">Community</div>
                            <div className="text-[16px]   font-[400] leading-[37px]">Updates</div>
                            <div className="text-[16px]   font-[400] leading-[37px]">How it works</div>
                            <div className="text-[16px]   font-[400] leading-[37px]">Connect</div>
                            <div className="text-[16px]   font-[400] leading-[37px]">Track</div>
                            <div className="text-[16px]   font-[400] leading-[37px]">Profile</div>
                        </div>
                    </div>
                    <div className="md:mt-[34px]">
                        <div className="max-w-[306px] mb-[36px]">
                            <div className="text-[24px] font-[700] leading-[21px] mb-[24px]"> Contact us</div>
                            <div className="text-[18px]   font-[400] leading-[30px]">For any queries and feedback, You can connect the following</div>
                        </div>
                        <div className=" flex gap-[20px]">
                            <div className="flex flex-col items-center justify-center h-[50px] w-[50px] text-[34px]  p-3 rounded-full bg-[#F05454]"><FaFacebookF /></div>
                            <div className="flex flex-col items-center justify-center h-[50px] w-[50px] text-[34px]  p-3 rounded-full bg-[#F05454]"><FaInstagram /></div>
                            <div className="flex flex-col items-center justify-center h-[50px] w-[50px] text-[34px]  p-3 rounded-full bg-[#F05454]"><FaXTwitter /></div>
                            <div className="flex flex-col items-center justify-center h-[50px] w-[50px] text-[34px]  p-3 rounded-full bg-[#F05454]"><FaLinkedinIn /></div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col  items-center text-[16px] text-[#4A5568] font-[400] leading-[10px] py-[20px]">
                © 2023 Copyright by Paras Pipre. All rights reserved.
            </div>
        </div>
    );
}

export default Footer;