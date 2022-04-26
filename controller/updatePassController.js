import updatePassModel from "../models/updatePassModel.js";
import bcrypt from "bcrypt";
import createTokens from "../middlewares/sign.js";

async function updatePass(req, res, next) {
  const { email, password, confirmpass } = req.body;
  const loginemail = req.params.email;

  if (password === confirmpass) {
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        const user = await updatePassModel.updatePass(email, hash, loginemail);
        console.log(user);
        if (!user) {
          res
            .status(401)
            .send({
              message: "Password and confirm password must be the same",
            });
        } else {
          const accessToken = createTokens({ email, password });

          res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: false,
          });
          res.status(200).json({ hash, message: "Password updated!" });
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

export default { updatePass };
