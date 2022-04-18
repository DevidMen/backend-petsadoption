import authModel from "../models/authModel.js";

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("username or password missing");
      return;
    }

    const user = await authModel.login(email, password);
    if (!user) {
      res.status(401).send("invalid username or password");
      return;
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

export default { login };