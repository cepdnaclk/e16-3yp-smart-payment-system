'use strict'

const config = require('../config')
// const uuidv1 = require('uuidv1')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const user = require('../models/user.model')


exports.register = async (req, res, next) => {
  try {
    // const activationKey = uuidv1()
    const pwd = bcrypt.hashSync(req.body.password)

    // Proceesing and making data object 
    const details = {
      nic: req.body.nic,
      fname : req.body.fname,
      lname : req.body.lname,
      email : req.body.email,
      password : pwd,
    }

  	// user should be added to the database
    await user.registerOwner(details, (err) => {
      // user successfully registered
      if (!err) {
        return res.status(httpStatus.CREATED).json({msg : `User ${details.fname} ${details.lname} successfully registered!`})
      } else {
        // Email already in the database
        if(err == "ER_DUP_ENTRY")
          return res.status(httpStatus.CONFLICT).json({Error: `Email ${details.email} is already registered`})
        // Internal server error
        else
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
      }
    })    
  } catch (err) {
  	return next(err)
  }
}


exports.login = async (req, res, next) => {
  try {
    // Find the user if exist
    await user.findOwner(req.body.email, (err, result) => {
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
            const user = {
              email : result[0].Email
            }
            const token = jwt.sign(user, config.secret)
            return res.status(httpStatus.OK).json({ token: token})
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
    if (req.authuser) {
      // Find the user if exist
      await user.findOwner(req.authuser.email, (err, result) => {
        // There could be an internal server error
        if(err){
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
        } else {
          // Requested user is not in the database
          if(result.length == 0) {
            return res.status(httpStatus.UNAUTHORIZED).json({Error : `${req.authuser.email} is not a user`})
          } else {
            const usertmp = {
              nic : result[0].NIC,
              fname: result[0].FName,
              lname: result[0].LName,
              role: result[0].Role
            }
            return res.status(httpStatus.CREATED).json({user : usertmp})
          }
        }
      })
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: "user was not taken"})
    }
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