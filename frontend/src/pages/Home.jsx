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
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        {/* background image as true full-cover layer */}
        <img
          src={home}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-110"
          alt=""
        />
        {/* bottom fade into page background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
        <Nav />
        <span className="lg:text-[70px] absolute  md:text-[40px]  lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px] ">
          Grow Your Skills to Advance
        </span>
        <span className="lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold">
          Your Career Path
        </span>
        <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-full flex items-center justify-center gap-3 flex-wrap px-4">
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
