import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
const ReviewCard = ({
  comment,
  rating,
  photoUrl,
  name,
  description,
  courseTitle,
}) => {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl shadow-blue-500/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 ease-in-out max-w-sm w-full">
      {/* ⭐ Rating Stars */}
      <div className="flex items-center mb-3 text-yellow-400 text-sm">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i}>{i < rating ? <FaStar /> : <FaRegStar />}</span>
          ))}
      </div>

      {/* 💬 Review Text */}
      <p className="text-gray-300 text-sm">
        Review for :{" "}
        <span className="font-semibold text-gray-200">{courseTitle}</span>
      </p>
      <p className="text-gray-300 text-sm mb-5">
        Review: <span className="font-semibold text-gray-200">{comment}</span>
      </p>

      {/* 👤 Reviewer Info */}
      <div className="flex items-center gap-3">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/40"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {name?.slice(0, 1).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h2 className="font-semibold text-white text-sm">{name}</h2>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
