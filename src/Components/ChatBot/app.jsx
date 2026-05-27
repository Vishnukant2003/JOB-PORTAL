import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "../ChatBot/ChatMessage";
import { companyInfo } from "./ComponyInfo";
import axiosInstance from "../../Interceptor/AxiosInterceptor";

const App = () => {
  const chatBodyRef = useRef();
  const [showChatbot, setShowChatbot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "user",
      text: companyInfo,
    },
    {
      hideInChat: true,
      role: "model",
      text: "Understood. I will act as the AI chatbot for this company.",
    }
  ]);
  const generateBotResponse = async (history) => {
    // Helper function to update chat history
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [...prev.filter((msg) => msg.text != "Thinking..."), { role: "model", text, isError }]);
    };
    // Format chat history for API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    try {
      setIsLoading(true);
      // Make the API call to get the bot's response from our own backend
      const { data } = await axiosInstance.post('/api/qna/ask', { contents: history });

      // Clean and update chat history with bot's response
      const responseData = typeof data === 'string' ? JSON.parse(data) : data;
      
      if (responseData.error) {
        updateHistory(responseData.error, true);
        return;
      }

      const apiResponseText = responseData.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      // Update chat history with the error message
      const errorMessage = error.response?.status === 429 
        ? "I'm receiving too many requests right now. Please wait a moment and try again." 
        : error.message;
      updateHistory(errorMessage, true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Auto-scroll whenever chat history updates
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [chatHistory]);
  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">AI Chatbot</h2>
          </div>
          <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>
        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there  <br /> How can I help you today?
            </p>
          </div>
          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
export default App;