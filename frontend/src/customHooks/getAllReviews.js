import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setReviewData } from "../redux/reviewSlice";
const getAllReviews = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const allReviews = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/review/getreviews", {
          withCredentials: true,
        });
        dispatch(setReviewData(result.data));
      } catch (error) {}
    };
    allReviews();
  }, []);
};

export default getAllReviews;
