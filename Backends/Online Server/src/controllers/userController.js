//importing files
const config = require('../config')
const User = require('../models/User')
//importing moduels
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const e = require('express');
const { get } = require('mongoose');
const APIError = require('../utils/APIErrors')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')


//TODO
//when a request is send during mongodb is not connected error is not handled properly

exports.userRegister = async (req,res,next)=>{
    
    try{
         //hashes our password
        const hashedPassword = await bcrypt.hash(req.body.password,12)

        //create the activation key
        const activationKey = uuidv4()

        //create new user
        const newUser = new User({
            ...req.body,
            password:hashedPassword,
            activationKey:activationKey
        })
        //const dublicate = User.find({email:req.body.email})
        const dublicate = await User.findOne({email:req.body.email})
        if(dublicate){
             throw new APIError(`The email is already taken`, httpStatus.BAD_REQUEST)
         }
        
        const issaved  = await newUser.save();   
       // console.log("issaved :" +issaved)
        return res.status(200).json({
            "message": "Created new user succesfully",  
            success :true
        });
    }catch(err){
        next(err)
    }
}

/*
 
*/

exports.userLogin = async (req,res,next)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        if (!email) throw new APIError('Email must be provided for login')
        const user = await User.findOne({ email }).exec()
        if (!user) throw new APIError(`Invalid credentials`, httpStatus.UNAUTHORIZED)
        const passwordOK = bcrypt.compareSync(password, user.password)
        if (!passwordOK) throw new APIError(`Invalid credentials`, httpStatus.UNAUTHORIZED)
        //console.log("user log: "+user)
        //const token = user.generateToken();
        const user_details = {
            id : user._id,
            role : user.role,
            name: `${user.fname} ${user.lname}`
        }
        console.log(user_details)
        const token = jwt.sign(user_details, config.secret)
        //if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED)
        return res.status(httpStatus.OK).json({"token ":token})
        

    }catch(err){
        next(err)
    }
    
}



