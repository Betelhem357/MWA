const express = require("express");
const router = express.Router();

const jobController = require("../api/controller/jobController");
const locationController = require("../api/controller/locationController");
const reviewController = require("../api/controller/reviewController");

router.route("/jobs")
      .get(jobController.getAllJobs)
      .post(jobController.createJob);
router.route("/jobs/:jobId")
      .get(jobController.getJobById)
      .put(jobController.fullUpdateJob)
      .patch(jobController.partialUpdateJob)
      .delete(jobController.deleteJob);
router.route("/jobs/:jobId/location")
      .get(locationController.getLocation)
      .post(locationController.createLocation)
      .put(locationController.fullUpdateLocation)
      .patch(locationController.partialUpdateLocation)
      .delete(locationController.deleteLocation);
router.route("/jobs/:jobId/reviews")
      .get(reviewController.getAllReview)
      .post(reviewController.addReview)
router.route("/jobs/:jobId/reviews/:reviewId")
      .get(reviewController.getReviewById)
      .put(reviewController.fullUpdateReview)
      .patch(reviewController.partialUpdateReview)
      .delete(reviewController.removeReview);


module.exports = router;


