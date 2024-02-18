import React, { useEffect, useReducer, useRef, useState } from 'react';
import indianLawyersData from './indianLawyersData';
import axios from 'axios';
import { allLawyersRoute, allUsersRoute, connectLawyerRoute, getUserRoute, host, recommandLawyerRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router';
import { isAuth } from '../utils/Utils';
import ChatU from './ChatU';
import ChatL from './ChatL';
import { io } from 'socket.io-client';
import Stars from '../components/starRating';
import { useDropzone } from 'react-dropzone';

const Connect = () => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      searchLawyer()
    },
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [lawyers, setLawyers] = useState(null);
  const [users, setUsers] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [connectedLawyers, setConnectedLawyers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null)
  const socket = useRef()

  const auth = isAuth()

  useEffect(() => {
    // if (!isAuth()) {
    //   navigate("/")
    // } else {
    //   socket.current = io(host);
    //   socket.current.emit("newUser", auth.id);
    // }
  }, [])

  const searchLawyer = async () => {
    try {
      const response = await axios.get(recommandLawyerRoute)
      if (response) {
        setAllUsers(response.data)
        console.log(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }


  const fetchAllUser = async () => {
    try {
      const response = await axios.get(allUsersRoute)
      if (response) {
        setAllUsers(response.data)
        console.log(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAllUser()
  }, [])

  useEffect(() => {
    setLawyers(allUsers?.filter(alluser => (alluser.role === 1)))
    setUsers(allUsers?.filter(alluser => (alluser.role === 0)))
    setLoggedInUser(allUsers?.filter(alluser => (alluser.username === auth.username)))
  }, [allUsers])

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(allLawyersRoute)
      if (response) {
        setLawyers(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleLoadMore = () => {

  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleConnect = async (id) => {
    try {
      const userID = await JSON.parse(localStorage.getItem("nayay"))._id;
      const response = await axios.put(connectLawyerRoute, { userID, id })
      if (response) {
        console.log(response.data)
        // fetchUser()
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="w-full flex flex-col items-center md:flex-row pt-[80px]">
      <div className='flex gap-4 flex-col px-4 items-center w-full md:w-[30%] '>
        <div className='page-title'>Search for Lawyers</div>
        <div className="connect-form w-full px-4">
          <input
            className='w-full p-2 bg-[#30475E] rounded-[12px] focus:outline-none'
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </div>

        <div className="connect-form">
          <div className='p-3 bg-[#F05454] flex justify-center items-center w-full h-[200px] text-[20px] rounded-lg'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className='text-center'>Drag and drop files here or click to browse.</p>
              <ul>
                {uploadedFiles.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileUpload}
            hidden
          />
        </div>
      </div>
      <div className='h-[500px] mt-5 w-full md:w-[60%] flex flex-col gap-3 overflow-y-scroll items-center no-scrollbar px-4'>
        {lawyers?.filter(l => l.bio?.includes(searchText) || l.name?.includes(searchText) || l.fields?.includes(searchText) || l.tags?.includes(searchText))
          .map((lawyer, index) => (
            // <div className="lawyer-card" >
            //    <div className="lawyer-details">
            //       {/* <img src={lawyer.image} alt={lawyer.name} /> */}
            //       <h2>{lawyer.name}</h2>
            //       <p>
            //          <Stars rating={lawyer.rating} />
            //       </p>
            //    </div>
            //    <p className="lawyer-bio">{lawyer.bio}</p>
            //    <button
            //       className={connectedLawyers.includes(lawyer.name) ? "connected-button" : "connect-button"}
            //       onClick={() => handleConnect(lawyer._id)}
            //    >
            //       {user?.lawyers.includes(lawyer._id) ? "Connected" : "Connect"}
            //    </button>


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
              <div className="bg-[#F05454] text-[20px] text-center rounded-[12px] py-2" onClick={() => handleConnect(lawyer._id)}>
                {loggedInUser?.lawyers?.includes(lawyer._id) ? "Connected" : "Connect"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Connect;
