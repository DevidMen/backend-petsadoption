import express from "express";
import updateController from "../controller/updateController.js";
import formupdateValidation from "../middlewares/formupdateValidation.js";

const router = express.Router();

router.put("/update/:email", formupdateValidation, updateController.update);

export default router;
