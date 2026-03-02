import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axios from "axios";
function EditLecture() {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const { lectureData } = useSelector((state) => state.lecture);
  const selectedLecture = lectureData.find(
    (lecture) => lecture._id === lectureId,
  );
  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture.lectureTitle,
  );
  const [videoUrl, setVideoUrl] = useState(null);
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();

  const formdata = new FormData();
  formdata.append("lectureTitle", lectureTitle);
  formdata.append("videoUrl", videoUrl);
  formdata.append("isPreviewFree", isPreviewFree);

  const handleEditLecture = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + `/api/course/editlecture/${lectureId}`,
        formdata,
        { withCredentials: true },
      );
      dispatch(setLectureData([...lectureData, result.data]));
      toast.success("Lecture updated successfully.");
      navigate("/courses");
      setLoading(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  const removeLecture = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(
        serverUrl + `/api/course/removelecture/${lectureId}`,
        { withCredentials: true },
      );
      setLoading1(false);
      navigate(`/createLecture/${courseId}`);
      toast.success("Lecture removed successfully.");
    } catch (error) {
      setLoading1(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl shadow-blue-500/10 rounded-2xl p-6 space-y-6">
        {/* Header Inside Box */}
        <div className="flex items-center gap-2 mb-2">
          <FaArrowLeft
            className="text-gray-400 hover:text-blue-400 cursor-pointer transition-all duration-300"
            onClick={() => navigate(`/createlecture/${courseId}`)}
          />
          <h2 className="text-xl font-semibold text-white">
            Update Your Lecture
          </h2>
        </div>

        {/* Remove Button Section */}
        <div>
          <button
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm"
            onClick={removeLecture}
            disabled={loading1}
          >
            {loading1 ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Remove Lecture"
            )}
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
              onChange={(e) => setLectureTitle(e.target.value)}
              value={lectureTitle}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Video *
            </label>
            <input
              type="file"
              required
              accept="video/*"
              className="w-full bg-white/5 border border-white/10 text-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-600/20 file:text-blue-300 hover:file:bg-blue-600/30 transition-all duration-300"
              onChange={(e) => setVideoUrl(e.target.files[0])}
            />
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isFree"
              className="accent-blue-500 h-4 w-4"
              onChange={() => setIsPreviewFree((prev) => !prev)}
            />
            <label htmlFor="isFree" className="text-sm text-gray-300">
              Is this video Free?
            </label>
          </div>
        </div>
        <div>{loading ? <p>Uploading video... Please wait.</p> : ""}</div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-blue-500/20"
            disabled={loading}
            onClick={handleEditLecture}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Update Lecture"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditLecture;
