import signUpModel from "../models/registerModel.js";

import bcrypt from "bcrypt";
import createTokens from "../middlewares/sign.js";
async function signUp(req, res, next) {
  const { email, firstname, lastname, password, phone, confirmpass } = req.body;
  if (password === confirmpass) {
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        const user = await signUpModel.signUp(
          email,
          firstname,
          lastname,
          hash,
          phone
        );
        if (!user) {
          res.status(401).send({ message: "Email is already exist" });
        } else {
          const accessToken = createTokens({ email });

          res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: false,
          });
          res.status(200).json({ email, firstname, lastname, hash, phone });
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    return res
      .status(400)
      .json({ message: "Password and confirm Passwad are not the same" });
  }
}

export default { signUp };
