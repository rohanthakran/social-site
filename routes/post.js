const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const { getUserById, getUser, updateUser } = require("../controllers/user");
const { body, validationResult } = require('express-validator');
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const { userpost, getPostByid,getApost,updatePost,deletePost} = require('../controllers/post');



router.param("userId", getUserById)
router.param("postId", getPostByid)
router.post("/user/post/:userId",isSignedIn,isAuthenticated, userpost);
router.get("/user/post/:postId/:userId",isSignedIn,isAuthenticated,getApost)
router.delete("/user/post/:postId/:userId",isSignedIn,isAuthenticated,deletePost);
router.put("/user/post/:postId/:userId",isSignedIn,isAuthenticated,updatePost);
module.exports = router

    //             const id = req.decode;
    //             const profile = await Profile.findOne({ user: id });
    
    //             profile.experience.unshift(newExp);
                
    //             await profile.save();
    
    //             res.json(profile);
    
    //         } catch(err){
    //             console.error(err.message);
    //             res.status(500).send('server put exp error')
    //         }