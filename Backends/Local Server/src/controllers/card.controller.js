'use strict'

const config = require('../config')
const uuidv1 = require('uuidv1')
const httpStatus = require('http-status')
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
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err.message})
      }
    })    
  } catch (err) {
  	return next(err)
  }
}

//use to refund a a card
exports.rechargeCard = async (req, res, next) => {
  try {
    const details = {
      card_id: req.body.card_id,
      refund_amount: req.body.refund_amount
    }

  
    await card.cardRecharging(details, (err) => {
      // sucesfully refunded the card
      if (!err) {
        return res.status(httpStatus.CREATED).json({msg : `card ${details.card_id} is succesfully refunded`})
      } else {
        // refunding was unsuccesfull
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err.message})
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
    await card.cardScanning(details,async (err,result)=>{
      if (!err) {
        const balance = result;
        await card.cardReturning(details,(err)=>{
          if(!err){
            return res.status(httpStatus.OK).json({message : `card ${details.card_id} is succesfully returned remaining amount is ${balance[0]['Amount']}`});
          }else if(err === "ZERO_ROWS_AFFECTED POSSIBLY BECAUSE WRONG CARD_ID"){
            return res.status(httpStatus.BAD_REQUEST).json({Error: err.message})
          }else{
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err.message})
          }
        })
      }else{
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err.message})
      } 
    });
   
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
      if (!err){
       
        await card.cardIssueing(details, async (err)=>{
          if (!err) {
            await card.addtoIssuelog(details, async(err)=>{
              if(!err){
                return res.status(httpStatus.CREATED).json({msg : `card ${details.card_id} is ready to issued to the customer`})
              }else{
               return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg :" Something went wrong didn't add to the log"})
              }
           })
          } else {
         
              return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err.message})
          }
        })
      }else{
        if(err.message === "Card is already issued"){
          return res.status(httpStatus.CREATED).json({msg : `card ${details.card_id} is allready issued`})
        }else{
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err.message})
        }
      }
    })
   
  }catch(err){
    return next(err)
  }
}

exports.scanCard = async(req,res,next) =>{
  //console.log(req.body)
   try{
    const details = {
      card_id: req.body.card_id,
      node_id : req.body.node_id,
      //tag : req.body.tag
    }
    console.log(details)
   // await card.cardScanning(details);
    await card.cardScanning(details, async (err,result)=>{
      if (!err) {
        const balance = result;
        console.log(balance)
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
                  //return res.status(httpStatus.OK).json({msg :"Hi " +balance[0]['CustomerName'] + " You can play the game"})
                  const log = {
                    card_id: details.card_id,
                    node_id: details.node_id
                  }
                  await card.addtolog(log, async(err)=>{
                     if(!err){
                       return res.status(httpStatus.OK).json({msg :"Hi " +balance[0]['CustomerName'] + " You can play the game"})
                     }else{
                      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg :"Hi " +balance[0]['CustomerName'] + " Something went wrong please try again"})
                     }
                  })
                 }else{
                  console.log(err.message)
                  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg :"Hi " +balance[0]['CustomerName'] + " Something went wrong please try again"})
                 }
              })
              
            }else{
              console.log(price[0]['Price'])
              return res.status(httpStatus.OK).json({msg :"Hi " +balance[0]['CustomerName'] + " Sorry, Your balance is not enough to play the game"})
            }

          }else{
            return res.status(httpStatus.BAD_REQUEST).json({Error: "ZERO_ROWS_AFFECTED POSSIBLY BECAUSE WRONG NODE_ID"})
          }
        })
      } else {
        // card is already issued
        if(err == "ER_DUP_ENTRY")
          return res.status(httpStatus.CONFLICT).json({Error: `card ${details.card_id} is already issued. Has to return it first`})
        // Internal server error
        else
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err.message})
      }
    })

   

    //console.log(balance);
    //console.log(price)
   }catch(err){
     console.log(err)
     next(err)
   }
}

