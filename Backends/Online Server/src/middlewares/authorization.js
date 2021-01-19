//TODO : when a invalid token is invalid it gives the wrong status code. Have to correct it

const jwt = require('jsonwebtoken');
const APIError = require('../utils/APIErrors')
const httpStatus = require('http-status')
const config = require("../config")
const User = require('../models/User')

const auth =(roles =[User.role]) => async (req,res,next)=>{
    
        
  try{  
    console.log("in middleware "+roles[0])
    const authHeader = req.get('Authorization');
     if(!authHeader){
            throw new APIError(`this have not authenticated`, httpStatus.UNAUTHORIZED)
     }
    
    const token =authHeader.split(' ')[1] ;
     let decodedToken;
        
     
    decodedToken = jwt.verify(token,config.secret);
    current_role = decodedToken.role;
    console.log(current_role) 
    if((roles.indexOf(current_role))<0) throw new APIError(`Access FORBIDDEN`, httpStatus.FORBIDDEN)
  
    next();
  }catch(err){
    
   next(err)
  }
   
};


module.exports = auth