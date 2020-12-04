// 'use strict'

// const { validate, ValidationError, Joi } = require('express-validation')

// exports.register = {
	// body: Joi.object({
	    // email: Joi.string()
		// 	.email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } })
		// 	.max(60)
		// 	.required(),
	//     password: Joi.string()
	// 		.regex(/[a-zA-Z0-9]{6,20}/)
	// 		.required(),
	    // fname: Joi.string()
	    // 	.max(20)
	    // 	.regex(/[a-zA-Z]/)
	    // 	.required(),
	    // lname: Joi.string()
	    // 	.max(30)
	    // 	.regex(/[a-zA-Z]/)
		// 	.required(),
	// 	role: Joi.string()
// 	}),
// }

// exports.login = {
// 	body: Joi.object({
// 	    email: Joi.string()
// 			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } })
// 			.required(),
// 	    password: Joi.string()
// 			.regex(/[a-zA-Z0-9]{6,20}/)
// 			.required(),
// 	}),
// }

//import Joi from 'joi';  //This is ES6 syntax, you can use require('joi')

const Joi = require('joi')

const roles = [
	'superAdmin', 'admin','users'
  ]

module.exports = {

  schemas : {
    loginSchema : Joi.object().keys({
      email : Joi.string().email().required(),
      password : Joi.string().regex(/[a-zA-Z0-9]{6,20}/).required()
	}),
	registerSchema : Joi.object().keys({
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } })
			.max(60)
			.required(),
		password : Joi.string().regex(/[a-zA-Z0-9]{6,20}/).required(),
		fname: Joi.string()
			.max(20)
			.regex(/[a-zA-Z]/)
			.required(),	
		lname: Joi.string()
			.max(30)
			.regex(/[a-zA-Z]/)
			.required(),
		contactNumber: Joi.number()
			.required(),
		role: Joi.string()
			
	  })
  },
 
  validateBody : (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if( result.error ) {
        return res.status(400).json({
          message : result.error.details
        })
      }else {
        if(!req.value) {
          req.value = {}
        }
        req.value['body'] = result.value;
        next();
      }
    }
  }  
}