const mongoose = require("mongoose")

const User = mongoose.model("User");
const bycript = require("bcrypt");

const sendCreatingStatus = function(user){
    res.status(201).json(user);
}

const failure = function(err){
    res.status( 500).json(err);
}

function registerUser(hashedPassword, req) {

    const newUser = {};

    newUser.username = req.body.username;
    newUser.password = hashedPassword;
    newUser.name = req.body.name;

    return User.create(newUser).then((user)=>sendCreatingStatus(user));
}

const bycriptPassword = function(salt,req){
    return bcrypt.hash(req.body.password, salt);
}

module.exports.register = function  (req, res) {
    console.log("Registr User");
    bycript.genSalt(10).then((salt)=>bycriptPassword(salt,req))
    .then((hashedPassword)=>registerUser(hashedPassword,req))
    .then((user) => res.status(201).json(user))
    .catch((err)=>failure(err));
}


module.exports.login = function(req,res){
     const credential = {
         username: req.body.username
        // password: req.body.password
     };
     User.findOne(credential).then((user) => checkUserFound(user, res))
     .then((response) => checkPassword(response, req))
     .then((same) => loginUser(same, res))
     .catch((err) => failure(err))
}

const loginUser = function(same,res){
    if(same){
        res.status(201).json(foundUser);
    }else{
        res.status(400).json({message : "UnAuthorized"});
    }
}

const checkUserFound = function(foundUser, res){
    if (!foundUser) {
        res.status(401).json({message : "UnAuthorized"});
        return;
    }
    console.log("found user: ",foundUser)

    return foundUser;
}

const checkPassword = function(user, res){
    return bycript.compare(req.body.password,foundUser.password);
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