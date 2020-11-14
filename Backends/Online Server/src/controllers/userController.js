//importing files
const config = require('../config')
const User = require('../models/User')
//importing moduels
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const {ValidationError} = require('express-validation');
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
        await newUser.save();   
        return res.status(200).json({
            "message": "Created new user succesfully",
            success :true
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({   
            "message" : "Unable to create the user",
            success : false
        })

    }

   

}

exports.userLogin = async (req,res,next)=>{
    
}