import React, { useContext } from 'react'
import newsData from '../utils/newsData'
import UpdateHomeCard from './UpdateHomeCard'
import { Context } from '../Context/Context'

const HomeUpdate = () => {
   const { news } = useContext(Context)
   return (
      <div className='flex w-full flex-col pt-[30px] sm:pt-[100px]'>
         <div className='flex flex-col items-center'>
            <div className="w-[69px] h-[5px]" style={{ background: 'linear-gradient(225deg, #F76680 0%, #57007B 100%)' }}> </div>
            <div className='page-title text-center'>
               Updates<br /> Your Daily Legal News Feed
            </div>
         </div>
         <div className='my-2 sm:my-[80px] w-full'>
            <div className='flex w-full gap-[34px] items-center overflow-x-scroll no-scrollbar px-[40px]'>
               {news?.slice(0, 4).map(news => (
                  <UpdateHomeCard news={news} />
               ))}
            </div>
         </div>
      </div>
   )
}

export default HomeUpdate