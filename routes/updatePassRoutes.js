import express from "express";
import updatePassController from "../controller/updatePassController.js";
import updatePassValidation from "../middlewares/updatePassValidation.js";

const router = express.Router();

router.put(
  "/updatepassword/:email",
  updatePassValidation,
  updatePassController.updatePass
);

export default router;
