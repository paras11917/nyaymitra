import React, { useState } from 'react'

const UpdateCard = ({ news }) => {
   const [more, setMore] = useState(false)
   return (
      <div className='flex flex-col md:flex-row  w-[80%] bg-[#30475E] rounded-[10px]'>
         <div className='w-full sm:w-[300px] '>
            <img className="h-full w-full" src={require("../images/Case-study__image.png")} alt='img' />
         </div>
         <div className='p-[20px]  sm:w-[70%]  rounded-r-[30px]'>
            <div className='text-[28px] font-[600] leading-[38px]  mr-[27px] mb-[20px]'>
               {news.title}

            </div>
            <div className='mr-[47px] flex flex-wrap text-[14px] font-[400] leading-[22px]  mb-[20px]'>
               {more ? news.content : news.content?.split(0, 100)[0]}
            </div>
            <div onClick={() => setMore(!more)} className='text-[14px] font-[600] leading-[14px] bg-clip-text text-transparent bg-gradient-to-r from-[#F76680]
                           to-[#F05454] text-right'>
               Read {!more ? "more" : "less"}
            </div>
         </div>
      </div>
   )
}

export default UpdateCard