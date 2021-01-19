//importing files
const config = require('../config')
const Card = require('../models/Card')
//importing moduels
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId;
const {ValidationError} = require('express-validation');
const { isValidObjectId } = require('mongoose');
//const httpStatus = require('http-status')
//const jwt = require('jsonwebtoken')


//In this method even when the json key is mispelled the center_id a card will be added with wrong informaion
exports.addCards = async (req,res,next)=>{
    
    try{
        cardArray = []
        for (card of req.body){
            center_Objectid = new ObjectId(card.center_id);
            const newCard = new Card({
                status:card.status,
                center_id:center_Objectid
            })
            cardArray.push(newCard);
        }
    
        await Card.insertMany(cardArray);
        return res.status(200).json({
            "message": "Added cards succesfully",
            success :true
        });
    }catch(err){
        //console.log(err)
        return res.status(400).json({   
            "message" : "Unable to Add the Cards." + err.message,
            success : false
        })
    }
   

}