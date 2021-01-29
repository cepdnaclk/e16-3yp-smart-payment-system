'use strict'

const config = require('../config')
const uuidv1 = require('uuidv1')
//const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
//const jwt = require('jsonwebtoken')
const card = require('../models/rfidCard.model')


exports.addCard = async (req, res, next) => {
  try {
    const details = {
      id: req.body.card_id,
    }

  	// card should be added to the database
    await card.cardAdding(details, (err) => {
      // user successfully registered
      if (!err) {
        return res.status(httpStatus.CREATED).json({msg : `card ${details.id} is added to the system`})
      } else {
        // Email already in the database
        if(err == "ER_DUP_ENTRY")
          return res.status(httpStatus.CONFLICT).json({Error: `card ${details.id} is already registered`})
        // Internal server error
        else
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
      }
    })    
  } catch (err) {
  	return next(err)
  }
}

exports.issueCard = async(req,res,next)=>{
  try{
    const details = {
      card_id: req.body.card_id,
      amount : req.body.amount,
      time: req.body.time,
      date: req.body.date,
      is_issued :req.body.is_issued,
      employee_id :req.body.employee_id,
      customer_name: req.body.customer_name
      
    }
    await card.cardIssueing(details, (err)=>{
      if (!err) {
        return res.status(httpStatus.CREATED).json({msg : `card ${details.card_id} is ready to issued to the customer`})
      } else {
        // card is already issued
        if(err == "ER_DUP_ENTRY")
          return res.status(httpStatus.CONFLICT).json({Error: `card ${details.card_id} is already issued. Has to return it first`})
        // Internal server error
        else
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
      }
    })
  }catch(err){
    return next(err)
  }
}

exports.scanCard = async(req,res,next) =>{
   try{
    const details = {
      card_id: req.body.card_id,
      node_id : req.body.node_id,
      tag : req.body.tag
    }
    await card.cardScanning(details);
   }catch(err){
     console.log(err)
     next(err)
   }
}

exports.login = async (req, res, next) => {
  try {
    // Find the user if exist
    await user.findUser(req.body.email, (err, result) => {
      // There could be an internal server error
      if(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
      } else {
        // Requested user is not in the database
        if(result.length == 0) {
          return res.status(httpStatus.UNAUTHORIZED).json({Error : `${req.body.email} is not a user`})
        } else {
          // password missmatch
          if(!bcrypt.compareSync(req.body.password, result[0].Password)) {
            return res.status(httpStatus.UNAUTHORIZED).json({Error : `email/password missmatch`})
            // user/password are correct
          } else {
            // user account is not activated
            if (!result[0].Active)
              return res.status(httpStatus.UNAUTHORIZED).json({Error : `User account ${req.body.email} is not activated!`})
            // permission given to log in
            else {
              const user = {
                id : result[0].Security_ID,
                role : result[0].Role,
                name: `${result[0].FName} ${result[0].LName}`,
                designation : result[0].Designation
              }
              const token = jwt.sign(user, config.secret)
              return res.status(httpStatus.OK).json({ token: token})
            }
          }
        }
      }
    })
  } catch (err) {
    return next(err)
  }
}


exports.getuser = async (req, res, next) => {
  try {
    if (req.authuser)
      return res.status(httpStatus.CREATED).json({user : req.authuser})
    else
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: "user was not taken"})
  } catch (err) {
    return next(err)
  }
}


exports.logout = async (req, res, next) => {
  try {
    return res.status(httpStatus.OK).json({ message: 'User logged out.' })
  } catch (err) {
    return next(err)
  }
}