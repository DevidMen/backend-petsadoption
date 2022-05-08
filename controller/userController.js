import bcrypt from "bcrypt";
import createTokens from "../middlewares/sign.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
async function updatePass(req, res, next) {
  const { email, password, confirmpass } = req.body;
  const loginemail = req.params.email;

  if (password === confirmpass) {
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        const user = await userModel.updatePass(email, hash, loginemail);

        if (!user) {
          res.status(401).send({
            message: "Password and confirm password must be the same",
          });
        } else {
          const accessToken = createTokens({ email, password });

          res.cookie(process.env.ACCESSTOKENKEY, accessToken, {
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
      .json({ message: "Password and confirm Password are not the same" });
  }
}

async function update(req, res, next) {
  const { email, firstname, lastname, phone, biography } = req.body;
  const loginEmail = req.params.email;

  try {
    const user = await userModel.update(
      biography,
      email,
      firstname,
      lastname,
      phone,
      loginEmail
    );

    if (!user) {
      res.status(401).send({ message: "Email is already exist" });
    } else {
      const accessToken = createTokens({ email });

      res.cookie(process.env.ACCESSTOKENKEY, accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: false,
      });
      res.status(200).json({
        email,
        firstname,
        lastname,
        biography,
        phone,
        message: "Profile update with success!",
      });
    }
  } catch (err) {
    next(err);
  }
}

async function signUp(req, res, next) {
  const { email, firstname, lastname, password, phone, confirmpass } = req.body;
  if (password === confirmpass) {
    try {
      bcrypt.hash(password, 10, async (err, hash) => {
        const user = await userModel.signUp(
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

          res.cookie(process.env.ACCESSTOKENKEY, accessToken, {
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

async function getToken(req, res, next) {
  const token = req.params.cookie;
  try {
    const decode = jwt.verify(token, process.env.SECRETKEY);
    const user = await userModel.getToken(decode.email);
    if (!(user || decode)) {
    }
    if (!token) {
      if (!(user || decode)) {
        res.status(401).json({ message: "Tokex expired pleace connect again" });
      }
      res.status(401).send({ auth: false, message: "Email is not exist" });
      return;
    } else {
      res.json({ auth: true, user });
    }
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email);

    if (!user.length) {
      res.status(401).send({ message: "Email or password not correct" });
      return;
    } else {
      bcrypt.compare(password, user[0].password, (err, matchPass) => {
        if (matchPass) {
          const accessToken = createTokens(user[0]);
          res.cookie(process.env.ACCESSTOKENKEY, accessToken, {
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

async function checkAdmin(req, res, next) {
  const email = req.params.email;
  if (email) {
    try {
      const result = await userModel.checkAdmin(email);

      if (!result) {
        res.status(401).send({ message: "You are not admin" });
      } else {
        res.status(200).json({ result });
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.json({
      login: false,
      data: "error",
    });
  }
}

export default { updatePass, update, signUp, getToken, login, checkAdmin };
