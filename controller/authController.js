import authModel from "../models/authModel.js";
import bcrypt from "bcrypt";
import createTokens from "../middlewares/sign.js";

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await authModel.login(email);
    console.log(user);
    if (!user.length) {
      res.status(401).send({ message: "Email or password not correct" });
      return;
    } else {
      bcrypt.compare(password, user[0].password, (err, matchPass) => {
        if (matchPass) {
          const accessToken = createTokens(user[0]);
          res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: false,
          });
          res.json({ auth: true, accessToken, user });
        } else {
          res.status(401).send({ message: "Worng password!" });
        }
      });
    }
  } catch (err) {
    next(err);
  }
}
export default { login };
