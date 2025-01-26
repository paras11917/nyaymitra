import React from 'react'
import { Link } from 'react-router-dom'

const UpdateHomeCard = ({ news }) => {
   return (
      <Link to={news.url} target='_blank' className='flex flex-col sm:flex-row min-w-[80%] sm:w-[60%] md:min-w-[600px] bg-[#30475E] rounded-[10px]  sm:h-[220px] '>
         <div className='sm:w-[40%]'>
            <img className="h-full w-full rounded-t-[10px] sm:rounded-l-[10px] sm:rounded-tr-[0px]" src={news.urlToImage || require("../images/4906332.png")} alt='img' />
         </div>
         <div className='p-[10px] sm:p-[20px] sm:w-[60%]  rounded-r-[30px]'>
            <div className='text-[20px] sm:text-[24px] font-bold mb-[20px]'>
               {news.title}
            </div>
         </div>
      </Link>
   )
}

export default UpdateHomeCard