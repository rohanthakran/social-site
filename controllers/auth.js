const User  =require("../models/user");
require("dotenv").config();
const gravatar = require("gravatar");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const { config } = require("npm");
// const config = require('config')

exports.signup = async(req,res) =>{ 

  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array()})

  }

  //See if user Exists
  const {name,email,password} = req.body;

  try{
      let user = await User.findOne({email})
      if(user){
        return  res.status(400).json({errors:[{msg: " User already exit"}]})
      }
      const avatar = gravatar.url(email,{
          s: "200",
          r: 'pg',
          d:"mm"
      })

      user = new User({
      name,
  email,
avatar,password})
await user.save();  
}
  catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
  
  res.send('User route');

}


exports.signin = (req,res) =>{
  const {email,password} = req.body;
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()[0].msg  })
  }
  User.findOne({email},(err,user) =>{
    if(err || !user){
      return res.status(400).json({
        error: "User eamil does not exists"
      })
    }
    if(!user.authenticate(password)){
     return res.status(400).json({
        error: "User email and password does not match"
      })
    }

    const token = jwt.sign({_id: user._id},process.env.SECRET);

    //put token in cookie

    res.cookie("token", token,{expire: new Date()+8888});


    //send response to front end

    const{_id,name,email,role} = user;
    return res.json({
      token,user:{_id,name,email,role}
    })
     
  })

}
exports.signout =(req,res)=>{
  res.clearCookie("token");
  res.json({
    message : "User singout sucessfully"
  })
}

//Protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty:"auth"
})

exports.isAuthenticated = (req,res,next) =>{
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;

  if(!checker){
    return res.status(403).json({
      error : "Acess Denied"
    })
  }
  next();
}
exports.isAdmin = (req,res,next) =>{
  if(req.profile.role ===0)
  return res.status(403).json({
    error: "You are not a Admin"
  })
  next();
}

exports.isSignIn = expressJwt({
  secret:process.env.SECRET,
  userProperty:"auth"	 //in this property i am getting "id"instead of "_id"
});

 
