var express = require("express");
var router = express.Router();
const {signout,signup,signin,isSignedIn} = require("../controllers/auth");
const { body, validationResult } = require('express-validator');



router.post("/signup", [body('name', 'Name is require').not().isEmpty()
, body('email','Please include a valid email').isEmail(),
body('password','Please enter a password length with 6').isLength({min:6})], signup);

router.post("/signin", [body('email','Please include a valid email').isEmail(),
body('password','Please field is require').isLength({min:6})], signin);

router.get("/signout",signout);

router.get("/testroute",isSignedIn,(req,res)=>{

 console.log(" Authenticated route");
 res.send(req.auth)
})

module.exports = router;
