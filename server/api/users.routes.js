import express from "express";
import UserController from "./users.controller.js";

const router = express.Router()

router.route("/login/:id").get(UserController.apiGetUser)
router.route("/signup").post(UserController.apiPostUser)
  
export default router