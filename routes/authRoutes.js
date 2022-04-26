import express from "express";
import authController from "../controller/authController.js";
import loginValidation from "../middlewares/loginValidation.js";

const router = express.Router();

router.post("/login", loginValidation, authController.login);

export default router;
