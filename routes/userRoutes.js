import express from "express";
import validation from "../middlewares/validation.js";
import validateToken from "../middlewares/verify.js";
import updateController from "../controller/userController.js";
import { updateSchema } from "../data/userSchema.js";
import updatePassController from "../controller/userController.js";
import { updatePassSchema } from "../data/userSchema.js";
import registerController from "../controller/userController.js";
import { signUpSchema } from "../data/userSchema.js";
import loginTokenController from "../controller/userController.js";
import getUserPetController from "../controller/petsController.js";
import adminController from "../controller/userController.js";
import authController from "../controller/userController.js";
import { loginSchema } from "../data/userSchema.js";
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router();

router.put(
  "/update/:email",
  validation(updateSchema),
  validateToken,
  updateController.update
);

router.put(
  "/updatepassword/:email",
  validation(updatePassSchema),
  validateToken,
  updatePassController.updatePass
);

router.post("/register", validation(signUpSchema), registerController.signUp);

router.get("/logout", function (req, res) {
  res.clearCookie(process.env.ACCESSTOKENKEY);
  res.send("Cookie cleared");
  console.log("cookie cleared");
});

router.get("/login/:cookie", loginTokenController.getToken);

router.get("/users/:email", validateToken, adminController.checkAdmin);

router.get(
  "/user/:email/full",
  validateToken,
  getUserPetController.getPetsFromUser
);

router.post("/login", validation(loginSchema), authController.login);

export default router;
