import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function EditProfile() {
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData.name || "");
  const [description, setDescription] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("photoUrl", photoUrl);

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/user/profile",
        formData,
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      navigate("/");
      setLoading(false);

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] px-4 py-10">
      <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl shadow-2xl shadow-blue-500/10 p-8 max-w-xl w-full relative">
        <FaArrowLeftLong
          className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer text-gray-300 hover:text-blue-400 transition-all duration-300"
          onClick={() => navigate("/profile")}
        />
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Edit Profile
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Profile Photo */}
          <div className="flex flex-col items-center text-center">
            {userData.photoUrl ? (
              <img
                src={userData?.photoUrl}
                alt=""
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg shadow-blue-500/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-blue-600/20 border-blue-500 cursor-pointer">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">
              Select Avatar
            </label>
            <input
              type="file"
              name="photoUrl"
              placeholder="Photo URL"
              accept="image/*"
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 text-gray-200 rounded-xl text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-blue-600/20 file:text-blue-300 hover:file:bg-blue-600/40 transition-all duration-300 cursor-pointer"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder={userData.name}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              readOnly
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 text-gray-500 rounded-xl cursor-not-allowed"
              placeholder={userData.email}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              rows={3}
              placeholder="Tell us about yourself"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl font-medium cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg shadow-blue-500/20"
            disabled={loading}
            onClick={handleEditProfile}
          >
            {loading ? <ClipLoader size={22} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
