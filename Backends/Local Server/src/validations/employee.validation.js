'use strict'

const { validate, ValidationError, Joi } = require('express-validation')

exports.register = {
	body: Joi.object({
		nic: Joi.string()
			.regex(/[0-9]{11}/)
	    	.required(),
	    email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } })
			.max(60)
			.required(),
	    password: Joi.string()
			.regex(/[a-zA-Z0-9]{6,20}/)
			.required(),
	    fname: Joi.string()
	    	.max(30)
	    	.regex(/[a-zA-Z]/)
	    	.required(),
	    lname: Joi.string()
	    	.max(30)
	    	.regex(/[a-zA-Z]/)
	    	.required(),
	}),
}

exports.login = {
	body: Joi.object({
	    email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'lk'] } })
			.max(60)
			.required(),
	    password: Joi.string()
			.regex(/[a-zA-Z0-9]{6,20}/)
			.required(),
	}),
}