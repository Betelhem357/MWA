const express = require("express");
const router = express.Router();
const games_controller = require("../controller/games_controller");
const publisher_controller = require("../controller/publisher_controller");
const review_controller = require("../controller/review_controller");



router.route("/games")
    .get(games_controller.getAllGames)
    .post(games_controller.createOneGame);
router.route("/games/:gameId")
    .get(games_controller.getOneGame)
    .patch(games_controller.updatePartialOneGame)
    .put(games_controller.updatePartialOneGame)
    .delete(games_controller.deleteGame);
router.route("/games/:gameId/publisher")
    .get(publisher_controller.getPublisher)
    .post(publisher_controller.createOnePublisher)//put and post do the same thing
    .put(publisher_controller.updateFullPublisher)
    .patch(publisher_controller.updatePartialPublisher)
    .delete(publisher_controller.deletePublisher);
router.route("/games/:gameId/reviews")
    .get(review_controller.getAllReviews)
    .post(review_controller.createOneReview);
router.route("/games/:gameId/reviews/:reviewId")
    .get(review_controller.getReviewById)
    .patch(review_controller.updatePartialReview)
    .put(review_controller.updateFullReview)
    .delete(review_controller.deleteReview);

module.exports = router;