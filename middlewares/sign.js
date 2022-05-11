import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const createTokens = (currentUser) => {
  const accessToken = jwt.sign(
    { email: currentUser.email},
    process.env.SECRETKEY,
    {algorithm: "HS256" , expiresIn: 6000 }
  );

  return accessToken;
};

export default createTokens;
