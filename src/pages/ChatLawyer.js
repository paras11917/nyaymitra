import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { recieveMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/APIRoutes";
// import Picker from "emoji-picker-react";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebaseConfig';

import PeerComponent from '../Peer';
// import SimplePeer from 'simple-peer';

const ChatLawyer = ({ lawyer, users }) => {
   const navigate = useNavigate();
   const [msg, setMsg] = useState("");
   const [type, setType] = useState(null);
   const [link, setLink] = useState(null)
   const scrollRef = useRef();
   const socket = useRef();
   const [messages, setMessages] = useState([]);
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const [currentChat, setCurrentChat] = useState(undefined);
   const [currentUser, setCurrentUser] = useState(undefined);
   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

   const [peerId, setPeerId] = useState('');
   const [connectedPeer, setConnectedPeer] = useState(null);

   const videoRef = useRef();
   const [stream, setStream] = useState(null);
   const remoteVideoRef = useRef();


   useEffect(() => {
      // Get the user's media stream (video and audio)
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
         .then((stream) => {
            setStream(stream);
            videoRef.current.srcObject = stream;
         })
         .catch((error) => {
            console.error('Error accessing webcam and microphone:', error);
         });
   }, []);



   const handleData = (data) => {
      console.log('Data received:', data);
   };

   const handleCall = (call) => {
      console.log('Call received:', call);
      call.answer(stream);
      setConnectedPeer(call);
      call.on('stream', (remoteStream) => {
         remoteVideoRef.current.srcObject = remoteStream;
      });
   };



   const startCall = () => {

      // const peer = new SimplePeer({ initiator: true, stream });
      // peer.on('signal', (data) => {
      //    setConnectedPeer(peer);
      //    peer.signal(data);
      // });
      // peer.on('call', handleCall);
   };

   const endCall = () => {
      if (connectedPeer) {
         connectedPeer.destroy();
         setConnectedPeer(null);
      }
   };
   useEffect(() => {
      if (!localStorage.getItem("nayay")) {
         navigate("/login");
      } else {
         setCurrentUser(
            JSON.parse(
               localStorage.getItem("nayay")
            )
         );
      }
   }, []);

   useEffect(() => {
      if (currentUser) {
         socket.current = io(host);
         socket.current.emit("newUser", currentUser._id);
      }
   }, [currentUser]);

   const fun = async () => {
      const data = await JSON.parse(
         localStorage.getItem("nayay")
      );
      const response = await axios.post(recieveMessageRoute, {
         from: data?._id,
         to: currentChat,
      });
      setMessages(response.data);
   }

   useEffect(() => {
      fun();
   }, [currentChat]);

   const handleSendMsg = async (msg) => {
      const data = await JSON.parse(
         localStorage.getItem("nayay")
      );
      socket.current.emit("send-msg", {
         to: currentChat,
         from: data._id,
         message: msg
      });
      await axios.post(sendMessageRoute, {
         from: data._id,
         to: currentChat,
         message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
   };

   const handleSendFile = async () => {
      const data = await JSON.parse(
         localStorage.getItem("nayay")
      );
      socket.current.emit("send-file", {
         to: currentChat,
         from: data._id,
         file: link,
         type: type
      });

      await axios.post(sendMessageRoute, {
         from: data._id,
         to: currentChat,
         file: link,
         type: type
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, file: link, type: type });
      setMessages(msgs);
   };

   useEffect(() => {
      if (socket.current) {
         socket.current.on("msg-recieve", (message) => {
            console.log(message)
            setArrivalMessage({ fromSelf: false, message: message });
         });
      }
   });

   useEffect(() => {
      if (socket.current) {
         socket.current.on("file-recieve", ({ file, type }) => {
            console.log(file, type, "recieve")
            setArrivalMessage({ fromSelf: false, file: file, type: type });
         });
      }
   });

   // function addVideoStream(video, stream) {
   //    video.srcObject = stream
   //    video.addEventListener('loadedmetadata', () => {
   //       video.play()
   //    })
   //    videoGrid?.appendChild(video)
   // }

   // useEffect(() => {
   //    if (socket.current) {
   //       socket.current.on("videocall-recieve", (stream) => {
   //          console.log(stream)
   //          // addVideoStream(myVideo, stream)
   //          // setArrivalMessage({ fromSelf: false, message: message });
   //       });
   //    }
   // });

   useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
   }, [arrivalMessage]);

   // useEffect(() => {
   //    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
   // }, [messages]);

   const handleEmojiClick = (event, emojiObject) => {
      let message = msg;
      message += emojiObject.emoji;
      setMsg(message);
   };

   const uploadImage = (file, type) => {
      if (file) {
         setType(type)
         const name = Date.now()
         const storageRef = ref(storage, `data/${type}/${name}`)
         const uploadTask = uploadBytesResumable(storageRef, file)
         uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("Profile photo upload is " + progress + "% done")
         }, (error) => {
            console.log(error.message)
         }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               setLink(downloadURL)
               console.log("File available at", downloadURL)
               console.log(link)
            })
         })
      }
   }

   const sendChat = (event) => {
      event.preventDefault();
      if (msg.length > 0) {
         handleSendMsg(msg);
         setMsg("");
      }
      if (link) {
         handleSendFile();
      }
   };

   return (
      <div className="flex flex-col items-center justify-center gap-3 h-[500px]">
         <div className='flex h-full bg-slate-200 w-[80%] justify-between'>
            <div className='w-full flex flex-col p-10 gap-3'>
               {users?.filter(user => lawyer?.users.includes(user._id)).map(u => (
                  <>
                     <div className='hover:cursor-pointer' onClick={() => setCurrentChat(u._id)}>{u.name}</div>
                  </>
               ))}
            </div>
            <div className='w-full flex flex-col justify-center items-center p-10'>
               {!currentChat ? (

                  <div className='text-center'>Welcome</div>
               ) : (
                  <div className='bg-slate-100 w-full h-full '>
                     <div className='w-full h-full overflow-scroll pb-4'>
                        {messages.map((message) => {
                           return (
                              <div ref={scrollRef}>
                                 <div
                                    className={`message ${message.fromSelf ? "sended text-right" : "recieved"
                                       }`}
                                 >
                                    <div className="content ">
                                       <p>{message.message}</p>
                                       <div>{message.file &&
                                          <>
                                             <a download={`nayaymitra.${message.type}`} href={message.file}>download</a>
                                             {message.type === "png" ?
                                                <img className='h-20 w-20' src={message.file} alt='p' /> :
                                                <embed className='h-20 w-20' src={message.file} />
                                             }
                                          </>

                                       }</div>
                                    </div>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                     <div>
                        {/* <div className="button-container">
                           <div className="emoji">
                              <div onClick={() => setShowEmojiPicker(!showEmojiPicker)} >emoji</div>
                              {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                           </div>
                        </div> */}
                        <form className="input-container" onSubmit={(event) => sendChat(event)}>
                           <input
                              type="text"
                              placeholder="type your message here"
                              onChange={(e) => setMsg(e.target.value)}
                              value={msg}
                           />
                           <input
                              type="file"
                              onChange={(e) => uploadImage(e.target.files[0], "png")}
                              accept='image/png'
                           />
                           <input
                              type="file"
                              onChange={(e) => uploadImage(e.target.files[0], "pdf")}
                              accept='application/pdf'
                           />
                           <button type="submit">
                              send
                           </button>
                        </form>
                     </div>
                  </div>
               )}
            </div>
            <div>
               <h2>Video Call</h2>
               <h2>my video</h2>
               <video ref={videoRef} autoPlay playsInline muted />
               <h2>others video</h2>
               <video ref={remoteVideoRef} autoPlay playsInline />
               <button className="h-10 bg-violet-800 rounded-lg" onClick={startCall}>Start Call</button>
               <button className="h-10 bg-violet-800 rounded-lg" onClick={endCall}>End Call</button>
               {/* <PeerComponent id={currentChat} onData={handleData} onCall={handleCall} /> */}
            </div>
         </div>
      </div>
   )
}

export default ChatLawyer