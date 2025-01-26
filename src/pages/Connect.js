import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { allUsersRoute, recommandLawyerRoute } from '../utils/APIRoutes';
import { isAuth } from '../utils/Utils';
import Stars from '../components/starRating';
import ConnectPopup from '../components/ConnectPopup';
import { Context } from '../Context/Context';
import pdfToText from 'react-pdftotext'
import { FaArrowCircleDown } from 'react-icons/fa';

const Connect = () => {
  const {  connections, showToastMessage } = useContext(Context);
  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [File, setFile] = useState();
  const [recommended, setRecommended] = useState([])
  const [connectLawyer, setConnectLawyer] = useState()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const hasFetched = useRef(false);
  
  const fetchAllLawyers = useCallback(async () => {
    try {
      const response = await axios.get(`${allUsersRoute}?page=${page}&limit=10&role=1`)
      if (response) {
        setRecommended((prev)=>[...prev, ...response.data])
      }
    } catch (err) {
      console.log(err)
    }
  }, [page])

  
  const SearchByText = async(e) => {
    setSearchText(e.target.value)
    try {
      const response = await axios.get(`${allUsersRoute}?page=${page}limit=20&role=1$search=${searchText}`)
      if (response) {
        setRecommended(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const loadmore = () => {
    setPage(page + 1)
    fetchAllLawyers()
  }

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchAllLawyers()
    }
  },[fetchAllLawyers])

  const searchLawyer = async (text) => {
    try {
      setLoading(true)
      const data = {
        "text":text
      }
      const response = await axios.post(recommandLawyerRoute, data)
      if (response) {
        setRecommended(response.data)
        console.log(response.data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpen = (id) => {
    if (!isAuth()) {
      showToastMessage("Login to Connect")
    } else {
      setConnectLawyer(id)
      setOpen(true)
    }
  }

  const handleFileUpload = async (e) => {
    const text = await pdfToText(e.target.files[0])
    setFile(URL.createObjectURL(e.target.files[0]))
    console.log(text)
    searchLawyer(text)
  }

  return (
    <div className="w-full h-screen flex flex-col items-center md:flex-row pt-[80px]">
      <div className='flex h-full gap-4 flex-col px-4 items-center w-full md:w-[30%] '>
        <div className='page-title'>Search for Lawyers</div>
        {/* <div className="connect-form w-full px-4">
          <input
            className='w-full p-2 bg-[#30475E] rounded-[12px] focus:outline-none'
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => SearchByText(e)}
          />
        </div> */}

        <div onClick={()=>setPage(1)} className='p-3 bg-[#F05454] flex justify-center items-center w-full text-[20px] rounded-lg'>
          All Lawyers
        </div>

        <div className="connect-form">
          {loading ? <div className='p-3 bg-[#F05454] flex justify-center items-center w-full text-[20px] rounded-lg' >Loading</div>  :<button onClick={()=>document.getElementById("fileupload").click()} className='p-3 bg-[#F05454] flex justify-center items-center w-full text-[20px] rounded-lg'>
            Upload FIR to search
          </button>}
          <input
            id='fileupload'
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={(e) => handleFileUpload(e)}
            hidden
          />
          {/* <PDFViewer
            document={{
              url: File,
            }}
          /> */}
        </div>
      </div>
      <div className='h-full mt-5 w-full md:w-[60%] flex flex-col gap-3 overflow-y-scroll items-center no-scrollbar px-4'>
        {recommended?.map((lawyer, index) => (
            <div key={index} className='flex  flex-col rounded-[12px] gap-2 p-3 w-full  md:w-[60%] shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur-xl' >
              <div className="flex justify-between items-center">
                <div className="w-[50px] h-[50px] object-cover rounded-full mr-4">
                  <img src={require("../images/download.png")} alt={'#'} className="w-full h-full rounded-full" />
                </div>
                <div className="text-[24px]">{lawyer.name}</div>
                <p>
                  <Stars rating={lawyer.rating} />
                </p>
              </div>
              <p className="lawyer-bio">{lawyer.tags}</p>
              <div className="bg-[#F05454] text-[20px] text-center rounded-[12px] py-2" onClick={() => handleOpen(lawyer._id)}>
                {connections?.filter(c => c._id === lawyer._id).length ===1 ? "Connected" : "Connect"}
              </div>
            </div>
          ))}
         <div onClick={loadmore} className=' items-center w-full flex flex-col mt-[38px] text-[50px] font-[600] leading-[27px] bg-clip-text text-[#F05454] '>
            <FaArrowCircleDown />
        </div>
        <button
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            display: "none", // Add logic to display this button only when scrolled down
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top
        </button>
      </div>
      <ConnectPopup open={open} connectLawyer={connectLawyer} setOpen={() => setOpen(!open)} />
    </div>
  );
};

export default Connect;
