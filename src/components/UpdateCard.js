import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UpdateCard = ({ news }) => {
   const [more, setMore] = useState(false)
   return (
      <Link to={news.url} target='_blank' className='flex flex-col md:flex-row  w-[80%] bg-[#30475E] rounded-[10px]'>
         <div className='w-full'>
            <img className="h-full w-full rounded-t-[10px] sm:rounded-l-[10px] sm:rounded-tr-[0px]" src={news.urlToImage || require("../images/Case-study__image.png")} alt='img' />
         </div>
         <div className='p-[20px] w-full rounded-r-[30px]'>
            <div className='text-[28px] font-[600] leading-[38px]  mr-[27px] mb-[20px]'>
               {news.title}

            </div>
            <div className='mr-[47px] flex flex-wrap text-[14px] font-[400] leading-[22px]  mb-[20px]'>
               {more ? news.description : news.description?.split(0, 100)[0]}
            </div>
         </div>
      </Link>
   )
}

export default UpdateCard