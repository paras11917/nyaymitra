import React, { useState, useEffect, useRef } from 'react';
import Lawyers from './indianLawyersData';
import axios from 'axios';
import { allLawyersRoute, allUsersRoute, getLawyerRoute, getUserRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';
import { storage } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { host, recieveMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import Peer from 'peerjs';
import { BiSend } from "react-icons/bi";


const ChatL = ({ users, loggedInUser }) => {

  const navigate = useNavigate();
  const myPeer = new Peer()
  const [videocallon, setVideocallon] = useState(false)
  const [loading, setLoading] = useState(false)
  const [prog, setProg] = useState("0")
  const [msg, setMsg] = useState("");
  const [type, setType] = useState(null);
  const [link, setLink] = useState(null)
  const scrollRef = useRef();
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selectedChat, setSelectedChat] = useState(null);
  const [input, setInput] = useState('');
  // const [users, setUsers] = useState(null);
  const [lawyer, setLawyer] = useState(null)
  const videoRef = useRef();
  const [stream, setStream] = useState(null);
  const remoteVideoRef = useRef()

  const handleVideoCall = () => {
    setVideocallon(true)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        videoRef.current.srcObject = stream;
        myPeer.on('call', call => { // When we join someone's room we will receive a call from them
          call.answer(stream) // Stream them our video/audio
          call.on('stream', remoteVideoStream => { // When we recieve their stream
            remoteVideoRef.current.srcObject = remoteVideoStream; // Display their video to ourselves
          })
        })
        console.log("calling")

        socket.current.emit('video-call', { currentChat, currentUser })
      })
      .catch((error) => {
        console.error('Error accessing webcam and microphone:', error);
      });
  }

  useEffect(() => {

    myPeer.on('call', call => {

      console.log("calling")// When we join someone's room we will receive a call from them
      call.answer(stream) // Stream them our video/audio
      call.on('stream', remoteVideoStream => { // When we recieve their stream
        remoteVideoRef.current.srcObject = remoteVideoStream; // Display their video to ourselves
      })
    })
  })

  useEffect(() => {
    if (socket.current) {
      console.log("callingvdsdvd")
      socket.current.on('video-call-recieve', userId => { // If a new user connect
        connectToNewUser(userId, stream)
      })
    }
  })

  function connectToNewUser(userId, stream) {
    console.log("asfdsdgsdgsg")// This runs when someone joins our room
    const call = myPeer.call(userId, stream) // Call the user who just joined
    // Add their video
    call.on('stream', remoteVideoStream => {
      remoteVideoRef.current.srcObject = remoteVideoStream;
    })
    // If they leave, remove their video
    call.on('close', () => {
      remoteVideoRef.remove()
    })
  }

  // const sendDocument = () => {
  //   // Open a file picker dialog
  //   const fileInput = document.createElement('input');
  //   fileInput.type = 'file';
  //   fileInput.accept = '.pdf,.doc,.docx,.txt'; // Specify allowed file types
  //   fileInput.style.display = 'none';

  //   // Listen for file selection
  //   fileInput.addEventListener('change', (event) => {
  //     const selectedFile = event.target.files[0];

  //     if (selectedFile) {
  //       // Create a message object for the document
  //       const documentMessage = {
  //         sender: 'User1', // Replace with the sender's ID or name
  //         type: 'document',
  //         document: selectedFile,
  //       };

  //       // Add the document message to the selected chat's messages
  //       const updatedMessages = { ...messages };
  //       updatedMessages[selectedChat.id].push(documentMessage);
  //       setMessages(updatedMessages);

  //       // Optionally, you can send the document to a server or perform other actions here
  //     }
  //   });

  //   // Trigger the file picker dialog
  //   fileInput.click();
  // };


  // const handleFooterButtonClick = () => {
  //   // Add your logic here for what should happen when the footer button is clicked
  //   // For example, you can navigate to another page or perform some action.
  // };

  // const sendMessage = () => {
  //   if (input.trim() === '') return;

  //   const newMessage = {
  //     sender: 'User1', // Replace with the sender's ID or name
  //     text: input,
  //   };

  //   // Add the new message to the selected chat's messages
  //   const updatedMessages = { ...messages };
  //   updatedMessages[selectedChat.id].push(newMessage);
  //   setMessages(updatedMessages);

  //   setInput('');
  // };

  // useEffect(() => {
  //   let timer;

  //   const simulateIncomingMessage = () => {
  //     if (selectedChat) {
  //       const newMessage = {
  //         sender: selectedChat.id,
  //         text: 'Hello, this is a received message!',
  //       };

  //       // Add the new message to the selected chat's messages
  //       const updatedMessages = { ...messages };
  //       updatedMessages[selectedChat.id].push(newMessage);
  //       setMessages(updatedMessages);
  //     }
  //   };

  //   const startIncomingMessageSimulation = () => {
  //     timer = setInterval(simulateIncomingMessage, 9000);
  //   };

  //   const stopIncomingMessageSimulation = () => {
  //     clearInterval(timer);
  //   };

  //   if (selectedChat && selectedChat.id !== 'User1') {
  //     // Start simulation only when a chat is selected and it's not the User1 chat
  //     startIncomingMessageSimulation();
  //   } else {
  //     stopIncomingMessageSimulation();
  //   }

  //   return () => {
  //     stopIncomingMessageSimulation();
  //   };
  // }, [messages, selectedChat]);

  // const handleChatSelection = (person) => {
  //   setSelectedChat(person);

  //   // Initialize messages for the selected chat if not already done
  //   // if (!messages[person.id]) {
  //   //   setMessages({
  //   //     ...messages,
  //   //     [person.id]: [],
  //   //   });
  //   // }
  // };

  const fetchLawyer = async () => {
    try {
      const lawyerid = await JSON.parse(localStorage.getItem("nayay"))._id
      const response = await axios.get(`${getLawyerRoute}/${lawyerid}`)
      if (response) {
        setLawyer(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get(allUsersRoute)
  //       if (response) {
  //         setUsers(response.data)
  //         console.log(response.data)
  //       }
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   fetchUsers()
  //   fetchLawyer()
  // }, [])



  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("newUser", currentUser?._id);
      myPeer.on('open', id => { // When we first open the app, have us join a room
        socket.current.emit('newVideoUser', { id, currentUser: currentUser?._id })
        console.log(id, "peer connected", currentUser?._id)
      })
    }
  }, [currentUser]);

  const fun = async () => {
    const data = await JSON.parse(
      localStorage.getItem("nayay")
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data?._id,
      to: currentChat?._id,
    });
    setMessages(response.data);
    console.log(response.data)
  }

  useEffect(() => {
    fun();
  }, [currentChat]);


  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("nayay")
    );
    socket.current.emit("send-msg", {
      to: currentChat?._id,
      from: data._id,
      message: msg
    });

    await axios.post(sendMessageRoute, {
      to: currentChat?._id,
      from: data._id,
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
      to: currentChat?._id,
      from: data._id,
      file: link,
      type: type
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat?._id,
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
        setArrivalMessage({ fromSelf: false, file: file, type: type });
      });
    }
  });

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
      setLoading(true)
      const storageRef = ref(storage, `data/${type}/${name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProg(progress)
        console.log("Profile photo upload is " + progress + "% done")
      }, (error) => {
        console.log(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLink(downloadURL)
          console.log("File available at", downloadURL)
          console.log(link)
          if (!link) setProg("try again")
          else setProg("0")
          setLoading(false)

        })
      })
    }
  }

  const sendChat = async () => {
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
    if (link) {
      handleSendFile();
    }
  }

  return (
    <div className='flex w-full max-h-full'>
      <div className="flex flex-col items-center w-[30%] overflow-y-scroll no-scrollbar max-h-full pb-2">
        <div className='text-[28px] font-bold mb-4'>Connected Users</div>
        <div className='flex flex-col gap-4 h-full w-full  px-5 z-[-3]'>
          {users?.filter(user => loggedInUser?.users?.includes(user._id)).map((person) => (
            <div className='flex  justify-between items-center rounded-[12px] p-3 w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur-xl' key={person.id}>
              <div className="flex  items-center">
                <div className="w-[50px] h-[50px] object-cover rounded-full mr-4">
                  <img src={require("../images/download.png")} alt={'#'} className="w-full h-full rounded-full" />
                </div>
                <div className="text-[24px]">{person.name}</div>
              </div>
              <div className="text-[#F05454] text-[40px]" onClick={() => setCurrentChat(person)}>
                <BiSend />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" w-[70%] backdrop-blur-xl px-2 z-[-2]">
        {true && (
          <div className="flex flex-col  h-full">
            <div className="flex justify-between py-2 mb-2">
              <div>
                <div className="w-[50px] h-[50px] object-cover rounded-full mr-4">
                  <img src={require("../images/download.png")} alt={'#'} className="w-full h-full rounded-full" />
                </div>
                <div className='user-connected-name'><span className="user-name-chat">{currentChat?.name}</span></div>
              </div>
              <div className="call-buttons">
                <button onClick={handleVideoCall} className="call-button circular">#</button>
                <button className="call-button circular">@</button>
              </div>
            </div>
            {videocallon && <div className='h-screen w-screen bg-slate-900 flex gap-3'>
              <div>
                <h2>my video</h2>
                <button onClick={() => setVideocallon(false)} className="call-button circular">#</button>
                <video ref={videoRef} autoPlay playsInline muted />
              </div>
              <div>
                <h2>others video</h2>
                <video ref={remoteVideoRef} autoPlay playsInline /> </div> </div>}

            {/* Chat Messages */}
            {/* <form onSubmit={e => sendChat(e)}> */}
            <div className='overflow-y-auto max-h-full'>
              <div className="flex flex-col gap-3 h-full">
                <div className={` w-fit max-w-[200px] self-start received rounded-[12px] p-1 bg-[#30475E]`}
                >sgno dkgsns sgnasgk snglsdng </div>
                <div className={`message w-fit max-w-[200px] sent self-end rounded-[12px] p-1 bg-[#F05454]`} >sgno dkgsns sgnasgk snglsdng </div>
                <div className={`message w-fit max-w-[200px] received self-start rounded-[12px] p-1 bg-[#30475E]`}>sgno dkgsns sgnasgk snglsdng </div>
                <div className={`message w-fit max-w-[200px] sent self-end rounded-[12px] p-1 bg-[#F05454]`}>sgno dkgsns sgnasgk snglsdng </div>
                <div className={`message w-fit max-w-[200px] received self-start rounded-[12px] p-1 bg-[#30475E]`}>sgno dkgsns sgnasgk snglsdng </div>
                <div className={`message w-fit max-w-[200px] sent self-end rounded-[12px] p-1 bg-[#F05454]`}>sgno dkgsns sgnasgk snglsdng </div>
                <div className={`message w-fit max-w-[200px] sent self-end rounded-[12px] p-1  bg-[#F05454]`}>sgno dkgsns sgnasgk snglsdng </div>

                <div className={`message w-fit max-w-[200px] received self-start rounded-[12px] p-1 bg-[#30475E]`}>sgno dkgsns sgnasgk snglsdng </div>
                <div className={`message w-fit max-w-[200px] sent self-end rounded-[12px] p-1 bg-[#F05454]`}>sgno dkgsns sgnasgk snglsdng </div>

                {messages?.map((message, index) => (
                  <div
                    key={index}
                    className={`message w-fit rounded-[12px] p-2 px-3 max-w-[200px]  text-end ${message.fromSelf ? 'sent self-end bg-[#F05454]' : 'received bg-[#30475E]'}`}
                  >
                    {message.file ?
                      <>
                        <a download={`nayaymitra.${message.type}`} href={message.file}>download</a>
                        {message.type === "png" ?
                          <img className='h-20 w-20' src={message.file} alt='p' /> :
                          <embed className='h-20 w-20' src={message.file} />
                        }
                      </>

                      : message.message}
                  </div>
                ))}
              </div>
            </div>
            {/* Chat Input */}
            <div className="flex justify-between py-4 ">
              <input
                className='w-[80%] p-2 bg-[#30475E] rounded-[12px]'
                type="text"
                placeholder="Type a message..."
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />
              <input
                type="file"
                onChange={(e) => uploadImage(e.target.files[0], "png")}
                accept='image/png'
                hidden
                id='img'
              />
              <input
                type="file"
                onChange={(e) => uploadImage(e.target.files[0], "pdf")}
                accept='application/pdf'
                hidden
                id='pdf'
              />
              <button className="doc-button" onClick={() => document.getElementById('pdf').click()}>Pdf</button>
              <button className="doc-button" onClick={() => document.getElementById('img').click()}>image</button>

              <button onClick={sendChat} className="send-button text-[#F05454] text-[28px]" disabled={loading} >{loading ? prog : <BiSend />}</button>

            </div>

          </div>
        )}
      </div >
    </div >
  );
};

export default ChatL;
