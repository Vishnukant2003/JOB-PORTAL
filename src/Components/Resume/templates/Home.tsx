import React, { useState } from "react";
import Header from "../Header1"; // Corrected import
import ResumeForm from "../ResumeForm"; // Corrected import path
import Chatbot from "../../ChatBot/app";

const Home = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div id="home1" className="min-h-screen bg-[#3d3d3d]">
      {/* Header with Template Selection */}
     

      {/* Main Resume Builder Section */}
      <div className="flex flex-col md:flex-row justify-center items-start p-4 gap-6">
        {/* Resume Form */}
        <ResumeForm />

        {/* Resume Preview */}
        {/* Uncomment this if you want the preview to be displayed */}
        {/* <ResumePreview selectedTemplate={selectedTemplate} /> */}
      </div>
      <div className="fixed bottom-0 right-0 z-50">
        <Chatbot/>
      </div>
    </div>
  );
};

export default Home;
