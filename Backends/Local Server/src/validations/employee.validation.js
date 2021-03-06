const Joi = require('joi')

const roles = [
	'manager','cashier'
  ]

module.exports = {

  schemas : {
    loginSchema : Joi.object().keys({
      email : Joi.string().email().required(),
      password : Joi.string().regex(/[a-zA-Z0-9]{6,20}/).required()
	}),
	updatePasswordSchema : Joi.object().keys({
		oldPassword : Joi.string().regex(/[a-zA-Z0-9]{6,20}/).required(),
		newPassword : Joi.string().regex(/[a-zA-Z0-9]{6,20}/).required(),
		NIC:Joi.string()
		.max(11)
		.min(10)
		.required(),
	}),
	registerSchema : Joi.object().keys({
		NIC:Joi.string()
					.max(11)
					.min(10)
					.required(),
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
		role: Joi.string()
			.required()
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