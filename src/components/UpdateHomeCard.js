import React, { useState } from 'react'

const UpdateHomeCard = ({ news }) => {

   const [more, setMore] = useState(false)
   return (
      <div className='flex flex-col sm:flex-row min-w-[80%] sm:w-[60%] md:min-w-[600px] bg-[#30475E] rounded-[10px]  sm:h-[220px] '>
         <div className='sm:w-[40%] md:p-[20px]'>
            <img className="h-full w-full" src={require("../images/4906332.png")} alt='img' />
         </div>
         <div className='p-[10px] sm:p-[20px] sm:w-[60%]  rounded-r-[30px]'>
            <div className='text-[20px] sm:text-[24px] font-bold mb-[20px]'>
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