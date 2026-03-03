import React from "react";
import Nav from "../components/Nav";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import home from "../assets/home1.jpg";
import Logos from "../components/Logos";
import ExploreCourses from "../components/ExploreCourses";
import CardPage from "../components/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../components/About";
import Footer from "../components/Footer";
import ReviewPage from "../components/ReviewPage";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-[100%] overflow-hidden">
      <Nav />
      <div className="w-[100%] lg:h-[calc(140vh-70px)] h-[calc(70vh-70px)] mt-[70px] relative">
        {/* background image as true full-cover layer */}
        <img
          src={home}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-75"
          alt=""
        />
        {/* gradient overlay to blend top of image with navbar */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0B1220] via-[#0B1220]/40 to-transparent pointer-events-none" />
        {/* gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />

        {/* hero content centered in the visible area */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6 px-4 text-center">
          <h1 className="lg:text-[70px] md:text-[48px] text-[28px] text-white font-bold leading-tight drop-shadow-lg">
            Grow Your Skills to Advance <br className="hidden md:block" /> Your
            Career Path
          </h1>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              className="px-[20px] py-[10px] border border-white/30 text-white bg-white/10 backdrop-blur-sm rounded-xl text-[18px] font-light flex gap-2 cursor-pointer hover:bg-blue-600 hover:border-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out items-center"
              onClick={() => navigate("/allcourses")}
            >
              View All Courses
              <SiViaplay className="w-[26px] h-[26px] fill-white" />
            </button>
            <button
              className="px-[20px] py-[10px] bg-blue-600 text-white rounded-xl text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20"
              onClick={() => navigate("/search")}
            >
              Search with AI
              <img
                src={ai}
                className="w-[30px] h-[30px] rounded-full hidden lg:block"
                alt=""
              />
              <img
                src={ai1}
                className="w-[35px] h-[35px] rounded-full lg:hidden"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
      <Logos />
      <ExploreCourses />
      <CardPage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  );
}

export default Home;
