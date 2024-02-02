import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
const Footer = () => {

    return (
        <div className="w-full backdrop-blur-xl shadow-xl shadow-white">
            {/* <div className="px-[106px]">

                <div className="gap-y-[20px] items-center h-[133px] mt-[70px]">
                    <div className="w-[69px] h-[5px]" style={{ background: 'linear-gradient(225deg, #F76680 0%, #57007B 100%)' }}></div>
                    <div className="h-[108px]">
                        <div className="text-[35px] font-[400] leading-[55px] text-[#1A202C]">Meet the People
                        </div>
                        <div className="text-[35px] font-[700] leading-[55px] text-[#1A202C]">
                            We are Working With</div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-[22px] w-full justify-end mb-[32px]">

                    <div className="rounded-full p-[4px] border-[2px] border-[#57007B]">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.0625 10.5625H6.94375L10.3469 6.47495C10.506 6.2835 10.5826 6.03667 10.5597 5.78877C10.5369 5.54088 10.4165 5.31221 10.225 5.15308C10.0335 4.99395 9.78672 4.91739 9.53882 4.94025C9.29092 4.9631 9.06225 5.0835 8.90312 5.27495L4.21563 10.9C4.18409 10.9447 4.15589 10.9917 4.13125 11.0406C4.13125 11.0875 4.13125 11.1156 4.06563 11.1625C4.02313 11.2699 4.00088 11.3844 4 11.5C4.00088 11.6155 4.02313 11.73 4.06563 11.8375C4.06563 11.8843 4.06562 11.9125 4.13125 11.9593C4.15589 12.0082 4.18409 12.0552 4.21563 12.1L8.90312 17.725C8.99127 17.8308 9.10165 17.9159 9.22642 17.9742C9.35118 18.0326 9.48727 18.0627 9.625 18.0625C9.84405 18.0629 10.0563 17.9866 10.225 17.8468C10.3199 17.7681 10.3984 17.6715 10.4559 17.5624C10.5134 17.4533 10.5489 17.334 10.5602 17.2112C10.5715 17.0884 10.5585 16.9646 10.5219 16.8468C10.4853 16.7291 10.4258 16.6197 10.3469 16.525L6.94375 12.4375H18.0625C18.3111 12.4375 18.5496 12.3387 18.7254 12.1629C18.9012 11.9871 19 11.7486 19 11.5C19 11.2513 18.9012 11.0129 18.7254 10.837C18.5496 10.6612 18.3111 10.5625 18.0625 10.5625Z" fill="#57007B"/></svg>

                    </div>
                    <div className="rounded-full bg-[#57007B] p-[6px]">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.9375 10.5625H16.0562L12.6531 6.47495C12.494 6.2835 12.4174 6.03667 12.4403 5.78877C12.4631 5.54088 12.5835 5.31221 12.775 5.15308C12.9665 4.99395 13.2133 4.91739 13.4612 4.94025C13.7091 4.9631 13.9377 5.0835 14.0969 5.27495L18.7844 10.9C18.8159 10.9447 18.8441 10.9917 18.8688 11.0406C18.8688 11.0875 18.8687 11.1156 18.9344 11.1625C18.9769 11.2699 18.9991 11.3844 19 11.5C18.9991 11.6155 18.9769 11.73 18.9344 11.8375C18.9344 11.8843 18.9344 11.9125 18.8688 11.9593C18.8441 12.0082 18.8159 12.0552 18.7844 12.1L14.0969 17.725C14.0087 17.8308 13.8983 17.9159 13.7736 17.9742C13.6488 18.0326 13.5127 18.0627 13.375 18.0625C13.156 18.0629 12.9437 17.9866 12.775 17.8468C12.6801 17.7681 12.6016 17.6715 12.5441 17.5624C12.4866 17.4533 12.4511 17.334 12.4398 17.2112C12.4285 17.0884 12.4415 16.9646 12.4781 16.8468C12.5147 16.7291 12.5742 16.6197 12.6531 16.525L16.0562 12.4375H4.9375C4.68886 12.4375 4.4504 12.3387 4.27459 12.1629C4.09877 11.9871 4 11.7486 4 11.5C4 11.2513 4.09877 11.0129 4.27459 10.837C4.4504 10.6612 4.68886 10.5625 4.9375 10.5625Z" fill="white"/></svg>

                    </div>
                </div>

            </div>
            <div className="h-[202px] w-full overflow-auto flex flex-col justify-center items-center bg-[#F7F7FA]">
                <div className="flex flex-row gap-[54px] ">
                    <img className="h-full w-full" src={require("../images/Logo-9.png")} alt="t" />
                    <img className="h-full w-full" src={require("../images/logo8.png")} alt="t" />
                    <img className="h-full w-full" src={require("../images/logo5.png")} alt="t" />
                    <img className="h-full w-full" src={require("../images/Logo-7.png")} alt="t" />
                    <img className="h-full w-full" src={require("../images/logo9.png")} alt="t" />
                    <img className="h-full w-full" src={require("../images/Logo-6.png")} alt="t" />
                    <img className="h-full w-full" src={require("../images/logo3.png")} alt="t" />
                </div>
            </div> */}
            <div className="">
                <div className="flex flex-col  w-full p-[100px] border-b-[1px] border-b-[#30475E]">
                    <div className=" flex flex-row justify-between  gap-[80px]">
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
                        <div className="mt-[34px]">
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

        </div>

    );
}

export default Footer;