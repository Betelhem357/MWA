const mongoose = require("mongoose");
const Student = mongoose.model("student");


module.exports.getAllStudents = function(req,res){
    Student.find().exec(function(err,studentsData){
        res.status(200).json(studentsData);
    });
}

module.exports.getStudentById = function(req,res){
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function(err,studentData){
        res.status(200).json(studentData);
    });
}

module.exports.getStudentCourses = function(req,res){
    const studentId = req.params.studentId;
    Student.findById(studentId).select("courses").exec(function(err,studentsData){
        res.status(200).json(studentsData.courses);
    });
}

module.exports.getStudentCourseById = function(req,res){
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    Student.findById(studentId).select("courses").exec(function(err,studentData){
        const studentById = studentData.courses.id(courseId);
        res.status(200).json(studentById);
    });
}
