import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import indianLawyersData from '../utils/indianLawyersData';
import axios from 'axios';
import { allLawyersRoute, allUsersRoute, connectLawyerRoute, getUserRoute, host, recommandLawyerRoute, sendRequestRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router';
import { isAuth } from '../utils/Utils';
import Stars from '../components/starRating';
import ConnectPopup from '../components/ConnectPopup';
import { Context } from '../Context/Context';
import pdfToText from 'react-pdftotext'

const Connect = () => {
  const { lawyers, userData, connections, auth, socket, showToastMessage } = useContext(Context);
  const [open, setOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [recommended, setRecommended] = useState()
  const [connectLawyer, setConnectLawyer] = useState()

  const searchLawyer = async (text) => {
    try {
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
    console.log(text)
    searchLawyer(text)
  }


  return (
    <div className="w-full h-screen flex flex-col items-center md:flex-row pt-[80px]">
      <div className='flex h-full gap-4 flex-col px-4 items-center w-full md:w-[30%] '>
        <div className='page-title'>Search for Lawyers</div>
        <div className="connect-form w-full px-4">
          <input
            className='w-full p-2 bg-[#30475E] rounded-[12px] focus:outline-none'
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="connect-form">
          <div onClick={()=>document.getElementById("fileupload").click()} className='p-3 bg-[#F05454] flex justify-center items-center w-full text-[20px] rounded-lg'>
            Upload FIR to search
          </div>
          <input
            id='fileupload'
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={(e) => handleFileUpload(e)}
            hidden
          />
        </div>
      </div>
      <div className='h-full mt-5 w-full md:w-[60%] flex flex-col gap-3 overflow-y-scroll items-center no-scrollbar px-4'>
        {lawyers?.filter(l => l.bio?.includes(searchText) || l.name?.includes(searchText) || l.fields?.includes(searchText) || l.tags?.includes(searchText))
          .map((lawyer, index) => (
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
              <p className="lawyer-bio">{lawyer.bio}</p>
              <div className="bg-[#F05454] text-[20px] text-center rounded-[12px] py-2" onClick={() => handleOpen(lawyer._id)}>
                {connections?.filter(c => c._id === lawyer._id).length ===1 ? "Connected" : "Connect"}
              </div>
            </div>
          ))}
      </div>
      <ConnectPopup open={open} connectLawyer={connectLawyer} setOpen={() => setOpen(!open)} />
    </div>
  );
};

export default Connect;
