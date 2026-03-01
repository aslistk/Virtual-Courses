import express from "express";
import {
  googleSignup,
  googleLogin,
  login,
  logOut,
  resetPassword,
  sendOtp,
  signUp,
  verifyOtp,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logOut);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword", resetPassword);
authRouter.post("/googlesignup", googleSignup);
authRouter.post("/googlelogin", googleLogin);
export default authRouter;
