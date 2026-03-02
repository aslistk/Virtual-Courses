import React, { useState } from "react";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import { RiMicAiFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import start from "../assets/start.mp3";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

function SearchWithAi() {
  const startSound = new Audio(start);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);
  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }
  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecognition();
  if (!recognition) {
    toast.error("Speech Recognition not supported in this browser.");
  }
  const handleSearch = async () => {
    setListening(true);
    if (!recognition) return;
    recognition.start();
    startSound.play();
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
    };
  };

  const handleRecommendation = async (query) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/course/search",
        { input: query },
        { withCredentials: true },
      );
      setRecommendations(result.data);
      setListening(false);
      if (result.data.length > 0) {
        speak("These are the top courses that I found for you.");
      } else {
        speak("No courses found");
      }
    } catch (error) {
      setListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col items-center px-4 py-16">
      {/* Search Container */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative">
        <FaArrowLeftLong
          className="text-white w-[22px] h-[22px] cursor-pointer absolute hover:text-blue-400 transition-colors"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center justify-center gap-2">
          <img src={ai} className="w-8 h-8 sm:w-[30px] sm:h-[30px]" alt="AI" />
          Search with <span className="text-blue-400">AI</span>
        </h1>
        <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden shadow-lg relative w-full">
          <input
            type="text"
            className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            placeholder="What do you want to learn? (e.g. AI, MERN, Cloud...)"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />

          {input && (
            <button
              className="absolute right-14 sm:right-16 bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-110"
              onClick={() => handleRecommendation(input)}
            >
              <IoSearch className="w-4 h-4 text-white" />
            </button>
          )}

          <button
            className="absolute right-2 bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-110"
            onClick={handleSearch}
          >
            <RiMicAiFill className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <div className="w-full max-w-6xl mt-12 px-2 sm:px-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-white text-center flex items-center justify-center gap-3">
            <img
              src={ai1}
              className="w-10 h-10 sm:w-[60px] sm:h-[60px] p-2 rounded-full"
              alt="AI Results"
            />
            AI Search Results
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {recommendations.map((course, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur-lg text-gray-200 p-5 rounded-2xl shadow-md hover:shadow-blue-500/20 transition-all duration-200 cursor-pointer hover:bg-blue-600/20 hover:-translate-y-1"
                onClick={() => navigate(`/viewcourse/${course._id}`)}
              >
                <h3 className="text-lg font-bold sm:text-xl text-white">
                  {course.title}
                </h3>
                <p className="text-sm text-blue-400 mt-1">{course.category}</p>
              </div>
            ))}
          </div>
        </div>
      ) : listening ? (
        <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">
          Listening...
        </h1>
      ) : (
        <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">
          No Courses Found
        </h1>
      )}
    </div>
  );
}

export default SearchWithAi;
