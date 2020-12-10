const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { getUserById, getUser, updateUser } = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const { getPostByid } = require('../controllers/post');

router.param("userId", getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticated, getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated, updateUser);




module.exports = router