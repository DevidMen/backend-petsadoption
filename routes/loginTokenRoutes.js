import express from "express";
import loginTokenController from "../controller/loginTokenController.js";

const router = express.Router();

router.get("/login/:cookie", loginTokenController.getToken);

export default router;
