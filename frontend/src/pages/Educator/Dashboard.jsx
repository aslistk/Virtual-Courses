import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import img from "../../assets/empty.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  const courseProgressData =
    creatorCourseData?.map((course) => ({
      name: course.title.slice(0, 10) + "...",
      lectures: course.lectures.length || 0,
    })) || [];

  const enrollData =
    creatorCourseData?.map((course) => ({
      name: course.title.slice(0, 10) + "...",
      enrolled: course.enrolledStudents?.length || 0,
    })) || [];

  const totalEarnings =
    creatorCourseData?.reduce((sum, course) => {
      const studentCount = course.enrolledStudents?.length || 0;
      const courseRevenue = course.price ? course.price * studentCount : 0;
      return sum + courseRevenue;
    }, 0) || 0;

  return (
    <div className="flex min-h-screen bg-[#0B1220]">
      <FaArrowLeftLong
        className="w-[22px] absolute top-[10%]
      left-[10%] h-[22px] cursor-pointer text-gray-300 hover:text-blue-400 transition-colors"
        onClick={() => navigate("/")}
      />
      <div className="w-full px-6 py-10 bg-[#0B1220] space-y-10">
        {/* Welcome Section */}
        <div className="max-w-5xl mx-auto bg-[#111827] border border-white/10 rounded-xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-6">
          {userData?.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt="Educator"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-blue-600/30 border-4 border-blue-500 shadow-md flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {userData?.name?.slice(0, 1).toUpperCase() || "E"}
              </span>
            </div>
          )}
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-white">
              Welcome, {userData?.name || "Educator"} 👋
            </h1>
            <h1 className="text-xl font-semibold text-white">
              Total Earning :{" "}
              <span className="font-light text-blue-400">
                ₹{totalEarnings.toLocaleString()}
              </span>
            </h1>
            <p className="text-gray-300 text-sm">
              {userData?.description ||
                "Start creating amazing courses for your students!"}
            </p>
            <h1
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95"
              onClick={() => navigate("/courses")}
            >
              Create Courses
            </h1>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress Chart */}
          <div className="bg-[#111827] border border-white/10 rounded-lg shadow-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Course Progress (Lectures)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="lectures" fill="#2563eb" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrolled Students Chart */}
          <div className="bg-[#111827] border border-white/10 rounded-lg shadow-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Student Enrollment
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="enrolled" fill="#2563eb" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
