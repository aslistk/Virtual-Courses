import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setLectureData } from "../../redux/lectureSlice";

function CreateLecture() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const handleCreateLecture = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + `/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true },
      );
      dispatch(setLectureData([...lectureData, result.data.lecture]));
      toast.success("Lecture created successfully.");
      setLoading(false);
      setLectureTitle("");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const result = await axios.get(
          serverUrl + `/api/course/courselecture/${courseId}`,
          { withCredentials: true },
        );

        dispatch(setLectureData(result.data.lectures));
      } catch (error) {}
    };
    getCourseLecture();
  }, []);
  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4">
      <div className="bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl shadow-blue-500/10 rounded-2xl w-full max-w-2xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white mb-1">
            Let’s Add a Lecture
          </h1>
          <p className="text-sm text-gray-400">
            Enter the title and add your video lectures to enhance your course
            content.
          </p>
        </div>
        <input
          type="text"
          placeholder="e.g. Introduction to MERN Stack"
          className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 mb-4"
          onChange={(e) => setLectureTitle(e.target.value)}
          value={lectureTitle}
        />
        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 text-sm font-medium transition-all duration-300"
            onClick={() => navigate(`/editcourse/${courseId}`)}
          >
            <FaArrowLeft /> Back to Course
          </button>
          <button
            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 text-sm font-medium shadow-lg shadow-blue-500/20"
            disabled={loading}
            onClick={handleCreateLecture}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Create Lecture"
            )}
          </button>
        </div>
        {/* Lecture List */}
        <div className="space-y-2">
          {lectureData.map((lecture, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl flex justify-between items-center p-3 text-sm font-medium text-gray-200 hover:bg-blue-600/20 hover:border-blue-500/40 transition-all duration-300"
            >
              <span>
                Lecture - {index + 1} : {lecture.lectureTitle}
              </span>
              <FaEdit
                className="text-gray-400 hover:text-blue-400 cursor-pointer transition-all duration-300"
                onClick={() =>
                  navigate(`/editlecture/${courseId}/${lecture._id}`)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
