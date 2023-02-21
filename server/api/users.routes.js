import express from "express";
import UserController from "./users.controller";

const router = express.Router()

router.route("/login").get(UserController.apiGetAllUsers)
router.route("/login/:id").get(UserController.apiGetUser)
router.route("/signup").post(UserController.apiPostUser)
  
export default router