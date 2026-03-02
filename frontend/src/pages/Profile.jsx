import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B1220] px-4 py-10 flex items-center justify-center">
      <div className="bg-[#111827] border border-white/10 shadow-2xl rounded-2xl p-8 max-w-xl w-full relative">
        <FaArrowLeftLong
          className="absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer text-gray-300 hover:text-blue-400 transition-all duration-300"
          onClick={() => navigate("/")}
        />
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          {userData?.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt=""
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] bg-blue-600/20 border-2 border-blue-500 cursor-pointer">
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
          <h2 className="text-2xl font-bold mt-4 text-white">
            {userData?.name}
          </h2>
          <p className="text-sm text-blue-400 capitalize">{userData?.role}</p>
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-4">
          <div className="text-sm">
            <span className="font-semibold text-gray-300">Email: </span>
            <span className="text-gray-200">{userData?.email}</span>
          </div>

          <div className="text-sm">
            <span className="font-semibold text-gray-300">Bio: </span>
            <span className="text-gray-200">{userData?.description}</span>
          </div>

          <div className="text-sm">
            <span className="font-semibold text-gray-300">
              Enrolled Courses:
            </span>
            <span className="text-gray-200">
              {userData?.enrolledCourses?.length ?? 0}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 active:scale-95 cursor-pointer transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
