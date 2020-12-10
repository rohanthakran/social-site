const User = require("../models/user");
const Post = require("../models/post");
const { body, validationResult } = require('express-validator');
const user = require("../models/user");
const { text } = require("body-parser");

exports.userpost =(req,res) =>{
    // const errors = validationResult(req);
    
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors : errors.array()});
    // }
   const post = new Post(req.body);
   post.save((err, post) =>{
       if(err){
           return res.status(400).json({
               error: " Not able to save post"
           })
       }
       res.json(post); 
   })
}

exports.getPostByid = (req,res,next,id)=>{
    Post.findById(id).exec((err, onepost) =>{
        if(err){
            return res.status(400).json({
                error: "Psot not found in Db"
            })
        }
        req.post = onepost;
        next();
    })
}
exports.getApost =(req,res) =>{
    return res.json(req.post);
}
         
exports.getAllPost =(req,res) =>{
   Post.find().exec((err,items) =>{
       if(err){
           return res.status(400).json({
               error: "No post found"
           })
       }
       res.json(items)
   })
}

exports.deletePost = (req,res) =>{
    const Post= req.post;
    Post.remove((err, del) =>{
        if(err){
            return res.status(400).json({
                error : "Not able to delete"
            })
        }
res.json({
    message : "Successfully Deleted"
})    
    })
}

exports.updatePost = (req,res) =>{
    const Post = req.post;
    Post.text = req.body.text;
    Post.save((err,post) =>{
        if(err){
            return res.status(400).json({error: " Not able to update Post"})
        }
        res.json(post);
    })
}