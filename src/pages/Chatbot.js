import React, { useState, useRef, useCallback } from 'react';
import { BiSend } from 'react-icons/bi';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { BsRobot } from "react-icons/bs";
import { HuggingFaceInference } from "@langchain/community/llms/hf";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import pdfToText from "react-pdftotext";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import {  RunnableWithMessageHistory } from "@langchain/core/runnables";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";

let messageHistories = new Map();
const sessionId = Date.now().toString();


const Chatbot = () => {
  const [userQuery, setUserQuery] = useState('');
  const chainRef = useRef();
  const [loading, setLoading] = useState(false)
  const [chatbot, setchatbot] = useState([{ ques: "What is nyaymitra?", ans: "NyayMitra is the E marketplace where user can get best lawyer based in his FIR and get the best advice" }])
  const [firpdf, setFirpdf] = useState()
  const [chats, setChats] = useState([{ ques: "What is nyaymitra?", ans: "NyayMitra is the E marketplace where user can get best lawyer based in his FIR and get the best advice" }])

  // var chatbot = [{ ques: "What is nyaymitra?", ans: "NyayMitra is the E marketplace where user can get best lawyer based in his FIR and get the best advice" }]
  var chathist = [{ title: "chat A" }, { title: "chat A" }, { title: "chat A" }, { title: "chat A" }, { title: "chat A" }]


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let chat = { ques: "", ans: "" };
  //   chat.ques = userQuery

  //   chat.ans = botResponse
  //   console.log(botResponse)
  //   chatbot.push(chat)
  //   setchatbot(chatbot)

  //   setUserQuery('');

  //   // Scroll to the bottom to show the latest message
  //   // scrollToBottom();
  // };

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
  const handleFileChange = async (e) => {
    e.preventDefault();
    const file= e?.target?.files?.[0];
    const text = await pdfToText(file);
    setFirpdf(text);
    initializeAi()
  };


  const initializeAi = useCallback(async () => {
    const model = new HuggingFaceInference({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1", //mistralai/Mixtral-8x7B-Instruct-v0.1 //meta-llama/Meta-Llama-3-8B-Instruct
      apiKey: process.env.REACT_APP_HUGGINGFACEHUB_API_KEY, // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
      // maxTokens: 800,
      temperature: 0.7,
      topP: 0.9,
    });

    const embeddings = new HuggingFaceInferenceEmbeddings({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      apiKey: process.env.REACT_APP_HUGGINGFACEHUB_API_KEY,
    });
    const vectorStore = await MemoryVectorStore.fromTexts(
      [firpdf],
      [{ id: 1 }],
      embeddings
    );
    const retriever = vectorStore.asRetriever();

    const contextualizeQSystemPrompt = `
  Given a chat history and the latest user question
 which might reference context in the chat history,
 formulate a standalone question which can be understood
 without the chat history. Do NOT answer the question, just
  reformulate it if needed and otherwise return it as is.`;

    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
      ["system", contextualizeQSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const historyAwareRetriever = await createHistoryAwareRetriever({
      llm: model,
      retriever,
      rephrasePrompt: contextualizeQPrompt,
    });

    const qaSystemPrompt = `You are an AI legal expert specializing in Indian law. Your role is to assist users in understanding legal matters based on the information provided. The user has submitted an FIR document, which is embedded into this context to give you detailed case-specific information. \n\n {context} `;

    const qaPrompt = ChatPromptTemplate.fromMessages([
      ["system", qaSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const questionAnswerChain = await createStuffDocumentsChain({
      llm: model,
      prompt: qaPrompt,
    });
    const runnable = await createRetrievalChain({
      retriever: historyAwareRetriever,
      combineDocsChain: questionAnswerChain,
    });

    chainRef.current = new RunnableWithMessageHistory({
      runnable,
      getMessageHistory: async (sessionId) => {
        if (!messageHistories.has(sessionId)) {
          messageHistories.set(sessionId, new InMemoryChatMessageHistory());
        }
        const history = messageHistories.get(sessionId);
        if (!history) throw new Error(`Failed `)
        return history
      },
      // getMessageHistory: (sessionid) => memory,
      inputMessagesKey: "input",
      historyMessagesKey: "chat_history",
      outputMessagesKey: "answer",
    });
  }, [firpdf]);

  // useEffect(() => {
  //   initializeAi();
  // }, [initializeAi]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userQuery === "") return;
    let newchat = chats;
    // newchat.push({ role: "user", content: userQuery });
    // setChats(newchat);
    console.log(chainRef);
    const resdata = await chainRef?.current?.invoke(
      { input: userQuery },
      { configurable: { sessionId } }
    );
    console.log(resdata);
    console.log(messageHistories);
    const reply = resdata?.answer
      // .split("(Note:")[0]
      // .split("Human:")[0]
      // .split("AI:")
      // .slice(1)
      // .join(" ");
    // .split("System:")
    // .slice(1)
    // .join(" ")

    setUserQuery("");
    let newaichat = chats;
    newaichat.push({ ques: userQuery, ans: reply });
    setChats(newaichat);
    console.log(chainRef);
  };
 
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
            {chats?.map((message, index) => (
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
            
            <input
              type="file"
              name="resume"
              onChange={(e) => handleFileChange(e)}
              hidden
              id="resume"
            />
            <button
              onClick={() => document.getElementById("resume")?.click()}
              className="py-3 px-10 bg-[#F05454] rounded-3xl"
            >
              FIR
            </button>

            <button type='submit' className="send-button bg-[#F05454] rounded-3xl py-3 px-8 ml-4 text-[#30475E] text-[28px]"  ><BiSend /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
