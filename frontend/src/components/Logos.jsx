import React from "react";
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
function Logos() {
  return (
    <div className="w-full min-h-[90px] bg-[#0B1220] flex items-center justify-center flex-wrap gap-4 py-6 md:mb-[50px] px-4">
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 ease-in-out">
        <MdCastForEducation className="w-[35px] h-[35px] text-blue-400" />
        <span className="text-gray-200">20k+ Online Courses</span>
      </div>
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 ease-in-out">
        <SiOpenaccess className="w-[30px] h-[30px] text-blue-400" />
        <span className="text-gray-200">Lifetime Access</span>
      </div>
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 ease-in-out">
        <FaSackDollar className="w-[30px] h-[30px] text-blue-400" />
        <span className="text-gray-200">Value For Money</span>
      </div>
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 ease-in-out">
        <BiSupport className="w-[35px] h-[35px] text-blue-400" />
        <span className="text-gray-200">Lifetime Support</span>
      </div>
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 ease-in-out">
        <FaUsers className="w-[35px] h-[35px] text-blue-400" />
        <span className="text-gray-200">Community Support</span>
      </div>
    </div>
  );
}

export default Logos;
