import React from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { IoEye } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { FaArrowLeftLong } from "react-icons/fa6";
function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, password, email, role },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate("/");
      toast.success("Signed up successfully");
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };
  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlesignup",
        { name, email, role },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Signed up successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    }
  };
  return (
    <div className="bg-[#0B1220] w-[100vw] min-h-[100vh] flex items-center justify-center px-4 py-10">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-[800px] min-h-[600px] bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl shadow-blue-500/10 rounded-2xl flex overflow-hidden relative"
      >
        <FaArrowLeftLong
          className="absolute top-[5%] left-[4%] w-[22px] h-[22px] cursor-pointer text-gray-300 hover:text-blue-400 transition-all duration-300 z-10"
          onClick={() => navigate("/")}
        />
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-full flex flex-col items-center justify-center gap-4 p-8">
          <div className="text-center">
            <h1 className="font-bold text-white text-2xl">Let's get started</h1>
            <h2 className="text-gray-400 text-[16px] mt-1">
              Create your account
            </h2>
          </div>

          <div className="flex flex-col gap-1 w-full items-start justify-center">
            <label
              htmlFor="name"
              className="font-semibold text-gray-300 text-sm"
            >
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              type="text"
              className="w-full h-[40px] bg-white/5 border border-white/10 text-white placeholder-gray-500 text-[15px] px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-1 w-full items-start justify-center">
            <label
              htmlFor="email"
              className="font-semibold text-gray-300 text-sm"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="email"
              className="w-full h-[40px] bg-white/5 border border-white/10 text-white placeholder-gray-500 text-[15px] px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Your email"
            />
          </div>

          <div className="relative flex flex-col gap-1 w-full items-start justify-center">
            <label
              htmlFor="password"
              className="font-semibold text-gray-300 text-sm"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type={show ? "text" : "password"}
              className="w-full h-[40px] bg-white/5 border border-white/10 text-white placeholder-gray-500 text-[15px] px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Your password"
            />
            {show ? (
              <IoEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[4%] bottom-[16%] text-gray-400 hover:text-blue-400 transition-all duration-300"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEyeOutline
                className="absolute w-[20px] h-[20px] cursor-pointer right-[4%] bottom-[16%] text-gray-400 hover:text-blue-400 transition-all duration-300"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <div className="flex w-full items-center justify-around">
            <span
              onClick={() => setRole("student")}
              className={`px-[14px] py-[6px] border rounded-xl cursor-pointer transition-all duration-300 ease-in-out text-sm ${role === "student" ? "border-blue-500 bg-blue-600/20 text-white" : "border-white/20 text-gray-400 hover:border-blue-400"}`}
            >
              Student
            </span>
            <span
              onClick={() => setRole("educator")}
              className={`px-[14px] py-[6px] border rounded-xl cursor-pointer transition-all duration-300 ease-in-out text-sm ${role === "educator" ? "border-blue-500 bg-blue-600/20 text-white" : "border-white/20 text-gray-400 hover:border-blue-400"}`}
            >
              Educator
            </span>
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full h-[42px] bg-blue-600 text-white cursor-pointer flex items-center justify-center rounded-xl hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20 font-medium"
          >
            {loading ? <ClipLoader size={22} color="white" /> : "Sign Up"}
          </button>

          <div className="w-full flex items-center gap-2">
            <div className="flex-1 h-[0.5px] bg-white/10"></div>
            <div className="text-[14px] text-gray-400 px-2">Or continue</div>
            <div className="flex-1 h-[0.5px] bg-white/10"></div>
          </div>

          <div
            className="w-full h-[42px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
            onClick={googleSignUp}
          >
            <img
              className="w-[20px] h-[20px] object-contain rounded-sm"
              src={google}
              alt=""
            />
            <span className="text-[16px] text-gray-300 -ml-1">oogle</span>
          </div>
          <div className="text-gray-400 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-400 hover:text-blue-300 cursor-pointer underline underline-offset-2 transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>

        {/* right div */}
        <div className="w-[50%] rounded-r-2xl bg-[#111827] border-l border-white/10 md:flex items-center justify-center flex-col gap-4 hidden relative overflow-hidden">
          {/* decorative glow */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
            <div className="p-1 rounded-2xl bg-gradient-to-br from-blue-500/30 to-white/5 shadow-xl shadow-blue-500/20">
              <img src={logo} alt="logo" className="w-24 rounded-xl" />
            </div>
            <span className="text-2xl text-white font-bold tracking-tight">
              Virtual Courses
            </span>
            <p className="text-gray-400 text-sm leading-relaxed">
              Learn smarter, grow faster.
            </p>
            <div className="flex gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="w-2 h-2 rounded-full bg-blue-400/50" />
              <div className="w-2 h-2 rounded-full bg-blue-300/30" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
