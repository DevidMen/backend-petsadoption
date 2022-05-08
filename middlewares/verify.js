import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const validateToken = (req, res, next) => {
  const accessToken = req.cookies[process.env.ACCESSTOKENKEY];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated" });

  try {
    const validToken = jwt.verify(accessToken, process.env.SECRETKEY);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ message:"Token expired, please connect again"});
  }
};

export default validateToken;
