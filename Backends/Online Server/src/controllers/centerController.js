//importing files
const config = require('../config')
const Card = require('../models/Center')
//importing moduels
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId;
const {ValidationError} = require('express-validation');
const Center = require('../models/Center');
//const httpStatus = require('http-status')
//const jwt = require('jsonwebtoken')

exports.addCenter = async (req,res,next)=>{
    try{
        
        ArrayUsersId = [];
        for(id of req.body.user_id){
            user_Object_id = new ObjectId(id);
            ArrayUsersId.push(user_Object_id)
        }
        const newCenter = new Center({
            name:req.body.name,
            address:req.body.address,
            user_id:ArrayUsersId
        })
        await newCenter.save()
    
        return res.status(200).json({
            "message": "Created new Center succesfully",
            success :true
        });
    }catch(err){
       console.log(err)
       
        return res.status(400).json({   
            "message" : "Unable to Add the center",
            success : false
        })
    }
   

}