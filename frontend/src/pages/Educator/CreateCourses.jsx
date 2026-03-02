import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
const CreateCourse = () => {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleCreateCourse = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/course/createcourse",
        { title, category },
        { withCredentials: true },
      );
      toast.success("Course created successfully.");
      navigate("/courses");
      setTitle("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] px-4 py-10">
      <div className="max-w-xl w-[600px] mx-auto p-6 bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl shadow-blue-500/10 rounded-2xl mt-10 relative">
        <FaArrowLeftLong
          className="top-[8%] absolute left-[5%] w-[22px] h-[22px] cursor-pointer text-gray-300 hover:text-blue-400 transition-all duration-300"
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Create Course
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Course Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Course Title
            </label>
            <input
              type="text"
              placeholder="Enter course title"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" className="bg-[#111827]">
                Select category
              </option>
              <option value="App Development" className="bg-[#111827]">
                App Development
              </option>
              <option value="AI/ML" className="bg-[#111827]">
                AI/ML
              </option>
              <option value="AI Tools" className="bg-[#111827]">
                AI Tools
              </option>
              <option value="Data Science" className="bg-[#111827]">
                Data Science
              </option>
              <option value="Data Analytics" className="bg-[#111827]">
                Data Analytics
              </option>
              <option value="Ethical Hacking" className="bg-[#111827]">
                Ethical Hacking
              </option>
              <option value="UI UX Designing" className="bg-[#111827]">
                UI UX Designing
              </option>
              <option value="Web Development" className="bg-[#111827]">
                Web Development
              </option>
              <option value="Others" className="bg-[#111827]">
                Others
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20"
            disabled={loading}
            onClick={handleCreateCourse}
          >
            {loading ? <ClipLoader size={22} color="white" /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
