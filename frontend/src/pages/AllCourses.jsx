import React, { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import ai from "../assets/SearchAi.png";
import { useSelector } from "react-redux";
function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const { courseData } = useSelector((state) => state.course);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let courseCopy = courseData.slice();

    if (category.length > 0) {
      courseCopy = courseCopy.filter((c) => category.includes(c.category));
    }

    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className="flex min-h-screen bg-[#0B1220]">
      <Nav />
      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarVisible((prev) => !prev)}
        className="fixed top-20 left-4 z-50 bg-white/10 text-white px-3 py-1 rounded-xl border border-white/20 md:hidden hover:bg-blue-600 transition-all duration-300 ease-in-out"
      >
        {isSidebarVisible ? "Hide" : "Show"} Filters
      </button>

      {/* Sidebar */}
      <aside
        className={`w-[260px] h-screen overflow-y-auto bg-[#0B1220] border-r border-white/10 fixed top-0 left-0 p-6 py-[130px] shadow-md transition-transform duration-300 z-5 
        ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} 
        md:block md:translate-x-0`}
      >
        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-white mb-6">
          <FaArrowLeftLong
            className="text-white"
            onClick={() => navigate("/")}
          />
          Filter by Category
        </h2>

        <form
          className="space-y-4 text-sm bg-white/5 border border-white/10 text-gray-200 p-[20px] rounded-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 hover:scale-105 active:scale-95 text-white rounded-xl text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20"
            onClick={() => navigate("/search")}
          >
            Search with AI
            <img src={ai} className="w-[30px] h-[30px] rounded-full" alt="" />
          </button>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-all duration-300">
            <input
              type="checkbox"
              className="accent-blue-500 w-4 h-4 rounded-md"
              value={"App Development"}
              onChange={toggleCategory}
            />
            App Development
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-all duration-300">
            <input
              type="checkbox"
              className="accent-blue-500 w-4 h-4 rounded-md"
              value={"AI/ML"}
              onChange={toggleCategory}
            />
            AI/ML
          </label>

          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-all duration-300">
            <input
              type="checkbox"
              className="accent-blue-500 w-4 h-4 rounded-md"
              value={"AI Tools"}
              onChange={toggleCategory}
            />
            AI Tools
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-all duration-300">
            <input
              type="checkbox"
              className="accent-blue-500 w-4 h-4 rounded-md"
              value={"Data Science"}
              onChange={toggleCategory}
            />
            Data Science
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-all duration-300">
            <input
              type="checkbox"
              className="accent-blue-500 w-4 h-4 rounded-md"
              value={"Data Analytics"}
              onChange={toggleCategory}
            />
            Data Analytics
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-all duration-300">
            <input
              type="checkbox"
              className="accent-blue-500 w-4 h-4 rounded-md"
              value={"Ethical Hacking"}
              onChange={toggleCategory}
            />
            Ethical Hacking
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-all duration-300">
            <input
              type="checkbox"
              className="accent-blue-500 w-4 h-4 rounded-md"
              value={"UI UX Designing"}
              onChange={toggleCategory}
            />
            UI UX Designing
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-all duration-300">
            <input
              type="checkbox"
              className="accent-blue-500 w-4 h-4 rounded-md"
              value={"Web Development"}
              onChange={toggleCategory}
            />
            Web Development
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-all duration-300">
            <input
              type="checkbox"
              className="accent-blue-500 w-4 h-4 rounded-md"
              value={"Others"}
              onChange={toggleCategory}
            />
            Others
          </label>
        </form>
      </aside>

      {/* Main Courses Section */}
      <main className="w-full transition-all duration-300 py-[130px] md:pl-[300px]  flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]">
        {filterCourses?.map((course, index) => (
          <Card
            key={index}
            thumbnail={course.thumbnail}
            title={course.title}
            price={course.price}
            category={course.category}
            id={course._id}
            reviews={course.reviews}
          />
        ))}
      </main>
    </div>
  );
}

export default AllCourses;
