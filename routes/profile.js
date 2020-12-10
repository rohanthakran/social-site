const express = require('express');
const router = express.Router();
const { getUserById } = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const { getProfileById,postProfile,experience}= require("../controllers/profile")

router.param("userId",getUserById);
router.param("profileId",getProfileById);

//router.post("",isSignedIn,isAuthenticated,postProfile);
router.post("/profile/:userId",isSignedIn,isAuthenticated, postProfile);
router.post("/profile/experience/:profileId/:userId",isSignedIn,isAuthenticated,experience)
module.exports = router
// const Profile = require('../models/profile');
// const User = require('../models/user');
// const {isSignIn} = require('../controllers/auth')
// const {body, validationResult} = require('express-validator');
// const { populate } = require('../models/user');
// const profile = require('../models/profile');
// const { commands } = require('npm');
// const { conforms } = require('lodash');
// const { response } = require('express');
// //@router GET api/profile/me
// //@desc Get current users profile
// //@access Public

// router.get('/me',isSignIn, (req,res) => {
// const id = req.decode;
// const profile1 = Profile.findOne({user: id})
// .populate('user',['name','avatar'])
// if(!profile1){
//     return res.status(400).json({
//         msg:"This is user have no profile"
//     })
// }
// res.json(profile);
// }

// )

// //@router Post api/profile
// //@desc Create or update the profile
// //@access  Private

// // router.post('/',[isSignIn,[body('status', 'Status is require').not().isEmpty(),
// // ]], async(req,res) =>{

     
// //     const errors = validationResult(req);
// //     if(!errors.isEmpty()){
// //         return res.status(400).json({errors: errors.array()})
// //     }
// //     const {
// //         company,
// //         website,
// //         location,
// //         bio,
// //         status,
// //         skills,
// //         githubusername,
// //         youtube,
// //         facebook,
// //         twitter,
// //         instagram,
// //         linkedin,
        
    
// //     } = req.body
// //      //console.log(req.body);
     
// //      const loginId = req.decode;
// //      console.log(loginId);
// //     //build Profile Object
// //     const profileFields ={};
// //     profileFields.user = loginId;
   
// //     if(company) profileFields.company = company
// //     if(website) profileFields.website = website
// //     if(location) profileFields.location = location
// //     if(bio) profileFields.bio = bio
// //     if(status) profileFields.status = status
// //     if(githubusername) profileFields.githubusername = githubusername
// //     if(skills){ profileFields.skills = skills.split(',').map(skill => skill.trim());
// //     }
// //     profileFields.social ={}
// //     if(youtube)profileFields.social.youtube = youtube;
// //     if(twitter)profileFields.social.twitter = twitter;

// //     if(facebook)profileFields.social.facebook = facebook;

// //     if(linkedin)profileFields.social.linkedin = linkedin;

// //     if(instagram)profileFields.social.instagram = instagram;


// try{
//     let profile = await Profile.findOne({user : loginId});
//     console.log(loginId)
//     if(profile)
//     {
//         profile = await Profile.findOneAndUpdate(
//             {user : loginId},
//             {$set : profileFields},
//             {new: true},
           
//         )
//         return res.json(profile);
//     }
//     profile = new Profile(profileFields);
//     await profile.save();
//     res.json(profile)
    
    
// }

// catch(err)
// {
//     console.log(err)
//     res.status(500).json("profile not save")
// }
//     console.log(skills)
//     console.log("hello")
       
   

// })


// //@route Get api/profile
// //@desc Get all Profiles
// //@acess Public

// router.get('/', async(req,res) =>{
//     try {
       
//         const profiles = await Profile.find().populate('user',['name','avatar'])
//         console.log(populate('user',['name','avatar','user']))
//         res.json(profiles)
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Server Error")
//     }
// })
// router.get('/user/:user_id', async(req,res) =>{

//     try {
//         const profile = await Profile.findOne({user : req.params.user_id})
//          if(!profile) {
//              return res.status(400).json({msg : "This profile not exits"})
//          }
       
//         // console.log(populate('user',['name','avatar','user']))
//         res.json(profile)
//     } catch (error) {
//         console.log(error.message);
//         if(err.kind == 'ObjectId'){
//             return res.status(400).json({msg : "Profile not found"})
//         }
//         res.status(500).send("Server Error")
//     }
// })

// //@route DELETE api/profile
// //@descd Delete profile, user & posts
// router.delete('/',isSignIn, async(req,res) =>{
//     try {
//         const loginId = req.decode;
//         console.log(loginId);
//         //@todo remove user post
       
//         // Remove Profile
//         await profile.findOneAndRemove({user :loginId })
//         //Remove user
//         await User.findOneAndRemove({_id: loginId})

//         res.json({msg : "user Deleted"})
    
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Server Error")
//     }
// })
// //@route Put api/profile/experience
// //@desc Add profile Experience
// //@access private

