import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";

function ViewLectures() {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const navigate = useNavigate();
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures[0] || null,
  );
  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + "/api/course/creator",
            { userId: selectedCourse?.creator },
            { withCredentials: true },
          );
          setCreatorData(result.data);
        } catch (error) {}
      }
    };
    handleCreator();
  }, [selectedCourse]);
  return (
    <div className="min-h-screen bg-[#0B1220] p-6 flex flex-col md:flex-row gap-6">
      {/* Left - Video & Course Info */}
      <div className="w-full md:w-2/3 bg-[#111827] border border-white/10 rounded-2xl shadow-md p-6">
        {/* Course Details */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center justify-start gap-[20px] text-white">
            <FaArrowLeftLong
              className=" text-white w-[22px] h-[22px] cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => navigate("/")}
            />
            {selectedCourse?.title}
          </h1>

          <div className="mt-2 flex gap-4 text-sm text-gray-400 font-medium">
            <span>Category: {selectedCourse?.category}</span>
            <span>Level: {selectedCourse?.level}</span>
          </div>
        </div>
        {/* Video Player */}
        <div className="aspect-video bg-[#0B1220] rounded-xl overflow-hidden mb-4 border border-white/10">
          {selectedLecture?.videoUrl ? (
            <video
              src={selectedLecture.videoUrl}
              controls
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select a lecture to start watching
            </div>
          )}
        </div>
        {/* Selected Lecture Info */}
        <div className="mt-2">
          <h2 className="text-lg font-semibold text-white">
            {selectedLecture?.lectureTitle}
          </h2>
        </div>
      </div>
      {/* Right - All Lectures + Creator Info */}
      <div className="w-full md:w-1/3 bg-[#111827] border border-white/10 rounded-2xl shadow-md p-6 h-fit">
        <h2 className="text-xl font-bold mb-4 text-white">All Lectures</h2>
        <div className="flex flex-col gap-3 mb-6">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture, index) => (
              <button
                key={index}
                onClick={() => setSelectedLecture(lecture)}
                className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
                  selectedLecture?._id === lecture._id
                    ? "bg-blue-600/20 border-blue-500 text-white"
                    : "hover:bg-white/5 border-white/10 text-gray-300"
                }`}
              >
                <div>
                  <h4 className="text-sm font-semibold text-gray-200">
                    {lecture.lectureTitle}
                  </h4>
                </div>
                <FaPlayCircle className="text-blue-400 text-xl" />
              </button>
            ))
          ) : (
            <p className="text-gray-400">No lectures available.</p>
          )}
        </div>
        {/* Creator Info */}
        {creatorData && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <h3 className="text-md font-semibold text-gray-300 mb-3">
              Instructor
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={creatorData.photoUrl || "/default-avatar.png"}
                alt="Instructor"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-medium text-white">
                  {creatorData.name}
                </h4>
                <p className="text-sm text-gray-400">
                  {creatorData.description || "No bio available."}
                </p>
                <p className="text-sm text-gray-400">
                  {creatorData.email || "No email available."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewLectures;
