import React, { useState } from 'react'
import newsData from "../utils/newsData"
import UpdateCard from './UpdateCard'
import { FaArrowCircleDown } from "react-icons/fa";

const Updates = () => {
   const [num, setNum] = useState(3)
   const more = () => {
      if (num + 3 < newsData.length) setNum(num + 3)
      else setNum(newsData.length)
   }
   return (
      <div className='flex w-full flex-col pt-[100px]'>
         <div className='flex flex-col items-center'>
            <div className="w-[69px] h-[5px]" style={{ background: 'linear-gradient(225deg, #F76680 0%, #57007B 100%)' }}> </div>
            <div className='page-title text-center'>
               Updates<br /> Your Daily Legal News Feed
            </div>
         </div>
         <div className='my-[80px] w-full'>
            <div className='flex w-full flex-col gap-[34px] items-center '>
               {newsData?.slice(0, num).map(news => (
                  <UpdateCard news={news} />
               ))}

            </div>

            {num !== newsData.length && <div onClick={more} className=' items-center w-full flex flex-col mt-[38px] text-[50px] font-[600] leading-[27px] bg-clip-text text-[#F05454] '>
               <FaArrowCircleDown />
            </div>}
         </div>
      </div>
   )
}

export default Updates;
