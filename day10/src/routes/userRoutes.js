import express from "express";
import UserController from "../controllers/userController.js";


const router = express.Router();
const userController = new UserController();

//Inserts user to the DataBase (CREATE)
router.post("/add",userController.addUser);

//read data
router.get("/:id",userController.getUserByID);


//update Data
router.put("/update/:id",userController.updateUser);


//delete
router.delete("/delete/:id",);


//search user by location
router.get("/search/by",userController.searchUserByLocation);

export default router