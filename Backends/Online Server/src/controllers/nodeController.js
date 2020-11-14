//importing files
const config = require('../config')
const Node = require('../models/Node')
//importing moduels
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId;
const {ValidationError} = require('express-validation');
//const httpStatus = require('http-status')
//const jwt = require('jsonwebtoken')


//In this method even when the json key is mispelled the center_id a card will be added with wrong informaion
exports.addNodes = async (req,res,next)=>{
    
    try{
        nodeArray = []
        for (node of req.body){
            center_Objectid = new ObjectId(node.center_id);
            const newNode = new Node({
                status:node.status,
                center_id:center_Objectid
            })
            nodeArray.push(newNode);
        }
        console.log(nodeArray)
        await Node.insertMany(nodeArray);
        return res.status(200).json({
            "message": "Added Nodes succesfully",
            success :true
        });
    }catch(err){
        console.log(err)
        return res.status(400).json({   
            "message" : "Unable to Add Nodes",
            success : false
        })
    }
   

}