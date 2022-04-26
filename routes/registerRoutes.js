import express from "express";
import registerController from "../controller/registerController.js";
import formValidation from "../middlewares/formValidation.js";

const router = express.Router();

router.post("/register", formValidation, registerController.signUp);

export default router;
