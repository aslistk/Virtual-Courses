import razorpay from "razorpay";
import dotenv from "dotenv";
import Course from "../model/courseModel.js";
import User from "../model/userModel.js";
dotenv.config();
const RazorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const RazorPayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `${courseId}.toString()`,
    };
    const order = await RazorPayInstance.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error("RazorPay order error:", error);
    return res
      .status(500)
      .json({ message: "Failed to create payment order. Please try again." });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, courseId, userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const orderInfo = await RazorPayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }
      const course = await Course.findById(courseId).populate("lectures");
      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }
      return res
        .status(200)
        .json({ message: "Payment verified and enrollment successful" });
    } else {
      return res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      message:
        "Something went wrong during payment verification. Please try again.",
    });
  }
};
