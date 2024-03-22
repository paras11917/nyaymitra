import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Lawyers from '../utils/indianLawyersData';
import axios from 'axios';
import { allLawyersRoute, getConnectionsRoute, getUserRoute, host, recieveMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router';
// import SimplePeer from 'simple-peer';
import peer from "../utils/Peer"
import ReactPlayer from "react-player";
import { CiImageOn } from "react-icons/ci";
import { FaRupeeSign } from "react-icons/fa";

import Stars from '../components/starRating';

import { BiSend } from "react-icons/bi";
import Connect from './Connect';
import ConnectPopup from '../components/ConnectPopup';
import { Context, useSocket } from '../Context/Context';
import { isAuth } from '../utils/Utils';
import { FaVideo, FaImage, FaRegFilePdf } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from 'react-icons/rx';

const Chat = ({ lawyers, loggedInUser }) => {
   const { socket, userData, allUsers, token, connections, auth, showToastMessage } = useContext(Context);
   const config = {
      headers: { Authorization: `Bearer ${token}` }
   };
   const [currentChat, setCurrentChat] = useState(undefined);
   const [myStream, setMyStream] = useState()
   const [remoteStream, setRemoteStream] = useState();

   // const navigate = useNavigate();
   const [videocallon, setVideocallon] = useState(false)
   const [loading, setLoading] = useState(false)
   const [prog, setProg] = useState("0")
   const [msg, setMsg] = useState("");
   const [type, setType] = useState(null);
   const [link, setLink] = useState(null)
   const scrollRef = useRef();
   const [messages, setMessages] = useState([]);
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const [selectedChat, setSelectedChat] = useState(null);
   const [input, setInput] = useState('');
   // const [lawyers, setLawyers] = useState(null);
   // const [user, setUser] = useState(null);
   const videoRef = useRef();
   const [stream, setStream] = useState(null);
   const remoteVideoRef = useRef();
   const [openPay, setOpenPay] = useState(false)



   const navigate = useNavigate();
   const [searchText, setSearchText] = useState('');
   const [selectedFile, setSelectedFile] = useState(null);
   // const [lawyers, setLawyers] = useState(null);
   const [user, setUser] = useState(null);

   useEffect(() => {
      if (!isAuth()) {
         navigate("/")
      }
   })

   useEffect(() => {
      if (socket) {
         socket.on("incomming:request", handleIncomingRequest)
         socket.on("incomming:accept", handleIncomingAccept)
      }

      return () => {
         if (socket) {
            socket.off("incoming:request", handleIncomingRequest);
            socket.on("incomming:accept", handleIncomingAccept)
         }
      };

   }, [socket])

   const handleIncomingRequest = ({ from, message }) => {
      console.log(message, from.name);
      showToastMessage(`${message} from ${from.name}`)
   };
   const handleIncomingAccept = ({ from, message }) => {
      console.log(message, from.name);
      showToastMessage(`accepted from ${from.name}`)
   };



   const handleCallUser = useCallback(async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
         audio: true,
         video: true,
      });
      const offer = await peer.getOffer();
      socket.emit("user:call", { to: currentChat?._id, offer, from: userData._id });
      setMyStream(stream);
      setVideocallon(true)
   }, [currentChat, socket, auth]);

   const handleIncommingCall = useCallback(
      async ({ from, offer }) => {
         setCurrentChat(from);
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
         });
         setMyStream(stream);
         console.log(`Incoming Call`, from, offer);
         const ans = await peer.getAnswer(offer);
         socket.emit("call:accepted", { to: from, ans });
      },
      [socket]
   );

   const sendStreams = useCallback(() => {
      for (const track of myStream.getTracks()) {
         peer.peer.addTrack(track, myStream);
      }
   }, [myStream]);

   const handleCallAccepted = useCallback(
      ({ from, ans }) => {
         peer.setLocalDescription(ans);
         console.log("Call Accepted!");
         sendStreams();
      },
      [sendStreams]
   );

   const handleNegoNeeded = useCallback(async () => {
      const offer = await peer.getOffer();
      socket.emit("peer:nego:needed", { offer, to: currentChat?._id });
   }, [currentChat, socket]);

   useEffect(() => {
      peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
      return () => {
         peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
      };
   }, [handleNegoNeeded]);

   const handleNegoNeedIncomming = useCallback(
      async ({ from, offer }) => {
         const ans = await peer.getAnswer(offer);
         socket.emit("peer:nego:done", { to: from, ans });
      },
      [socket]
   );

   const handleNegoNeedFinal = useCallback(async ({ ans }) => {
      await peer.setLocalDescription(ans);
   }, []);

   useEffect(() => {
      peer.peer.addEventListener("track", async (ev) => {
         const remoteStream = ev.streams;
         console.log("GOT TRACKS!!");
         setRemoteStream(remoteStream[0]);
      });
   }, []);

   console.log(myStream,remoteStream)


   useEffect(() => {
      // socket.on("user:joined", handleUserJoined);
      socket.on("incomming:call", handleIncommingCall);
      socket.on("call:accepted", handleCallAccepted);
      socket.on("peer:nego:needed", handleNegoNeedIncomming);
      socket.on("peer:nego:final", handleNegoNeedFinal);

      return () => {
         // socket.off("user:joined", handleUserJoined);
         socket.off("incomming:call", handleIncommingCall);
         socket.off("call:accepted", handleCallAccepted);
         socket.off("peer:nego:needed", handleNegoNeedIncomming);
         socket.off("peer:nego:final", handleNegoNeedFinal);
      };
   }, [
      socket,
      // handleUserJoined,
      handleIncommingCall,
      handleCallAccepted,
      handleNegoNeedIncomming,
      handleNegoNeedFinal,
   ]);













   // useEffect(() => {
   //    if (currentUser) {
   //       socket.emit("newUser", currentUser._id);
   //       myPeer.on('open', id => { // When we first open the app, have us join a room
   //          socket.emit('newVideoUser', { id, currentUser: currentUser?._id })
   //          console.log(id, "peer connected", currentUser?._id)
   //       })
   //    }
   // }, [currentUser]);

   // useEffect(() => {
   //    const fetchLawyers = async () => {
   //       try {
   //          const response = await axios.get(allLawyersRoute)
   //          if (response) {
   //             setLawyers(response.data)
   //          }
   //       } catch (err) {
   //          console.log(err)
   //       }
   //    }

   //    fetchUser()
   //    fetchLawyers()
   // }, [])

   // const handleSearchTextChange = (e) => {
   //    setSearchText(e.target.value);
   // };

   // const handleLoadMore = () => {

   // };

   // const handleFileUpload = (e) => {
   //    const file = e.target.files[0];
   //    setSelectedFile(file);
   // };

   // const [open, setOpen] = useState(false)
   // const [connectLawyer, setConnectLawyer] = useState(false)

   // const handleConnect = async (id) => {
   //    try {
   //       setOpen(true)
   //       setConnectLawyer(id)
   //       // const userID = await JSON.parse(localStorage.getItem("nayay"))._id;
   //       // const response = await axios.put(connectLawyerRoute, { userID, id })
   //       // if (response) {
   //       //   console.log(response.data)
   //       //   fetchUser()
   //       // }
   //    } catch (err) {
   //       console.log(err)
   //    }
   // }

   // const handleVideoCall = () => {
   //    setVideocallon(true)
   //    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
   //       .then((stream) => {
   //          setStream(stream);
   //          videoRef.current.srcObject = stream;

   //          socket.emit("video-call", { currentChat, auth })

   //          myPeer.on('call', call => { // When we join someone's room we will receive a call from them
   //             call.answer(stream) // Stream them our video/audio
   //             call.on('stream', remoteVideoStream => { // When we recieve their stream
   //                remoteVideoRef.current.srcObject = remoteVideoStream; // Display their video to ourselves
   //             })
   //          })


   //       })
   //       .catch((error) => {
   //          console.error('Error accessing webcam and microphone:', error);
   //       });
   // }

   // useEffect(() => {

   //    myPeer.on('call', call => {
   //       console.log("calling")// When we join someone's room we will receive a call from them
   //       call.answer(stream) // Stream them our video/audio
   //       call.on('stream', remoteVideoStream => { // When we recieve their stream
   //          remoteVideoRef.current.srcObject = remoteVideoStream; // Display their video to ourselves
   //       })
   //    })
   // })

   // useEffect(() => {
   //    if (socket) {
   //       socket.on('video-call-recieve', userId => { // If a new user connect
   //          console.log("calling")
   //          connectToNewUser(userId, stream)
   //       })
   //    }
   // })

   // function connectToNewUser(userId, stream) {
   //    console.log("asfdsdgsdgsg")// This runs when someone joins our room
   //    // This runs when someone joins our room
   //    const call = myPeer.call(userId, stream) // Call the user who just joined
   //    // Add their video
   //    call.on('stream', remoteVideoStream => {
   //       remoteVideoRef.current.srcObject = remoteVideoStream;
   //    })
   //    // If they leave, remove their video
   //    call.on('close', () => {
   //       remoteVideoRef.remove()
   //    })
   // }






   const fetchMessage = async () => {
      try {
         const response = await axios.post(recieveMessageRoute, { currentChatId: currentChat._id }, config);
         setMessages(response.data);
         console.log(response.data)
      } catch (err) {
         console.log(err)
      }
   }

   useEffect(() => {
      fetchMessage();
   }, [currentChat]);


   const handleSendMsg = async () => {
      try {
         socket.emit("send-msg", {
            to: currentChat?._id,
            from: userData._id,
            message: msg
         });

         const response = await axios.post(sendMessageRoute, { to: currentChat._id, message: msg }, config);

         fetchMessage();
      } catch (err) {
         console.log(err)
      }
   };

   // const handleSendFile = async () => {
   //    const data = await JSON.parse(
   //       localStorage.getItem("nayay")
   //    );
   //    socket.emit("send-file", {
   //       to: currentChat?._id,
   //       from: data._id,
   //       file: link,
   //       type: type
   //    });

   //    await axios.post(sendMessageRoute, {
   //       from: data._id,
   //       to: currentChat?._id,
   //       file: link,
   //       type: type
   //    });

   //    const msgs = [...messages];
   //    msgs.push({ fromSelf: true, file: link, type: type });
   //    setMessages(msgs);
   // };

   useEffect(() => {
      if (socket) {
         socket.on("msg-recieve", (message) => {
            console.log(message)
            showToastMessage(message)
            fetchMessage()
         });
      }
   });

   // useEffect(() => {
   //    if (socket) {
   //       socket.on("file-recieve", ({ file, type }) => {
   //          setArrivalMessage({ fromSelf: false, file: file, type: type });
   //       });
   //    }
   // });

   // useEffect(() => {
   //    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
   // }, [arrivalMessage]);

   // useEffect(() => {
   //    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   // }, [messages]);

   // const handleEmojiClick = (event, emojiObject) => {
   //    let message = msg;
   //    message += emojiObject.emoji;
   //    setMsg(message);
   // };



   const sendChat = async () => {
      // if (msg.length > 0) {
      handleSendMsg();
      //    setMsg("");
      // }
      // if (link) {
      //    handleSendFile();
      // }
   }

   const handleRequestPay = ()=>{

   }

   return (
      <div className='w-full h-[100vh] flex pt-[80px]'>

         <div className="w-[25%]">
            {/* <div className='text-[20px] text-center font-bold m-4'>Connected Users</div> */}
            <div className='h-full w-full overflow-y-scroll no-scrollbar px-5 pb-4 z-[-3]'>
               <div className='flex flex-col gap-4 h-full'>


                  {connections?.map((person) => (
                     <div key={person._id} className='flex justify-between items-center rounded-[12px] p-3 w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur-xl' >
                        <div className="flex  items-center">
                           <div className="w-[34px] h-[34px] object-cover rounded-full mr-4">
                              <img src={require("../images/download.png")} alt={'#'} className="w-full h-full rounded-full" />
                           </div>
                           <div className="text-[18px]">{person.name}</div>
                        </div>
                        <div className="text-[#F05454] text-[28px]" onClick={() => setCurrentChat(person)}>
                           <BiSend />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>


         <div className=" w-[75%] backdrop-blur-xl px-2 ">
            {true ? (
               <div className="flex flex-col justify-between h-full  ">
                  <div className="flex justify-between py-2 mb-2">
                     <div>
                        <div className="w-[50px] h-[50px] object-cover rounded-full mr-4">
                           <img src={require("../images/download.png")} alt={'#'} className="w-full h-full rounded-full" />
                        </div>
                        <div className='user-connected-name'><span className="user-name-chat">{currentChat?.name}</span></div>
                     </div>
                     <div className="call-buttons flex text-[24px] mr-[50px] gap-[20px]">
                        <button onClick={()=>setOpenPay(true)}><FaRupeeSign/></button>
                        <button onClick={handleCallUser} className="call-button cursor-pointer circular"><FaVideo /></button>
                        <button onClick={() => { }} className="call-button circular"><FaPhone /></button>
                     </div>
                  </div>

                  <div className='overflow-y-scroll h-full '>
                     <div className="flex flex-col gap-3 ">
                        {/* <div className={` w-fit max-w-[200px] self-start received rounded-[12px] p-1 bg-[#30475E]`}
                        >sgno dkgsns sgnasgk snglsdng </div>
                        <div className={`message w-fit max-w-[200px] sent self-end rounded-[12px] p-1 bg-[#F05454]`} >sgno dkgsns sgnasgk snglsdng </div>
                        <div className={`message w-fit max-w-[200px] received self-start rounded-[12px] p-1 bg-[#30475E]`}>sgno dkgsns sgnasgk snglsdng </div>
                        <div className={`message w-fit max-w-[200px] sent self-end rounded-[12px] p-1 bg-[#F05454]`}>sgno dkgsns sgnasgk snglsdng </div>
                        <div className={`message w-fit max-w-[200px] received self-start rounded-[12px] p-1 bg-[#30475E]`}>sgno dkgsns sgnasgk snglsdng </div>
                        <div className={`message w-fit max-w-[200px] sent self-end rounded-[12px] p-1 bg-[#F05454]`}>sgno dkgsns sgnasgk snglsdng </div>
                        <div className={`message w-fit max-w-[200px] sent self-end rounded-[12px] p-1  bg-[#F05454]`}>sgno dkgsns sgnasgk snglsdng </div> */}

                        {messages?.map((message, index) => (
                           <div
                              key={index}
                              className={`message w-fit rounded-[12px] p-2 px-3 max-w-[200px]  text-end ${message.fromSelf ? 'sent self-end bg-[#F05454]' : 'received bg-[#30475E]'}`}
                           >
                              {message.file ?
                                 <>
                                    {/* <a download={`nayaymitra.${message.type}`} href={message.file}>download</a>
                                    {message.type === "png" ?
                                       <img className='h-20 w-20' src={message.file} alt='p' /> :
                                       <embed className='h-20 w-20' src={message.file} />
                                    } */}
                                 </>

                                 : message.message}
                           </div>
                        ))}
                     </div>
                  </div>
                  {/* Chat Input */}
                  <div className="flex w-full gap-4 p-4">
                     <input
                        className='w-full p-4 bg-[#30475E] rounded-[12px]'
                        type="text"
                        placeholder="Type a message..."
                        onChange={(e) => setMsg(e.target.value)}
                        value={msg}
                     />
                     <input
                        type="file"
                        // onChange={(e) => uploadImage(e.target.files[0], "png")}
                        accept='image/png'
                        hidden
                        id='img'
                     />
                     <input
                        type="file"
                        // onChange={(e) => uploadImage(e.target.files[0], "pdf")}
                        accept='application/pdf'
                        hidden
                        id='pdf'
                     />
                     <button className="doc-button text-[24px]" onClick={() => document.getElementById('pdf').click()}><FaRegFilePdf /></button>
                     <button className="doc-button text-[24px]" onClick={() => document.getElementById('img').click()}><FaImage /></button>
                     <button onClick={sendChat} className="send-button text-[#F05454] text-[38px]" disabled={loading} >{loading ? prog : <BiSend />}</button>
                  </div>

                  {videocallon && <div className='h-screen w-screen absolute bg-slate-900 flex gap-3'>
                     {myStream && <button onClick={sendStreams}>Send Stream</button>}
                     {remoteStream && <button onClick={handleCallUser}>CALL</button>}
                     {myStream && (
                        <div className=''>
                           <h1>My Stream</h1>
                           <ReactPlayer
                              playing
                              muted
                              height="100px"
                              width="200px"
                              url={myStream}
                           />
                        </div>
                     )}
                     {remoteStream && (
                        <div className=''>
                           <h1>Remote Stream</h1>
                           <ReactPlayer
                              playing
                              muted
                              height="100px"
                              width="200px"
                              url={remoteStream}
                           />
                        </div>
                     )}
                  </div>}

                  {openPay && <div className={`absolute flex flex-col justify-center items-center w-screen h-screen top-0 right-0 backdrop-blur-3xl`}>
                     <div className="flex flex-col p-10 rounded-2xl backdrop-blur-xl shadow-2xl gap-3 w-[50%]">
                        <div className="text-xl text-center mb-4">Request Payment</div>
                        <div className='absolute top-5 right-5 text-[24px]' onClick={() => setOpenPay(false)}>
                           <RxCross2 />
                        </div>
                        <input type="text" placeholder='amount' />
                        <input type="text" placeholder='currency' />
                        <input type="text" placeholder='note' />

                        <button className="h-10 bg-[#F05454] rounded-lg" onClick={handleRequestPay}>Request Payment</button>
                     </div>
                  </div>}
               </div>
            ) :
               <div className='text-center mt-[100px]'>Select user to chat</div>
            }
         </div >
      </div>
   );
};


export default Chat;





