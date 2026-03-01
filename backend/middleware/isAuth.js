import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "User doesn't have token" });
    }
    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      if (jwtError.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Session expired, please login again" });
      }
      return res
        .status(401)
        .json({ message: "Invalid token, please login again" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: `isAuth error ${error}` });
  }
};
export default isAuth;
