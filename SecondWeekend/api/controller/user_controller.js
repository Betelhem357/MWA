const mongoose = require("mongoose")

const User = mongoose.model("User");
const bycript = require("bcrypt");

module.exports.register = function  (req, res) {
    console.log("Registr User");
    
    bycript.genSalt(10,function(err,salt){
        bycript.hash(req.body.password, salt,function (error, hashedPassword) {
            const newUser = {
                username: req.body.username,
                password: hashedPassword,
                name:req.body.name
            }
            User.create(newUser, function (error, createdUser) {
                const response = {
                    status: 201,
                    message: createdUser
                }
                if (error) {
                    response.status = 500;
                    response.message = error;
                }
                res.status(response.status).json(response.message);
            });
        })
    })
}

module.exports.login = function(req,res){
     const credential = {
         username: req.body.username
        // password: req.body.password
     };
     User.findOne(credential,function(error,foundUser){
        const response = {
            status: 201,
            message: foundUser
        }
         if(error){
            response.status = 500;
            response.message = error;
         }
         else if(foundUser){
             console.log("found user: ",foundUser)
             bycript.compare(req.body.password,foundUser.password,function(err,same){
                 if(err){
                     response.status = 500;
                     response.message = err;
                 }
                 if(same){
                     //res.status(200).json(foundUser);
                     response.status = 200;
                     response.message = foundUser;
                 }else{
                     //res.status(401).json({message:"unAuthorize"})
                     response.status = 401;
                     response.message = {message:"unAuthorize"};
                 }
             });
         }else{
            response.status = 401;
            response.message = {message : "UnAuthorized"};
         }
         res.status(response.status).json(response.message);
     })
}

module.exports.authenticate = function(req,res,next){
      const headerExists = req.headers.authorization;
      if(headerExists){
          const token = req.headers.authorization.split(" ")[1];
          jwt.verify(token,process.env.PASS_PHRASE,function(err,decoded){
              if(err){
                  console.log("jwt verify error",err);
                  res.status(401).json({message:"Unauthorized"})
              }else{
                  next();
              }
          })
      }else{
          res.status(403).json({message:"Token missing"})
      }
}