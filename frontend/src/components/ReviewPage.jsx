import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

function ReviewPage() {
  const [latestReview, setLatestReview] = useState([]);
  const { reviewData } = useSelector((state) => state.review);

  useEffect(() => {
    setLatestReview(reviewData.slice(0, 6));
  }, [reviewData]);
  return (
    <div className="flex items-center justify-center flex-col bg-[#0B1220] py-10">
      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px] text-white">
        Real Reviews from Real Learners
      </h1>
      <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[20px] mb-[30px] px-[20px] text-gray-300">
        Discover how our Virtual Courses is transforming learning experiences
        through real feedback from students and professionals worldwide.
      </span>
      <div className="w-full flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]">
        {latestReview.map((review, index) => (
          <ReviewCard
            key={index}
            rating={review.rating}
            photoUrl={review.user.photoUrl}
            name={review.user.name}
            comment={review.comment}
            courseTitle={review.course.title}
            description={review.user.description}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
