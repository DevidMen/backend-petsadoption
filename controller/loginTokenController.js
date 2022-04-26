import loginTokenModel from "../models/loginTokenModel.js";
import jwt from "jsonwebtoken";
async function getToken(req, res, next) {
  const token = req.params.cookie;
  try {
    const decode = jwt.verify(token, "ciaociao");
    const user = await loginTokenModel.getToken(decode);
    console.log(user);
    if (!token) {
      res.status(401).send({ auth: false, message: "Email is not exist" });
      return;
    } else {
      res.json({ auth: true, user });
    }
  } catch (err) {
    next(err);
  }
}
export default { getToken };
