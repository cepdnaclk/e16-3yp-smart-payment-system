//importing files
const config = require('../config')
const NodeUsage = require('../models/node_usage')
//importing moduels
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId;
const {ValidationError} = require('express-validation');
//const httpStatus = require('http-status')
//const jwt = require('jsonwebtoken')


//In this method even when the json key is mispelled the center_id a card will be added with wrong informaion
exports.addNodeUsage = async (req,res,next)=>{
    
    try{
        logArray = []
        for (log of req.body){
            center_Objectid = new ObjectId(log.center_id);
            node_Objectid = new ObjectId(log.node_id);
            const newNodeUsage = new NodeUsage({
                node_id:node_Objectid,
                center_id:center_Objectid
            })
            logArray.push(newNodeUsage);
        }
        console.log(logArray)
        await NodeUsage.insertMany(logArray);
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