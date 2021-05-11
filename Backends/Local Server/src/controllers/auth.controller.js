'use strict'

const config = require('../config')
const uuidv1 = require('uuidv1')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const user = require('../models/user.model')


exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv1()
    const pwd = bcrypt.hashSync(req.body.password)

    // Proceesing and making data object 
    const details = {
      NIC: req.body.NIC,
      email : req.body.email,
      password : pwd,
      fname : req.body.fname,
      lname : req.body.lname,
      role : req.body.role,
      activation_key : activationKey
    }

    // user should be added to the database
    await user.findUser(details.email,async (err,result)=>{
        if(err){
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
        }else if(result.length===0){
          await user.registering(details, (err) => {
            // user successfully registered
            if (!err) {
              return res.status(httpStatus.CREATED).json({msg : `Please check ${details.email} to verify the account.`})
            } else {
              // Email already in the database
              if(err == "ER_DUP_ENTRY")
                return res.status(httpStatus.CONFLICT).json({Error: `Email or NIC is already registered`})
              // Internal server error
              else
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
            }
          })    
        }else{
          return res.status(httpStatus.CONFLICT).json({Error: `Email or NIC is already registered`})
        }
    })
    
  } catch (err) {
  	return next(err)
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
            // user account is not activated *** have some issues ***
            // if (!result[0].Active)
            //   return res.status(httpStatus.UNAUTHORIZED).json({Error : `User account ${req.body.email} is not activated!`})
            // permission given to log in
            //else {
              const user = {
                id : result[0].Security_ID,
                role : result[0].Role,
                name: `${result[0].FName} ${result[0].LName}`,
              }
              const token = jwt.sign(user, config.secret)
              return res.status(httpStatus.OK).json({ token: token})
            }
          }
        }
      //}
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