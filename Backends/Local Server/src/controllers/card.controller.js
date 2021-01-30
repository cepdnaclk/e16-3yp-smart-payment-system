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
      id: req.body.card_id
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

exports.refundCard = async (req, res, next) => {
  try {
    const details = {
      card_id: req.body.card_id,
      refund_amount: req.body.refund_amount
    }

  	// card should be added to the database
    await card.cardRefundng(details, (err) => {
      // user successfully registered
      if (!err) {
        return res.status(httpStatus.CREATED).json({msg : `card ${details.card_id} is succesfully refunded`})
      } else {
        // Email already in the database
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
      }
    })    
  } catch (err) {
  	return next(err)
  }
}

exports.returnCard = async (req,res,next)=>{
  try{
    const details = {
      card_id: req.body.card_id
    }
    await card.cardReturning(details,(err)=>{
      if(!err){
        return res.status(httpStatus.OK).json({message : `card ${details.card_id} is succesfully returned`});
      }else if(err === "ZERO_ROWS_AFFECTED POSSIBLY BECAUSE WRONG CARD_ID"){
        return res.status(httpStatus.BAD_REQUEST).json({Error: err})
      }else{
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
      }
    })
  }catch(err){

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

    await card.cardState(details, async (err)=>{
      if(!err){
       
        await card.cardIssueing(details, (err)=>{
          if (!err) {
          
            return res.status(httpStatus.CREATED).json({msg : `card ${details.card_id} is ready to issued to the customer`})
          } else {
         
              return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
          }
        })
      }else{
        if(err.message === "Card is already issued"){
          return res.status(httpStatus.CREATED).json({msg : `card ${details.card_id} is allready issued`})
        }else{
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
        }
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
   // await card.cardScanning(details);
    await card.cardScanning(details, async (err,result)=>{
      if (!err) {
        const balance = result;
        await card.cardScanning2(details, async (err,result)=>{
          if (!err) {
            // return res.status(httpStatus.OK).json({msg :"customer can play"})
            const price = result
            console.log(price);
            console.log(balance);
            if(balance[0]['Amount']>=price[0]['Price']){
              const newPrice = balance[0]['Amount']-price[0]['Price']
              const newDetails = {
                card_id: details.card_id,
                newAmount :newPrice
              } 
              await card.creatingCurrentBalanace(newDetails, async (err)=>{
                 if(!err){
                  return res.status(httpStatus.OK).json({msg :"Hi " +balance[0]['CustomerName'] + " You can play the game"})
                 }else{
                  console.log(err.message)
                  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg :"Hi " +balance[0]['CustomerName'] + " Something went wrong please try again"})
                 }
              })
              
            }else{
              console.log(price[0]['Price'])
              return res.status(httpStatus.OK).json({msg :"Hi " +balance[0]['CustomerName'] + " Sorry, Your balance is not enough to play the game"})
            }

          }
        })
      } else {
        // card is already issued
        if(err == "ER_DUP_ENTRY")
          return res.status(httpStatus.CONFLICT).json({Error: `card ${details.card_id} is already issued. Has to return it first`})
        // Internal server error
        else
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
      }
    })

   

    //console.log(balance);
    //console.log(price)
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