import React from "react";
import about from "../assets/about.jpg";
import video from "../assets/coder.mp4";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BiSolidBadgeCheck } from "react-icons/bi";
function About() {
  return (
    <div className="w-full bg-[#0B1220] lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px] py-10">
      <div className="lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex  items-center justify-center relative">
        <img src={about} className="w-[80%] object-cover rounded-lg " alt="" />
        <div className="max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%]">
          <video
            className="w-full rounded-xl shadow-lg border-2 border-white"
            controls
            autoPlay
            loop
            src={video}
          ></video>
        </div>
      </div>
      <div className="lg:w-[50%] md:w-[70%] w-[100%] h-[100%] flex  items-start justify-center flex-col px-[35px] md:px-[80px]">
        <div className="flex text-[20px] items-center justify-center gap-[20px] text-blue-400">
          About Us <TfiLayoutLineSolid className="w-[40px] h-[40px]" />
        </div>
        <div className="md:text-[45px] text-[35px] font-semibold text-white">
          We Are Maximize Your Learning Growth
        </div>
        <div className="text-[15px] text-gray-300">
          We provide a modern Learning Management System to simplify online
          education, track progress, and enhance student-instructor
          collaboration efficiently.
        </div>
        <div className="w-full lg:w-[60%]">
          <div className="flex items-center justify-between mt-[40px]">
            <div className="flex items-center justify-center gap-[10px] text-gray-200">
              <BiSolidBadgeCheck className="w-[20px] h-[20px] text-blue-400" />
              Simplified Learning
            </div>
            <div className="flex items-center justify-center gap-[10px] text-gray-200">
              <BiSolidBadgeCheck className="w-[20px] h-[20px] text-blue-400" />
              Expert Trainers
            </div>
          </div>
          <div className="flex items-center justify-between mt-[20px]">
            <div className="flex items-center justify-center gap-[10px] text-gray-200">
              <BiSolidBadgeCheck className="w-[20px] h-[20px] text-blue-400" />
              Big Experience
            </div>
            <div className="flex items-center justify-center gap-[10px] text-gray-200">
              <BiSolidBadgeCheck className="w-[20px] h-[20px] text-blue-400" />
              Lifetime Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
