import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const CourseCard = ({ thumbnail, title, category, price, id, reviews }) => {
  const navigate = useNavigate();
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + (review?.rating || 0),
      0,
    );
    return (total / reviews.length).toFixed(1); // rounded to 1 decimal
  };

  // Usage:
  const avgRating = calculateAverageRating(reviews);
  return (
    <div
      className="max-w-sm w-full bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl shadow-blue-500/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => navigate(`/viewcourse/${id}`)}
    >
      {/* Thumbnail */}
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-5 space-y-2">
        {/* Title */}
        <h2 className="text-lg font-semibold text-white">{title}</h2>

        {/* Category */}
        <span className="px-2 py-0.5 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm capitalize">
          {category}
        </span>

        {/* Meta info */}
        <div className="flex justify-between text-sm text-gray-300 mt-3 px-[10px]">
          <span className="font-semibold text-gray-200">₹{price}</span>

          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-500" /> {avgRating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
