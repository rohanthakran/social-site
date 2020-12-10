const User = require("../models/user");
const Profile = require("../models/profile");
const { body, validationResult } = require('express-validator');
const user = require("../models/user");
const { text } = require("body-parser");
const profile = require("../models/profile");

exports.getProfileById = (req,res,next,id) =>{
        Profile.findById(id).exec((err,profile) =>{
            if(err) {
                return res.status(400).json({
                    error : "Profile not Found"
                })
            }
            req.prof = profile;
            console.log(req.prof);
            next();
        })
        
}
exports.postProfile= (req,res) =>{
    
    const profile = new Profile(req.body);
    console.log("profile")
    profile.save((err,profile) =>{
        if(err) {
            console.log(err);
            return res.status(400).json({
                message : "Not able to save the profile"
               
            })
        }
        res.json(profile);
    } )
}

exports.experience = (req,res) => {
   
        // const profile = new Profile(req.body);
        // const myexp = profile.experience;
        // myexp.save((err, exp)=>{
        //     if(err) {
        //         return res.status(400).json({
        //             message: "Not able to save expeience"
        //         })
        //     }
        //     res.json(exp);
        // })
        const {
                  title,
                  company,
                  location,
                  from,
                  to,
                  current,
                  description
              } = req.body;
              console.log(req.body);
            
              const newExp = {
                  title: title,
                  company: company,
                  location: location,
                  from: from,
                  to: to,
                  current: current,
                  description: description
              }
              console.log(newExp);
             const id = req.prof
              console.log(id);
             
              try {
                //console.log(profile)
                 const profile = Profile.findById({id : req.prof})
                profile.experience.unshift(newExp);
                //it push from beginning not from end
               profile.save();
                 res.json(profile);
                } 
                catch (error) {
                console.log(error);      
    }
            }