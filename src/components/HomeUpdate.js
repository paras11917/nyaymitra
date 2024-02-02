import React from 'react'
import newsData from '../pages/newsData'
import UpdateHomeCard from './UpdateHomeCard'

const HomeUpdate = () => {
   return (
      <div className='flex w-full flex-col pt-[100px]'>
         <div className='flex flex-col items-center'>
            <div className="w-[69px] h-[5px]" style={{ background: 'linear-gradient(225deg, #F76680 0%, #57007B 100%)' }}> </div>
            <div className='text-[35px] leading-[55px] text-center'>
               Updates<br /> Your Daily Legal News Feed
            </div>
         </div>
         <div className='my-[80px] w-full'>
            <div className='flex w-full gap-[34px] items-center overflow-x-auto no-scrollbar px-[40px]'>
               {newsData?.slice(0, 4).map(news => (
                  <UpdateHomeCard news={news} />
               ))}
            </div>
         </div>
      </div>
   )
}

export default HomeUpdate