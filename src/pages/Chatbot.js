import React, { useState, useRef, useEffect } from 'react';
import { BiSend } from 'react-icons/bi';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { BsRobot } from "react-icons/bs";
const Chatbot = () => {
  const [userQuery, setUserQuery] = useState('');
  const [botResponse, setBotResponse] = useState([]);
  const chatRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [chatbot, setchatbot] = useState([{ ques: "What is nyaymitra?", ans: "NyayMitra is the E marketplace where user can get best lawyer based in his FIR and get the best advice" }])


  // var chatbot = [{ ques: "What is nyaymitra?", ans: "NyayMitra is the E marketplace where user can get best lawyer based in his FIR and get the best advice" }]
  var chathist = [{ title: "chat A" }, { title: "chat A" }, { title: "chat A" }, { title: "chat A" }, { title: "chat A" }]


  const handleSubmit = (e) => {
    e.preventDefault();
    let chat = { ques: "", ans: "" };
    chat.ques = userQuery

    run()
    chat.ans = botResponse
    console.log(botResponse)
    chatbot.push(chat)
    setchatbot(chatbot)

    setUserQuery('');

    // Scroll to the bottom to show the latest message
    // scrollToBottom();
  };

  // const scrollToBottom = () => {
  //   chatRef.current.scrollTop = chatRef.current.scrollHeight;
  // };

  // useEffect(() => {
  //   // Scroll to the bottom when component first loads
  //   scrollToBottom();
  // }, []);

  // useEffect(() => {
  //   // Scroll to the bottom when new messages are added
  //   scrollToBottom();
  // }, [botResponse]);


  // node --version # Should be >= 18
  // npm install @google/generative-ai

  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const MODEL_NAME = "gemini-pro";
  const API_KEY = "AIzaSyBjlF2uUznivovavDSXU_XP_xKftTrnQMM";

  async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      {
        text: "answer the question that is provided"
      },
    ];

    setLoading(true)

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
    setLoading(false)
    const response = result.response;
    setBotResponse(response.text());
  }



  return (
    <div className='pt-[80px] flex w-full h-[100vh] md:px-4'>
      <div className='w-[20%] hidden sm:block backdrop-blur-xl rounded-[12px] px-4'>
        <div className='flex justify-between p-2 px-4 items-center bg-[#F05454] rounded-[12px] my-4'>
          New Chat
          <div>
            <FaPlus />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          {chathist.map(hist => (
            <div className='flex items-center justify-between px-4 p-2 bg-[#30475E] rounded-[12px] shadow-2xl'>
              <div>
                {hist.title}
              </div>
              <div className=' flex gap-4'>
                <FaEdit />
                <FaTrash />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" md:w-[80%] flex items-center justify-center h-full ">
        <div className=' md:w-[80%] self-center flex flex-col h-full justify-between backdrop-blur-xl p-4 rounded-[12px]'>
          <div className="flex flex-col gap-3 overflow-y-scroll no-scrollbar h-full">

            {chatbot?.map((message, index) => (
              <div
                key={index}
                className={`w-full  self-start received rounded-[12px] p-4 bg-[#30475E]`}
              >
                <div className=' w-full  sent self-end rounded-[12px] p-4 bg-[#F05454] text-[20px]'>{message.ques}</div>
                <div className='p-4 flex  '><span className='text-[#F05454] text-[24px] mr-4'><BsRobot /></span> {message.ans}</div>
              </div>
            ))}
            {loading && <div
              className={`w-full  self-start received rounded-[12px] p-4 bg-[#30475E]`}
            >
              <div className=' w-full  sent self-end rounded-[12px] p-4 bg-[#F05454] text-[20px]'>{userQuery}</div>
              <div className='p-4 flex  '><span className='text-[#F05454] text-[24px] mr-4'><BsRobot /></span> thinking...</div>
            </div>}
          </div>

          <form onSubmit={handleSubmit} className="flex justify-between items-center self-center w-full mt-3 p-2 bg-[#30475E] rounded-[12px]">
            <input
              className='w-full p-2 bg-[#30475E] rounded-[12px] focus:outline-none'
              placeholder="Type your question..."
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
            />
            <button type='submit' className="send-button text-[#F05454] text-[28px]"  ><BiSend /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
