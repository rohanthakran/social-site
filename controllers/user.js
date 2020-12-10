const User = require("../models/user");

//Now we are createinga method so that we can get user id

exports.getUserById = (req,res,next,id) =>{
    User.findById(id).exec((err,user) =>{
        if(err || !user)
        {
            return res.status(404).json({
                msg : " No user was found in DB"
            })
        }
        req.profile = user;
        next();
    })
};



exports.getUser = (req,res) =>{
    //TODO get back here for password

    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}
exports.updateUser = (req,res) =>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true,userFindAndModify: false},
        (err,user) =>{
            if(err || !user ){
                return res.status(400).json({
                    error : "not able to update or user is not there"
                })
            }
            user.salt = undefined,
            user.encry_password = undefined,
            res.json(user)

        }
    )
}