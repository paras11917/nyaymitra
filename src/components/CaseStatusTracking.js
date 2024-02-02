import React from "react";

const CaseStatusTracking = () => {

  return (
    <div className="w-full flex flex-col items-center">

      <div className="mb-[25px] w-full">
        <div className="gap-[20px] flex flex-col items-center mb-[36px]">
          <div className="w-[69px] h-[5px]" style={{ background: 'linear-gradient(225deg, #F76680 0%, #F05454 100%)' }}></div>
          <div>
            <div className="text-[35px]  font-[400] leading-[55px] text-center">Case Status Tracking </div>
            <div className="text-[25px]  font-[400] leading-[35px] text-center">Stay Informed: Your Case, Your Status</div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-row items-center justify-between px-[50px] w-full">
          <div>
            <select className="rounded-[5px] bg-[#DCDDE2] p-[8px] ">
              <option>Case Type (Category)</option>
              <option>Criminal</option>
              <option>Civil</option>
            </select>
          </div>
          <div className="flex gap-[16px]">
            <input type="text" className="rounded-[5px] text-center bg-[#DCDDE2] p-[4px]" defaultValue="Case Number" />
            <input type="text" className="rounded-[5px] text-center bg-[#DCDDE2] p-[4px]" defaultValue="Year" />
            <div className="rounded-[5px] text-center bg-[#DCDDE2] p-[4px]">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"></path>
              </svg>
            </div>
          </div>
        </div> */}




      <div className="mx-[100px] pb-[25px]">
        <div className="flex flex-row justify-between items-center px-[50px] pt-[50px] gap-4">
          <div>
            <div className="rounded-[9px] border-[1px]  border-[#30475E] w-[299px] h-[159px] p-[22px]">
              <div className="text-[18px] font-[700]   mb-[15px]">
                <span className="text-[18px] font-[700] bg-clip-text text-transparent bg-gradient-to-r from-[#222831]
                           to-[#F05454] text-right">#1</span> Assemble the right team
              </div>
              <div className="text-[14px] font-[400] leading-[20px] text-[#718096]">
                We handle all aspects of vetting and choosing the right team that you don't have the time, expertise, or desire to do.
              </div>
            </div>
            <div className="h-[40px] w-[50%] border-r-[4px] border-[#F05454] mt-[15px]"
            ></div>
          </div>
          <div>
            <div className="rounded-[9px] border-[1px]  border-[#30475E] w-[299px] h-[159px] p-[22px]">
              <div className="text-[18px] font-[700]   mb-[15px]"><span className="text-[18px] font-[700] bg-clip-text text-transparent bg-gradient-to-r from-[#F76680]
                           to-[#F05454] text-right">#3</span> Tech architecture</div>
              <div className="text-[14px] font-[400] leading-[20px] text-[#718096]">We break monolithic apps into microservices. Decoupling the code allows teams to move faster and more independently</div>
            </div>
            <div className="h-[40px] w-[50%] border-r-[4px] border-[#F05454] mt-[15px]"
            ></div>
          </div>
          <div>
            <div className="rounded-[9px] border-[1px]  border-[#30475E] w-[299px] h-[159px] p-[22px]">
              <div className="text-[18px] font-[700]   mb-[15px]"><span className="text-[18px] font-[700] bg-clip-text text-transparent bg-gradient-to-r from-[#F76680]
                           to-[#F05454] text-right">#5</span> Code reviews</div>
              <div className="text-[14px] font-[400] leading-[20px] text-[#718096]">Code reviews before release help detect issues like memory leaks, file leaks, performance signs, and general bad smells</div>
            </div>
            <div className="h-[40px] w-[50%] border-r-[4px] border-[#F05454] mt-[15px]"
            ></div>
          </div>

        </div>
        <div className="flex flex-row justify-between items-center border-t-[4px] border-[#F05454] pl-[100px] ">
          <div>
            <div className="h-[40px] w-[50%] border-r-[4px] border-[#F05454] mb-[15px]"
            ></div>
            <div className="rounded-[9px] border-[1px]  border-[#30475E] w-[299px] h-[159px] p-[22px]">
              <div className="text-[18px] font-[700]   mb-[15px]"><span className="text-[18px] font-[700] bg-clip-text text-transparent bg-gradient-to-r from-[#F76680]
                           to-[#F05454] text-right">#2</span> Sprint planning</div>
              <div className="text-[14px] font-[400] leading-[20px] text-[#718096]">Sprint roadmap is a collective planning effort. Team members collaborate to clarify items and ensure shared understanding.</div>
            </div>
          </div>
          <div>
            <div className="h-[40px] w-[50%] border-r-[4px] border-[#F05454] mb-[15px]"
            ></div>
            <div className="rounded-[9px] border-[1px]  border-[#30475E] w-[299px] h-[159px] p-[22px]">
              <div className="text-[18px] font-[700]   mb-[15px]"><span className="text-[18px] font-[700] bg-clip-text text-transparent bg-gradient-to-r from-[#F76680]
                           to-[#F05454] text-right">#4</span> Standups & weekly demos</div>
              <div className="text-[14px] font-[400] leading-[20px] text-[#718096]">Standups, weekly demos, and weekly reviews make sure everyone is on the same page and can raise their concerns.</div>
            </div>
          </div>
          <div>
            <div className="h-[40px] w-[50%] border-r-[4px] border-[#F05454] mb-[15px]"
            ></div>
            <div className="rounded-[9px] border-[1px]  border-[#30475E] w-[299px] h-[159px] p-[22px]">
              <div className="text-[18px] font-[700]   mb-[15px]"><span className="text-[18px] font-[700] bg-clip-text text-transparent bg-gradient-to-r from-[#F76680]
                           to-[#F05454] text-right">#6</span> Iterative delivery</div>
              <div className="text-[14px] font-[400] leading-[20px] text-[#718096]">We divide the implementation process into several checkpoints rather than a single deadline.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}


export default CaseStatusTracking;