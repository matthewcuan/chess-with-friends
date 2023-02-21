import express from "express";
import GamesController from "./games.controller";

const router = express.Router()

// all possible routes for movie.html
router.route("/movie/:id").get(ReviewCtrl.apiGetReviews)
router.route("/new").post(ReviewCtrl.apiPostReview)
router.route("/:id")
  .get(ReviewCtrl.apiGetReview)
  .put(ReviewCtrl.apiUpdateReview)
  .delete(ReviewCtrl.apiDeleteReview)
  
export default router