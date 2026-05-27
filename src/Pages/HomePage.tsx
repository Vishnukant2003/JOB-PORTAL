import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Companies from "../Components/LandingPage/Companies";
import DreamJob from "../Components/LandingPage/DreamJob";
import JobCategory from "../Components/LandingPage/JobCategory";
import Subscribe from "../Components/LandingPage/Subscribe";
import Testimonials from "../Components/LandingPage/Testimonials";
import Working from "../Components/LandingPage/Working";
import ChatBot from "../Components/ChatBot/app";

const HomePage = () => {
  return (
    <div className="relative min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
      <div className="relative z-0">
        <DreamJob />
        <Companies />
        <JobCategory />
        <Working />
        <Testimonials />
        <Subscribe />
      </div>

      {/* ChatBot should be outside the content wrapper and given a high z-index */}
      <div className="fixed bottom-0 right-0 z-50">
        <ChatBot />
      </div>
    </div>
  );
};

export default HomePage;
