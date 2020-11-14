//importing files
const config = require('../config')
const CardIssue = require('../models/card_issue')
//importing moduels
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId;
const {ValidationError} = require('express-validation');
//const httpStatus = require('http-status')
//const jwt = require('jsonwebtoken')


//In this method even when the json key is mispelled the center_id a card will be added with wrong informaion
exports.addCardIssueLog = async (req,res,next)=>{
    
    try{
        logArray = []
        for (log of req.body){
            center_Objectid = new ObjectId(log.center_id);
            card_Objectid = new ObjectId(log.card_id);
            employee_Objectid = new ObjectId(log.employee_id);
            const newcardIssueLog = new CardIssue({
                card_id:card_Objectid,
                center_id:center_Objectid,
                employee_id:employee_Objectid
            })
            logArray.push(newcardIssueLog);
        }
        console.log(logArray)
        await CardIssue.insertMany(logArray);
        return res.status(200).json({
            "message": "Added log succesfully",
            success :true
        });
    }catch(err){
        console.log(err)
        return res.status(400).json({   
            "message" : "Unable to Add log",
            success : false
        })
    }
   

}