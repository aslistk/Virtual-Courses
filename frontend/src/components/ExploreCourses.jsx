import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from "react-router-dom";
function ExploreCourses() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[50vh] bg-[#0B1220] flex flex-col lg:flex-row items-center justify-center gap-4 px-8 py-12">
      <div className="w-full lg:w-[350px] lg:h-full h-auto flex flex-col items-start justify-center gap-1 md:px-10 px-5">
        <span className="text-[35px] font-semibold text-white">Explore</span>
        <span className="text-[35px] font-semibold text-white">
          Our Courses
        </span>
        <p className="text-[17px] text-gray-300">
          Discover courses across tech, AI, design and more — built by experts
          to help you grow your skills and advance your career.
        </p>
        <button
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 hover:scale-105 active:scale-95 text-white rounded-xl text-[18px] font-light flex gap-2 mt-10 transition-all duration-300 shadow-lg shadow-blue-500/20"
          onClick={() => navigate("/allcourses")}
        >
          Explore Courses <SiViaplay className="w-[28px] h-[28px] fill-white" />
        </button>
      </div>
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-12 lg:mb-0">
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-300">
          <div className="w-[100px] h-[90px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300">
            <TbDeviceDesktopAnalytics className="w-[60px] h-[60px] text-blue-400" />
          </div>
          Web Development
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-300">
          <div className="w-[100px] h-[90px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300">
            <LiaUikit className="w-[60px] h-[60px] text-blue-400" />
          </div>
          UI/UX Designing
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-300">
          <div className="w-[100px] h-[90px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300">
            <MdAppShortcut className="w-[50px] h-[50px] text-blue-400" />
          </div>
          App Development
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-300">
          <div className="w-[100px] h-[90px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300">
            <FaHackerrank className="w-[55px] h-[55px] text-blue-400" />
          </div>
          Ethical Hacking
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-300">
          <div className="w-[100px] h-[90px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300">
            <TbBrandOpenai className="w-[55px] h-[55px] text-blue-400" />
          </div>
          AI/ML
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-300">
          <div className="w-[100px] h-[90px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300">
            <SiGoogledataproc className="w-[45px] h-[45px] text-blue-400" />
          </div>
          Data Science
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-300">
          <div className="w-[100px] h-[90px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300">
            <BsClipboardDataFill className="w-[50px] h-[50px] text-blue-400" />
          </div>
          Data Analytics
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center text-gray-300">
          <div className="w-[100px] h-[90px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300">
            <SiOpenaigym className="w-[50px] h-[50px] text-blue-400" />
          </div>
          AI Tools
        </div>
      </div>
    </div>
  );
}

export default ExploreCourses;