// // router.put('/experience',istoken, async(req,res) =>
// // {
// //   const errors = validationResult(req);
// //   if(!errors.isEmpty()){
// //       return res.status(400).json({errors: errors.array()})
// //   }
// //   const id = req.decode;
// //   //console.log(id);
// //   const {
// //       title,
// //       company,
// //       location,
// //       from,
// //       to,
// //       current,
// //       description
// //   } = req.body;
// //   console.log(req.body);

// //   const newExp = {
// //       title: title,
// //       company: company,
// //       location: location,
// //       from: from,
// //       to: to,
// //       current: current,
// //       description: description
// //   }
// //   try {
   
// //    const profile = Profile.findOne({user: id})
// //     //console.log(profile)
// //     profile.experience.unshift(newExp);
// //     //it push from beginning not from end
// //     await profile.save();
// //      res.json(profile);
// //     } catch (error) {
// //     console.log(error);      
// //   }
// // })
// router.put(
//     '/experience', 
//     [
//         isSignIn, 
//         [
//             body('title', 'Title is required')
//                 .not()
//                 .isEmpty(),
//             body('company', 'Company is required')
//                 .not()
//                 .isEmpty(),
//             body('from', 'From date is required')
//                 .not()
//                 .isEmpty()
//         ]
//     ],

// async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({errors: errors.array() });
//         }


//         const {
//             title,
//             company,
//             location,
//             from,
//             to,
//             current,
//             description
//         } = req.body;


//         const newExp = {
//             title,
//             company,
//             location,
//             from,
//             to,
//             current,
//             description
//         }

//         //const experience = [];

//         try{
//             const id = req.decode;
//             const profile = await Profile.findOne({ user: id });

//             profile.experience.unshift(newExp);
            
//             await profile.save();

//             res.json(profile);

//         } catch(err){
//             console.error(err.message);
//             res.status(500).send('server put exp error')
//         }
//     })
//     router.delete ('/experience/:exp_id',isSignIn, async(req,res)=>{
//         const id = req.decode;
//         try {
//             console.log(id[0]);

//             const profile = await Profile.findOne({ user: id });
//             console.log(profile);
            
//             //Get remove Index
//             console.log(profile.experience);

//             const removeindex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
//             //profile.experience.sploce();

//             profile.experience.splice(removeindex,1);
//             await profile.save();
//             res.json(profile)
//         } catch (error) {
//             console.log(error)
//         }
//     })

// //@route Put api/profile/education
// //@desc Add profile education
// //@access private
//     router.put(
//         '/education', 
//         [
//             isSignIn, 
//             [
//                 body('school', 'School is required')
//                     .not()
//                     .isEmpty(),
//                 body('degree', 'degree is required')
//                     .not()
//                     .isEmpty(),
//                 body('from', 'From date is required')
//                     .not()
//                     .isEmpty()
//             ]
//         ],
    
//     async (req, res) => {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({errors: errors.array() });
//             }
    
    
//             const {
//                 school,
//                 degree,
//                 fieldofstudy,
//                 from,
//                 to,
//                 current,
//                 description
//             } = req.body;
    
    
//             const newExp = {
//                 school,
//                 degree,
//                 fieldofstudy,
//                 from,
//                 to,
//                 current,
//                 description
//             }
    
//             //const experience = [];
    
//             try{
//                 const id = req.decode;
//                 const profile = await Profile.findOne({ user: id });
    
//                 profile.education.unshift(newExp);
                
//                 await profile.save();
    
//                 res.json(profile);
    
//             } catch(err){
//                 console.error(err.message);
//                 res.status(500).send('server put exp error')
//             }
//         })
//         router.delete ('/education/:edu_id',isSignIn, async(req,res)=>{
//             const id = req.decode;
//             try {
//                 console.log(id[0]);
    
//                 const profile = await Profile.findOne({ user: id });
//                 console.log(profile);
                
//                 //Get remove Index
//                 console.log(profile.education);
    
//                 const removeindex = profile.education.map(item => item.id).indexOf(req.params.exp_id);
//                 //profile.experience.sploce();
    
//                 profile.education.splice(removeindex,1);
//                 await profile.save();
//                 res.json(profile)
//             console.log(profile)
//             } catch (error) {
//                 console.log(error)
//             }
//         })
// //@route GET api/profile/github/:username
// //@desc Get user Repos from Gitub
// //@access Public

// router.get("/github/:username", async(req,res) =>{
//     try {
//         const options = {
//             uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientid')}&client_secret=${config.get('githubclientSecret')}`,
//             method: 'GET',
//             headers: {'user-agent':'node.js'}
//         };
//         request(options,(error,response, body) =>{
//             if(error) {
//                 console.error(error);
//             }
//             if(response.statusCode !==200){
//                 res.status(404).json({msg: 'No Github Profile found'})
//             }

//             res.json(JSON.parse(body));
//         })
//     } catch (error) {
//         console.error(error.message);
        
//     }
// })
    
    
// module.exports = router



