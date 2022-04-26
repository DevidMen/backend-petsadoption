import updateModel from "../models/updateModel.js";
import createTokens from "../middlewares/sign.js";

async function update(req, res, next) {
  const { email, firstname, lastname, phone, biography } = req.body;
  const loginEmail = req.params.email;

  try {
    const user = await updateModel.update(
      biography,
      email,
      firstname,
      lastname,
      phone,
      loginEmail
    );
    console.log(user);
    if (!user) {
      res.status(401).send({ message: "Email is already exist" });
    } else {
      const accessToken = createTokens({ email });

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: false,
      });
      res
        .status(200)
        .json({
          email,
          firstname,
          lastname,
          biography,
          phone,
          message: "updated!",
        });
    }
  } catch (err) {
    next(err);
  }
}

export default { update };
