import express from "express";
import upload from "../middlewares/multer.js";
import validateToken from "../middlewares/verify.js";
import updatePetController from "../controller/petsController.js";
import uploadCloudinary from "../middlewares/cloudinary.js";
import addPetsController from "../controller/petsController.js";
import validation from "../middlewares/validation.js";
import { addPetsSchema } from "../data/petsSchema.js";
import saveController from "../controller/petsController.js";
import unSaveController from "../controller/petsController.js";
import returnAgencyController from "../controller/petsController.js";
import myPetController from "../controller/petsController.js";
import searchPetsController from "../controller/petsController.js";
import { searchSchema } from "../data/petsSchema.js";
import getPetsController from "../controller/petsController.js";
import getPetController from "../controller/petsController.js";
import fosteredController from "../controller/petsController.js";
import adoptController from "../controller/petsController.js";
import deletePetController from '../controller/petsController.js'
const router = express.Router();

router.put("/updatepet/:petsId",validateToken,upload.single("image"),uploadCloudinary,updatePetController.update);

router.post("/pet/:petsId/save", validateToken, saveController.save);

router.delete("/pet/:petsId/delete", validateToken, deletePetController.deletePet);

router.delete("/pet/:petsId/save", validateToken, unSaveController.unSave);

router.post("/pet/:petsId/return",validateToken,returnAgencyController.returnAgency);

router.get("/pets/user/:email", validateToken, myPetController.getMyPet);

router.get("/searchpet",validation(searchSchema),searchPetsController.searchPets);

router.get("/getpets", validateToken, getPetsController.getPets);

router.get("/showpet/:petsId",getPetController.getPet);

router.post("/pet/:petsId/fostered",validateToken,fosteredController.fostered);

router.post("/pet/:petsId/adopt", validateToken, adoptController.adopt);

router.post("/addpets",validateToken,upload.single("image"), uploadCloudinary,validation(addPetsSchema),addPetsController.addPets);

export default router;
