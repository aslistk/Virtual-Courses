import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
function MyEnrolledCourses() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen w-full px-4 py-9 bg-[#0B1220]">
      <FaArrowLeftLong
        className="absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer text-gray-300 hover:text-blue-400 transition-colors"
        onClick={() => navigate("/")}
      />
      <h1 className="text-3xl text-center font-bold text-white mb-6">
        My Enrolled Courses
      </h1>
      {!userData || userData.enrolledCourses.length === 0 ? (
        <p className="text-gray-400 text-center w-full">
          You haven’t enrolled in any course yet.
        </p>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-8">
          {userData.enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-blue-500/10 transition-all duration-300"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white">
                  {course.title}
                </h2>
                <p className="text-sm text-blue-400 mb-1">{course.category}</p>
                <p className="text-sm text-gray-300">{course.level}</p>
                <button
                  className="w-full text-center py-2 mt-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[15px] font-light cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEnrolledCourses;
