const express = require("express");
const router = express.Router();
const student_controller = require("../controller/student_controller.js");

router.route("/students").get(student_controller.getAllStudents);
router.route("/students/:studentId").get(student_controller.getStudentById);
router.route("/students/:studentId/courses").get(student_controller.getStudentCourses);
router.route("/students/:studentId/courses/:courseId").get(student_controller.getStudentCourseById);

module.exports = router;