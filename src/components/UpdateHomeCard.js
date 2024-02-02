import React, { useState } from 'react'

const UpdateHomeCard = ({ news }) => {

   const [more, setMore] = useState(false)
   return (
      <div className='flex flex-row w-[60%] md:min-w-[600px] bg-[#30475E] rounded-[10px] h-[220px] '>
         <div className='w-[40%] p-[20px]'>
            <img className="h-full w-full object-contain" src={require("../images/4906332.png")} alt='img' />
         </div>
         <div className='p-[20px] w-[60%]  rounded-r-[30px]'>
            <div className='text-[24px] font-bold mb-[20px]'>
               {news.title?.slice(0, 40)}...

            </div>
            <div className=' flex flex-col flex-wrap text-[14px] mb-[20px]'>
               {news.content?.slice(0, 100)}...
            </div>
         </div>
      </div>
   )
}

export default UpdateHomeCard