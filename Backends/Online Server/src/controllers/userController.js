//importing files
const config = require('../config')
const User = require('../models/User')
//importing moduels
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const {ValidationError} = require('express-validation');
const e = require('express');
const { get } = require('mongoose');
//const httpStatus = require('http-status')
//const jwt = require('jsonwebtoken')


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
        // const dublicate = User.find({email:req.body.email})
        // if(dublicate!=null){
        //    // console.log("athule")
        //     throw new Error("Email is already taken");
        // }
        
        await newUser.save();   
        return res.status(200).json({
            "message": "Created new user succesfully",
            success :true
        });
    }catch(err){
        return res.status(400).json({   
            "message" : err.message,
            success : false
        })
    }
}


exports.userLogin = async (req,res,next)=>{
    
}