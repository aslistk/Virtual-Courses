import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
function Footer() {
  let navigate = useNavigate();
  return (
    <footer className="bg-[#0B1220] border-t border-white/10 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-[40px] lg:gap-[150px] flex-col lg:flex-row">
        {/* Logo + Description */}
        <div className="lg:w-[40%] md:w-[50%] w-[100%]">
          <img
            src={logo}
            alt="Logo"
            className="h-10 mb-3 rounded-[5px] border border-white/20"
          />
          <h2 className="text-xl font-bold text-white mb-3">Virtual Courses</h2>
          <p className="text-sm text-gray-300">
            AI-powered learning platform to help you grow smarter. Learn
            anything, anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:w-[30%] md:w-[100%]">
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li
              className="text-gray-300 hover:text-blue-400 cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="text-gray-300 hover:text-blue-400 cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => navigate("/allcourses")}
            >
              Courses
            </li>
            <li
              className="text-gray-300 hover:text-blue-400 cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => navigate("/login")}
            >
              Login
            </li>
            <li
              className="text-gray-300 hover:text-blue-400 cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </li>
          </ul>
        </div>

        {/* Explore Categories */}
        <div className="lg:w-[30%] md:w-[100%]">
          <h3 className="text-white font-semibold mb-3">Explore Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-300 hover:text-blue-400 transition-all duration-300 ease-in-out cursor-default">
              Web Development
            </li>
            <li className="text-gray-300 hover:text-blue-400 transition-all duration-300 ease-in-out cursor-default">
              AI/ML
            </li>
            <li className="text-gray-300 hover:text-blue-400 transition-all duration-300 ease-in-out cursor-default">
              Data Science
            </li>
            <li className="text-gray-300 hover:text-blue-400 transition-all duration-300 ease-in-out cursor-default">
              UI/UX Design
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-10 pt-5 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} LearnAI. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
