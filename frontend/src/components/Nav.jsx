import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoMdPerson } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";

import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
function Nav() {
  let [showHam, setShowHam] = useState(false);
  let [showPro, setShowPro] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logged out successfully.");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  return (
    <div>
      <div className="w-full h-[70px] fixed top-0 px-5 py-[10px] flex items-center justify-between bg-[#0B1220]/80 backdrop-blur-lg border-b border-white/10 z-10 shadow-xl shadow-blue-500/5">
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px]">
          <img
            src={logo}
            className="w-[60px] rounded-[5px] border-2 border-white/20 cursor-pointer hover:border-blue-400 transition-all duration-300 ease-in-out"
            onClick={() => navigate("/")}
            alt=""
          />
        </div>

        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {!userData ? (
            <IoMdPerson
              className="w-[50px] h-[50px] fill-white cursor-pointer border-2 border-white/20 bg-white/5 rounded-full p-[10px] hover:border-blue-400 transition-all duration-300 ease-in-out"
              onClick={() => setShowPro((prev) => !prev)}
            />
          ) : (
            <div
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-white/5 border-white/20 cursor-pointer hover:border-blue-400 transition-all duration-300 ease-in-out"
              onClick={() => setShowPro((prev) => !prev)}
            >
              {userData?.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  className="w-full h-full rounded-full object-cover"
                  alt=""
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px]">
                  {userData?.name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
          )}
          {userData?.role == "educator" ? (
            <div
              className="px-[20px] py-[10px] border border-white/20 text-white bg-white/5 rounded-xl text-[18px] font-light flex gap-2 cursor-pointer hover:bg-blue-600 hover:border-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          ) : (
            ""
          )}
          {!userData && (
            <span
              className="px-[20px] py-[10px] border border-white/20 text-white rounded-xl text-[18px] font-light cursor-pointer bg-white/5 hover:bg-blue-600 hover:border-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          )}
          {userData && (
            <span
              className="px-[20px] py-[10px] bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 text-[18px] cursor-pointer hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
              onClick={handleLogout}
            >
              LogOut
            </span>
          )}
        </div>
        {showPro && (
          <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-2xl bg-[#111827] px-[15px] py-[10px] border border-white/10 backdrop-blur-lg shadow-xl shadow-blue-500/10">
            <span
              className="bg-white/5 text-white px-[30px] py-[10px] rounded-2xl hover:bg-blue-600 transition-all duration-300 ease-in-out cursor-pointer w-full text-center"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </span>
            <span
              className="bg-white/5 text-white hover:bg-blue-600 px-[25px] py-[10px] rounded-2xl transition-all duration-300 ease-in-out cursor-pointer w-full text-center"
              onClick={() => navigate("/mycourses")}
            >
              My Courses
            </span>
          </div>
        )}
        <GiHamburgerMenu
          className="w-[30px] h-[30px] lg:hidden fill-white cursor-pointer"
          onClick={() => setShowHam((prev) => !prev)}
        />
      </div>
      <div
        className={`fixed top-0 w-[100vw] h-[100vh] bg-[#0B1220]/95 backdrop-blur-lg flex items-center justify-center flex-col gap-5 z-10 ${showHam ? "translate-x-[0%] transition duration-300 ease-in-out" : "translate-x-[-100%] transition duration-300 ease-in-out"}`}
      >
        <GiSplitCross
          className="w-[35px] h-[35px] fill-white absolute top-5 right-[4%] cursor-pointer hover:fill-blue-400 transition-all duration-300"
          onClick={() => setShowHam((prev) => !prev)}
        />
        {!userData ? (
          <IoMdPerson className="w-[50px] h-[50px] fill-white cursor-pointer border-2 border-white/20 bg-white/5 rounded-full p-[10px]" />
        ) : (
          <div
            className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-white/5 border-white/20 cursor-pointer hover:border-blue-400 transition-all duration-300"
            onClick={() => setShowPro((prev) => !prev)}
          >
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                className="w-full h-full rounded-full object-cover"
                alt=""
              />
            ) : (
              <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px]">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
        )}

        <span
          className="flex items-center justify-center gap-2 text-white border border-white/20 bg-white/5 rounded-2xl px-[65px] py-[20px] text-[18px] hover:bg-blue-600 hover:border-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          My Profile
        </span>
        <span
          className="flex items-center justify-center gap-2 text-white border border-white/20 bg-white/5 rounded-2xl px-[65px] py-[20px] text-[18px] hover:bg-blue-600 hover:border-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => navigate("/mycourses")}
        >
          My Courses
        </span>

        {userData?.role == "educator" ? (
          <div
            className="flex items-center justify-center gap-2 text-[18px] text-white border border-white/20 bg-white/5 rounded-2xl px-[60px] py-[20px] hover:bg-blue-600 hover:border-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>
        ) : (
          ""
        )}
        {!userData ? (
          <span
            className="flex items-center justify-center gap-2 text-[18px] text-white border border-white/20 bg-white/5 rounded-2xl px-[80px] py-[20px] hover:bg-blue-600 hover:border-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        ) : (
          <span
            className="flex items-center justify-center gap-2 text-[18px] text-white bg-blue-600 rounded-2xl px-[75px] py-[20px] hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleLogout}
          >
            LogOut
          </span>
        )}
      </div>
    </div>
  );
}

export default Nav;
