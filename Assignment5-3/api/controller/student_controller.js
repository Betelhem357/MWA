const mongoose = require("mongoose");
const Student = mongoose.model("student");
const STATUSOK = process.env.STATUSOK;
const STATUSCREATED = process.env.STATUSCREATED;
const STATUSNOCONTENT = process.env.STATUSNOCONTENT;
const INVALIDREQUEST = process.env.INVALIDREQUEST;
const NOTFOUND = process.env.NOTFOUND;
const INTERNALSERVERERROR = process.env.INTERNALSERVERERROR;

module.exports.getAllStudents = function(req,res){
    let offset = 0;
    let count = 5;
    let maxValue = 7;
    const response ={
        status:200,
        message:""
    };
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if(isNaN(offset)||isNaN(count)){
        console.log("Offset or count is not number")
        response.status = 400;
        response.message = {message:"Query string offset or count value is not valid"};
        res.status(response.status).json(response.message);
        return;
    }

    if(count>maxValue){
        count = 5;
    }

    Student.find().skip(offset).limit(count).exec(function(error,students){
        if(error){
            response.status = 500;
            response.message = {message:error};
        }else{
            response.status = 200;
            response.message = students
        }
          res.status(response.status).json(response.message);
    });
}

module.exports.getStudentById = function(req,res){
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function(error,studentData){
        const response ={
            status:STATUSOK,
            message:studentData
        };
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!studentData){
            response.status = NOTFOUND;
            response.message =  "Student with Id "+studentId+" not found!";
        }
         res.status( response.status).json(response.message);
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

module.exports.createOneStudent = (req,res)=>{
    const newStudent = {};
    if(req.body.name){newStudent.studentId = req.body.studentId}
    if(req.body.grade){newStudent.courseId = req.body.grade}

    Student.create(newStudent,function(error,student){
        const response = {
           status:201,
           message:student
        };

        if(error){
            response.status = 500;
            response.message = error;
        }

        res.status(response.status).json(response.message);
    });
}

module.exports.updatePartialOneStudent = (req,res)=>{

    const studentId = req.params.studentId;
    
    Student.findById(studentId).exec(function(error,studentData){
        console.log(studentData.name)
        const response ={
            status:STATUSNOCONTENT,
            message:studentData
        };
        if(error){
            response.status = INTERNALSERVERERROR;
            response.message = error;
        }else if(!studentData){
            response.status = NOTFOUND;
            response.message =  "Game with Id "+studentId+" not found!";
            res.status( response.status).json(response.message);
            return;
        }

        if(response.status!==STATUSNOCONTENT){
            res.status(response.status).json(response.message);
            return;
        }else{
            if(req.body.name){studentData.name =  req.body.name};
             if(req.body.grade){studentData.grade = parseInt(req.body.grade)};

             studentData.save(function(error,updated_student){
                  if(error){
                      response.status = INTERNALSERVERERROR;
                      response.message = error;
                  }else{
                      response.message = updated_student;
                  }
             });
        }

         res.status( response.status).json(response.message);
    });
}


module.exports.updateFUllOneStudent = (req,res)=>{

    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function(error,studentData){
        const response ={
            status:204,
            message:studentData
        };
        if(error){
            response.status = 500;
            response.message = error;
        }else if(!studentData){
            response.status = 404;
            response.message =  "Game with Id "+studentId+" not found!";
        }

        if(response.status!==204){
            res.status(response.status).json(response.message);
            return;
        }else{
            studentData.name =  req.body.name;
            studentData.grade = parseInt(req.body.grade);

            studentData.save(function(error,updated_student){
                  if(error){
                      response.status = 500;
                      response.message = error;
                  }else{
                      response.message = updated_student;
                  }
             });
        }

         res.status( response.status).json(response.message);
    });
}

module.exports.deleteStudent = (req,res)=>{

    const studentId = req.params.studentId;
    Student.findByIdAndDelete(studentId).exec(function(error,deletedStudent){s
        const response ={
            status:204,
            message:deletedStudent
        };
        if(error){
            response.status = 500;
            response.message = error;
        }else if(!deletedStudent){
            response.status = 404;
            response.message = {"message": "Game with Id "+studentId+" not found!"};
        }
         res.status( response.status).json(response.message);
    });
}
