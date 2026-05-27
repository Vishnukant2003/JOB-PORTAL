import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import template2 from "../Resume/ResumeImages/template2.png";
import template3 from "../Resume/ResumeImages/template3.png";
import template4 from "../Resume/ResumeImages/template4.png";
import template1 from "../Resume/ResumeImages/template1.jpg";

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Select a template",
    description: "Choose from our library of professional designs",
  },
  {
    title: "Build your resume",
    description: "Use industry-specific bullet points to stand out",
  },
  {
    title: "Customize & send",
    description: "Fine-tune the details and get ready to apply!",
  },
];

const LandingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"resume" | "cover">("resume");
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div id="resume-builder" className="min-h-screen bg-[#262626] text-[#ffcc33] flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold">Resume Builder / My Dashboard</h1>
      <div className="mt-4 flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "resume"
              ? "bg-[#ffcc33] text-black"
              : "bg-gray-700 text-white"
          }`}
          onClick={() => setActiveTab("resume")}
        >
          Resume Builder
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "cover"
              ? "bg-[#ffcc33] text-black"
              : "bg-gray-700 text-white"
          }`}
          onClick={() => setActiveTab("cover")}
        >
          Cover Letter Builder
        </button>
      </div>

      <div className="mt-8 bg-[#333333] p-6 rounded-xl shadow-lg max-w-4xl w-full flex items-center justify-between relative">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold">
            Create Your First Resume in Three Simple Steps
          </h2>
          <div className="mt-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: currentStep === index ? 1 : 0.5, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex items-start space-x-4 mb-4 ${
                  currentStep === index ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center bg-[#ffcc33] text-black font-bold rounded-full">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <div className="mt-12 w-full overflow-hidden relative">
            <motion.div
              className="flex w-max"
              initial={{ x: 0 }} // Start off-screen
              animate={{ x: "-100%" }} // Move completely to the left
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex my-2 space-x-6">
                  <img
                    src={template1}
                    alt="Template 1"
                    className="w-48 my-2 rounded-lg shadow-lg"
                  />
                  <img
                    src={template2}
                    alt="Template 2"
                    className="w-48 rounded-lg shadow-lg"
                  />
                  <img
                    src={template3}
                    alt="Template 3"
                    className="w-48 rounded-lg shadow-lg"
                  />
                  <img
                    src={template4}
                    alt="Template 4"
                    className="w-48 rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <button
            className="mt-4 bg-[#ff4444] text-white px-6 py-3 rounded-lg font-semibold"
            onClick={() => {
              if (currentStep === steps.length - 1) {
                navigate("/home1"); // Navigate on last step
              } else {
                setCurrentStep((prev) => (prev + 1) % steps.length);
              }
            }}
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
