import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import {  getConnectionsRoute, recieveMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router';
// import SimplePeer from 'simple-peer';
import ReactPlayer from "react-player";
import { FaRupeeSign } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { Context } from '../Context/Context';
import { isAuth } from '../utils/Utils';
import { FaVideo } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import usePeer from '../Context/Peer';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from 'react-icons/rx';

const Chat = ({ lawyers, loggedInUser }) => {
   const { peer, createAnswer } = usePeer();
   const { socket, userData, token, auth, showToastMessage } = useContext(Context);
   const [connections,setConnections] = useState([])
   const [currentChat, setCurrentChat] = useState(null);
   const [myStream, setMyStream] = useState()
   const [remoteStream, setRemoteStream] = useState();
   const [videocallon, setVideocallon] = useState(false)
   // const [loading, setLoading] = useState(false)
   // const [prog, setProg] = useState("0")
   const [msg, setMsg] = useState("");
   const [messages, setMessages] = useState([]);
   const [openPay, setOpenPay] = useState(false)
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuth()) {
         navigate("/")
      }
   })

   const fetchConnections = useCallback(async () => {
      try {
         if (!token) return
         const response = await axios.get(getConnectionsRoute, { headers: { Authorization: `Bearer ${token}` } })
         if (response) {
            setConnections(response.data.connections)
         }
      } catch (err) {
         console.log(err)
      }
   }, [token])

   useEffect(() => {
      fetchConnections()
   }, [fetchConnections])

   useEffect(() => {
      socket.emit("newUser", auth?._id);
   })

   const handleIncomingRequest = useCallback(({ from, message }) => {
      console.log(message, from.name);
      showToastMessage(`${message} from ${from.name}`)
   },[showToastMessage])

   const handleIncomingAccept = useCallback(({ from, message }) => {
      console.log(message, from.name);
      showToastMessage(`accepted from ${from.name}`)
   }, [showToastMessage])

   const handleCallUser = useCallback(async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
         audio: true,
         video: true,
      });
      const offer = await peer.localDescription;
      socket.emit("user:call", { to: currentChat?._id, offer, from: userData._id });
      setMyStream(stream);
      setVideocallon(true)
   }, [currentChat, socket, userData,peer]);

   const handleIncommingCall = useCallback(
      async ({ from, offer }) => {
         setCurrentChat(from);
         const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
         });
         setMyStream(stream);
         console.log(`Incoming Call`, from, offer);
         const ans = await createAnswer(offer);
         socket.emit("call:accepted", { to: from, ans });
      },
      [createAnswer, socket]
   );

   // const sendStreams = useCallback(() => {
   //    for (const track of myStream.getTracks()) {
   //       peer.peer.addTrack(track, myStream);
   //    }
   // }, [myStream, peer]);

   const handleCallAccepted = useCallback(
      ({ from, ans }) => {
         peer.setRemoteDescription(ans);
         console.log("Call Accepted!");
         // sendStreams();
      },
      [peer]
   );

   const handleNegoNeeded = useCallback(async () => {
      const offer = await peer.getOffer();
      socket.emit("peer:nego:needed", { offer, to: currentChat?._id });
   }, [currentChat?._id, peer, socket]);

   useEffect(() => {
      peer.addEventListener("negotiationneeded", handleNegoNeeded);
      return () => {
         peer.removeEventListener("negotiationneeded", handleNegoNeeded);
      };
   }, [handleNegoNeeded, peer]);

   const handleNegoNeedIncomming = useCallback(
      async ({ from, offer }) => {
         const ans = await peer.getAnswer(offer);
         socket.emit("peer:nego:done", { to: from, ans });
      },
      [peer, socket]
   );

   const handleNegoNeedFinal = useCallback(async ({ ans }) => {
      await peer.setLocalDescription(ans);
   }, [peer]);

   useEffect(() => {
      peer.addEventListener("track", async (ev) => {
         const remoteStream = ev.streams;
         console.log("GOT TRACKS!!");
         setRemoteStream(remoteStream[0]);
      });
   }, [peer]);



   useEffect(() => {
      // socket.on("user:joined", handleUserJoined);
      socket.on("incomming:request", handleIncomingRequest)
      socket.on("incomming:accept", handleIncomingAccept)
      socket.on("incomming:call", handleIncommingCall);
      socket.on("call:accepted", handleCallAccepted);
      socket.on("peer:nego:needed", handleNegoNeedIncomming);
      socket.on("peer:nego:final", handleNegoNeedFinal);

      return () => {
         // socket.off("user:joined", handleUserJoined);
         socket.off("incoming:request", handleIncomingRequest);
         socket.on("incomming:accept", handleIncomingAccept)
         socket.off("incomming:call", handleIncommingCall);
         socket.off("call:accepted", handleCallAccepted);
         socket.off("peer:nego:needed", handleNegoNeedIncomming);
         socket.off("peer:nego:final", handleNegoNeedFinal);
      };
   }, [
      socket,
      // handleUserJoined,
      handleIncomingRequest,
      handleIncomingAccept,
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






   const fetchMessage = useCallback(async () => {
      try {
         const response = await axios.post(recieveMessageRoute, { currentChatId: currentChat?._id }, {headers: { Authorization: `Bearer ${token}` }});
         setMessages(response.data);
         console.log(response.data)
      } catch (err) {
         console.log(err)
      }
   },[currentChat?._id, token])

   useEffect(() => {
      if(currentChat){fetchMessage();}
   }, [currentChat, fetchMessage]);


   const handleSendMsg = async () => {
      try {
         socket.emit("send-msg", {
            to: currentChat?._id,
            from: userData._id,
            message: msg
         });

         const response = await axios.post(sendMessageRoute, { to: currentChat._id, message: msg }, {headers: { Authorization: `Bearer ${token}` }});

         if(response) fetchMessage();
      } catch (err) {
         console.log(err)
      } finally {
         setMsg("");
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
         const handleMessage = (message) => {
            console.log(message);
            showToastMessage(message);
            fetchMessage();
         };

         // Attach the event listener
         socket.on("msg-recieve", handleMessage);

         // Cleanup function to prevent duplicate listeners
         return () => {
            socket.off("msg-recieve", handleMessage);
         };
      }
   }, [fetchMessage, showToastMessage, socket]); // Add socket as a dependency


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



   const sendChat = async (e) => {
      e.preventDefault()
      // if (msg.length > 0) {
      handleSendMsg();
         
      // }
      // if (link) {
      //    handleSendFile();
      // }
   }

   return (
      <div className='w-full h-[100vh] flex pt-[80px]'>

         <div className="w-[25%]">
            <div className='text-[20px] text-center font-bold m-4'>Connected Users</div>
            <div className='h-full w-full overflow-y-scroll no-scrollbar px-5 pb-4 z-[-3]'>
               <div className='flex flex-col gap-4 h-full'>
                  {connections?.map((person) => (
                     <button onClick={() => setCurrentChat(person)} key={person._id} className='flex justify-between items-center rounded-[12px] p-3 w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur-xl' >
                        <div className="flex  items-center">
                           <div className="w-[34px] h-[34px] object-cover rounded-full mr-4">
                              <img src={person.image || require("../images/download.png")} alt={'#'} className="w-full h-full rounded-full" />
                           </div>
                           <div className="text-[18px]">{person.name}</div>
                        </div>
                        <div className="text-[#F05454] text-[28px]" >
                           <BiSend />
                        </div>
                     </button>
                  ))}
               </div>
            </div>
         </div>


         <div className=" w-[75%] backdrop-blur-xl ">
            {currentChat ? (
               <div className="flex flex-col justify-between h-full  ">
                  <div className="flex justify-between p-2 mb-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                     <div className='flex gap-4'>
                        <div className="w-[50px] h-[50px] object-cover rounded-full mr-4">
                           <img src={currentChat?.image ||require("../images/download.png")} alt={'#'} className="w-full h-full rounded-full" />
                        </div>
                        <div className='text-2xl'>{currentChat?.name}</div>
                     </div>
                     <div className="call-buttons flex text-[24px] mr-[50px] gap-[20px]">
                        {/* <button onClick={()=>setOpenPay(true)}><FaRupeeSign/></button>
                        <button onClick={handleCallUser} className="call-button cursor-pointer circular"><FaVideo /></button>
                        <button onClick={() => { }} className="call-button circular"><FaPhone /></button> */}
                     </div>
                  </div>

                  <div className='overflow-y-scroll h-full '>
                     <div className="flex flex-col gap-3 w-full">
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
                              className={`flex w-full rounded-[12px] p-2 px-3 max-w-[200px]  text-end ${message.fromSelf ? 'justify-start sent self-end bg-[#F05454]' : 'justify-start received bg-[#30475E]'}`}
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
                  <form onSubmit={(e)=>sendChat(e)} className="flex w-full gap-4 p-4">
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
                     {/* <button className="doc-button text-[24px]" onClick={() => document.getElementById('pdf').click()}><FaRegFilePdf /></button>
                     <button className="doc-button text-[24px]" onClick={() => document.getElementById('img').click()}><FaImage /></button> */}
                     <button type='submit' className="send-button text-[#F05454] text-[38px]"  > <BiSend /></button>
                  </form>

                  {videocallon && <div className='h-screen w-screen absolute bg-slate-900 flex gap-3'>
                     {myStream && <button onClick={()=>{}}>Send Stream</button>}
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

                        <button className="h-10 bg-[#F05454] rounded-lg" >Request Payment</button>
                     </div>
                  </div>}
               </div>
            ) :
               <div className='text-center mt-[100px]'>Select Connected user to chat</div>
            }
         </div >
      </div>
   );
};

export default Chat;