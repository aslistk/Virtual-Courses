import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import { useEffect } from "react";
import img from "../assets/empty.jpg";
import { FaLock, FaPlayCircle, FaStar } from "react-icons/fa";
import { useState } from "react";
import { serverUrl } from "../App";
import Card from "../components/Card.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function ViewCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { selectedCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchCourseData = async () => {
    courseData.map((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course));
        return null;
      }
    });
  };
  useEffect(() => {
    if (creatorData?._id && courseData?.length > 0) {
      const creatorCourse = courseData.filter(
        (course) =>
          course.creator?.toString() === creatorData._id?.toString() &&
          course._id?.toString() !== courseId?.toString(),
      );
      setCreatorCourses(creatorCourse);
    }
  }, [creatorData, courseData]);
  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        setCreatorData(null);
        setCreatorCourses(null);
        try {
          const result = await axios.post(
            serverUrl + "/api/course/creator",
            { userId: selectedCourse?.creator },
            { withCredentials: true },
          );
          setCreatorData(result.data);
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to load creator",
          );
        }
      }
    };
    handleCreator();
  }, [selectedCourse]);

  const checkEnrollment = () => {
    const inUserCourses = userData?.enrolledCourses?.some(
      (c) =>
        (typeof c === "string" ? c : c._id).toString() === courseId?.toString(),
    );
    const inCourseStudents = selectedCourse?.enrolledStudents?.some(
      (id) => id.toString() === userData?._id?.toString(),
    );
    if (inUserCourses && inCourseStudents) {
      setIsEnrolled(true);
    } else {
      setIsEnrolled(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
    checkEnrollment();
  }, [courseData, courseId, userData, selectedCourse]);

  const handleEnroll = async (courseId, userId) => {
    try {
      // Load Razorpay script on demand only when user initiates payment
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const orderData = await axios.post(
        serverUrl + "/api/order/razorpay-order",
        { userId, courseId },
        { withCredentials: true },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "VIRTUAL COURSES",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: orderData.data.id,
        handler: async function (response) {
          try {
            const verifyPayment = await axios.post(
              serverUrl + "/api/order/verifypayment",
              { ...response, courseId, userId },
              { withCredentials: true },
            );
            setIsEnrolled(true);
            toast.success(verifyPayment.data.message);
          } catch (error) {
            toast.error(error.response.data.message);
          }
        },
      };
      const rzp = new window.Razorpay(options).open();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleReview = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/review/createreview",
        { courseId, rating, comment },
        { withCredentials: true },
      );
      setLoading(false);
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      setRating(0);
      setComment("");
    }
  };

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce(
      (sum, review) => sum + (review?.rating || 0),
      0,
    );
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAvgReview(selectedCourse?.reviews);

  return (
    <div className="min-h-screen bg-[#0B1220] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-[#111827] border border-white/10 shadow-2xl shadow-blue-500/5 rounded-2xl p-6 space-y-6 relative">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong
              className="text-gray-300 hover:text-blue-400 w-[22px] h-[22px] cursor-pointer mb-3 transition-all duration-300"
              onClick={() => navigate("/")}
            />
            {selectedCourse?.thumbnail ? (
              <img
                src={selectedCourse?.thumbnail}
                alt="Course Thumbnail"
                className="rounded-xl w-full object-cover"
              />
            ) : (
              <img
                src={img}
                alt="Course Thumbnail"
                className="rounded-xl  w-full  object-cover"
              />
            )}
          </div>
          <div className="flex-1 space-y-3 mt-[20px]">
            <h1 className="text-2xl font-bold text-white">
              {selectedCourse?.title}
            </h1>
            <p className="text-gray-300">{selectedCourse?.subTitle}</p>

            {/* Rating & Price */}
            <div className="flex items-start flex-col justify-between gap-2">
              <div className="text-yellow-400 font-medium flex gap-2">
                ⭐{avgRating}
                <span className="text-gray-400">
                  ({selectedCourse?.reviews?.length || 0} reviews)
                </span>
              </div>
              <div>
                <span className="text-xl font-semibold text-white">
                  ₹{selectedCourse?.price}
                </span>{" "}
                <span className="line-through text-sm text-gray-500">
                  ₹1499
                </span>
              </div>
            </div>
            <ul className="text-sm text-gray-300 space-y-1 pt-2">
              <li>✅ 10+ hours of video content</li>
              <li>✅ Lifetime access to course materials</li>
            </ul>
            {/* Enroll Button */}
            {!isEnrolled ? (
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-500 hover:scale-105 active:scale-95 mt-3 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20"
                onClick={() => handleEnroll(courseId, userData._id)}
              >
                Enroll Now
              </button>
            ) : (
              <button
                className="bg-green-600/20 border border-green-500/40 text-green-400 px-6 py-2 rounded-xl hover:bg-green-600/30 mt-3 transition-all duration-300"
                onClick={() => navigate(`/viewlecture/${courseId}`)}
              >
                Watch Now
              </button>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white">
            What You'll Learn
          </h2>
          <ul className="list-disc pl-6 text-white space-y-1">
            <li>Learn {selectedCourse?.category} from Beginning</li>
          </ul>
        </div>
        {/* Requirements */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white">
            Requirements
          </h2>
          <p className="text-white">
            Basic programming knowledge is helpful but not required.
          </p>
        </div>

        {/* Who This Course Is For */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white">
            Who this course is for?{" "}
          </h2>
          <p className="text-white">
            Beginners, aspiring developers, and professionals looking to upgrade
            skills.
          </p>
        </div>
        {/* course lecture   */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white/5 border border-white/10 w-full md:w-2/5 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-1 text-white">
              Course Curriculum
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              {selectedCourse?.lectures?.length} Lectures
            </p>
            <div className="flex flex-col gap-3">
              {selectedCourse?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  disabled={!lecture.isPreviewFree}
                  onClick={() => {
                    if (lecture.isPreviewFree) {
                      setSelectedLecture(lecture);
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 text-left ${
                    lecture.isPreviewFree
                      ? "hover:bg-blue-600/20 hover:border-blue-500/50 cursor-pointer border-white/10"
                      : "cursor-not-allowed opacity-50 border-white/5"
                  } ${
                    selectedLecture?.lectureTitle === lecture.lectureTitle
                      ? "bg-blue-600/20 border-blue-500/50"
                      : ""
                  }`}
                >
                  <span className="text-lg text-blue-400">
                    {lecture.isPreviewFree ? <FaPlayCircle /> : <FaLock />}
                  </span>
                  <span className="text-sm font-medium text-gray-200">
                    {lecture.lectureTitle}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 w-full md:w-3/5 p-6 rounded-2xl shadow-lg">
            <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 bg-[#0B1220] border border-white/10 flex items-center justify-center">
              {selectedLecture?.videoUrl ? (
                <video
                  src={selectedLecture.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">
                  Select a preview lecture to watch
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-white mb-1">
              {selectedLecture?.lectureTitle || "Lecture Title"}
            </h3>
            <p className="text-gray-400 text-sm">{selectedCourse?.title}</p>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6">
          <h2 className="text-xl font-semibold mb-2 text-white">
            Write a Review
          </h2>
          {isEnrolled ? (
            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer w-5 h-5 transition-all duration-300 ${
                      rating >= star ? "fill-yellow-400" : "fill-gray-600"
                    }`}
                  />
                ))}
              </div>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder="Write your comment here..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                rows="3"
              />
              <button
                className="bg-blue-600 text-white mt-3 px-4 py-2 rounded-xl hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20"
                onClick={handleReview}
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={22} color="white" />
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          ) : (
            <p className="text-red-400 font-semibold">
              You must enroll in this course to leave a review.
            </p>
          )}
          <div className="flex items-center gap-4 pt-8 border-t border-white/10">
            {creatorData?.photoUrl ? (
              <img
                src={creatorData?.photoUrl}
                alt="Instructor"
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/40"
              />
            ) : (
              <img
                src={img}
                alt="Instructor"
                className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-white">
                {creatorData?.name}
              </h3>
              <p className="md:text-sm text-gray-300 text-[10px]">
                {creatorData?.description}
              </p>
              <p className="md:text-sm text-gray-400 text-[10px]">
                {creatorData?.email}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold mb-3 text-white">
              Other Published Courses by the Educator -
            </p>
            <div className="w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]">
              {creatorCourses?.map((item, index) => (
                <Card
                  key={index}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  id={item._id}
                  price={item.price}
                  category={item.category}
                  reviews={item.reviews}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
