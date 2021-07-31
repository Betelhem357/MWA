const mongoose = require("mongoose");
const Job = mongoose.model("job");
const bcrypt= require("bcrypt");

module.exports.getAllJobs = function (req, res) {
    console.log("get all Job");
    let offset = 0;
    let count = 5;
    let maxValue = 7;
    const response = {
        status: 200,
        message: ""
    };
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if (isNaN(offset) || isNaN(count)) {
        console.log("Offset or count is not number")
        response.status = 404;
        response.message = { message: "Query string offset or count value is not valid" };
        res.status(response.status).json(response.message);
        return;
    }

    if (count > maxValue) {
        response.status(400).json({ message: "count can't exceed maximum value: " + maxValue });
    }

    const date = new Date();
    date.setMonth(date.getMonth() - 6);

    const query = {
        postDate: {
            $gte: date
        }
    };

    Job.find(query).skip(offset).limit(count).exec(function (error, jobListData) {
        if (error) {
            response.status = 500;
            response.message = { message: error }
        } else {
            response.status = 200;
            response.message = jobListData
        }
        res.status(response.status).json(response.message);
    });

}

function getSearchByLocation(req, res) {
    const response = {
        status: 200,
        message: ""
    };

    const lat = req.query.lat;
    const lng = req.query.lng;
    const dis = req.query.dis;
    const query = {
        location: {
            coordinates: {
                $near:
                {
                    $geometry: { type: "Point", coordinates: [lat, lng] },
                    $minDistance: 0,
                    $maxDistance: dis
                }
            }
        }
    }
    Job.find(query).exec(function (error, jobListData) {
        if (error) {
            response.status = 500;
            response.message = { message: error }
        } else {
            response.status = 200;
            response.message = jobListData
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.getAllJobsByLocation = function (req, res) {
    console.log("get all Job");
    let offset = 0;
    let count = 5;
    let maxValue = 7;
    const response = {
        status: 200,
        message: ""
    };

    if (req.query && req.query.lat && req.query.lng) {
        getSearchByLocation(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    if (isNaN(offset) || isNaN(count)) {
        console.log("Offset or count is not number")
        response.status = 404;
        response.message = { message: "Query string offset or count value is not valid" };
        res.status(response.status).json(response.message);
        return;
    }

    if (count > maxValue) {
        response.status(400).json({ message: "count can't exceed maximum value: " + maxValue });
    }

    const date = new Date();
    date.setMonth(date.getMonth() - 6);

    const query = {
        postDate: {
            $gte: date
        }
    };

    Job.find(query).skip(offset).limit(count).exec(function (error, jobListData) {
        if (error) {
            response.status = 500;
            response.message = { message: error }
        } else {
            response.status = 200;
            response.message = jobListData
        }
        res.status(response.status).json(response.message);
    });

}


module.exports.getJobById = function (req, res) {
    console.log("get Job by id");
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function (error, jobData) {
        const response = {
            status: 200,
            message: jobData
        };
        if (error) {
            response.status = 500;
            response.message = { message: error };
        } else if (!jobData) {
            response.status = 404;
            response.message = "Job with that id not found";
        }
        res.status(response.status).json(response.message);
    })
}
module.exports.createJob = function (req, res) {
    console.log("creating Job");
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.salary, salt, (err, hasedSalary) => {
            const newJob = {};
            newJob.title = req.body.title;
            newJob.salary = hasedSalary;
            newJob.description = req.body.description;
            newJob.exprience = req.body.exprience;
            newJob.skills = req.body.skills;
            newJob.postDate = req.body.postDate ? Date.parse(req.body.postDate) : req.body.postDate;
            newJob.location = req.body.location;
            Job.create(newJob, function (error, createdJob) {
                const response = {
                    status: 201,
                    message: createdJob
                };
                if (error) {
                    console.log("error", error);
                    response.status = 500;
                    response.message = { message: error }
                }

                res.status(response.status).json(response.message);

            });
        })
    })
}
module.exports.partialUpdateJob = function (req, res) {
    console.log("Partial update Job");
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function (error, foundJob) {
        const response = {
            status: 204,
            message: foundJob
        };
        if (error) {
            response.status = 500;
            response.message = { message: error };
        } else if (!foundJob) {
            response.status = 404;
            response.message = "Job with that id not found";
        }

        if (response.status !== 204) {
            console.log("Response to status", 204)
            res.status(response.status).json(response.message);
            return;
        }

        if (req.body.title) { foundJob.title = req.body.title };
        if (req.body.salary) { foundJob.salary = parseFloat(req.body.salary) };
        if (req.body.description) { foundJob.description = req.body.description };
        if (req.body.exprience) { foundJob.exprience = req.body.exprience };
        if (req.body.skills) { foundJob.skills = req.body.skills };
        if (req.body.postDate) { foundJob.postDate = req.body.postDate ? Date.parse(req.body.postDate) : req.body.postDate };

        foundJob.save(function (error, updatedJob) {
            if (error) {
                response.status = 500;
                response.message = { message: error };
            } else {
                response.status = 204;
                response.message = updatedJob;
            }
            console.log("Response to status", 204)
            res.status(response.status).json(response.message);
        });

    })

}
module.exports.fullUpdateJob = function (req, res) {
    console.log("Full update Job");
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function (error, foundJob) {
        const response = {
            status: 204,
            message: foundJob
        };
        if (error) {
            response.status = 500;
            response.message = { message: error };
        } else if (!foundJob) {
            response.status = 404;
            response.message = "Job with that id not found";
        }

        if (response.status !== 204) {
            console.log("Response to status", 204)
            res.status(response.status).json(response.message);
            return;
        }

        foundJob.title = req.body.title;
        foundJob.salary = parseFloat(req.body.salary)
        foundJob.description = req.body.description;
        foundJob.exprience = req.body.exprience;
        foundJob.skills = req.body.skills;
        foundJob.postDate = req.body.postDate ? Date.parse(req.body.postDate) : req.body.postDate;

        foundJob.save(function (error, updatedJob) {
            if (error) {
                response.status = 500;
                response.message = { message: error };
            } else {
                response.status = 204;
                response.message = updatedJob;
            }
            console.log("Response to status", 204)
            res.status(response.status).json(response.message);
        });

    })
}
module.exports.deleteJob = function (req, res) {
    console.log("Delete Job");
    const jobId = req.params.jobId;
    Job.findByIdAndRemove(jobId).exec(function (error, removedJob) {
        const response = {
            status: 204,
            message: removedJob
        }
        if (error) {
            response.status = 500;
            response.message = { message: error }
        }
        res.status(response.status).json({ message: response.message });
    });
}


