const httpStatus = require('http-status')
const config = require('../config')
const jwt = require('jsonwebtoken')

exports.sendUser = async (req, res, next) => {
	try {
		// get auth header
		const brearerHeader = req.headers.authorization

		// if the token is there
		if (typeof brearerHeader !== 'undefined') {
			// separate the token and brearer
			const brearer = brearerHeader.split(' ')
			// taking token
			const brearerToken = brearer[1]
			
			// verify the token
			jwt.verify(brearerToken, config.secret, (err, decoded) => {
				if (err)
					return res.status(httpStatus.UNAUTHORIZED).json({Error : 'Unauthorized for the request!'})
				else {
					req.authuser = {
						name: decoded.name,
						role: decoded.role,
						designation: decoded.designation
					}
					return next()
				}
			})

		} else {
			return res.status(httpStatus.FORBIDDEN).json({Error : 'Authentication Failed!'})
		}
	}
	catch(err) {
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: "could not create the user!"})
	}
	
}

exports.check = async (req, res, next, roles) => {
	try {
		// get auth header
		const brearerHeader = req.headers.authorization

		// if the token is there
		if (typeof brearerHeader !== 'undefined') {
			// separate the token and brearer
			const brearer = brearerHeader.split(' ')
			// taking token
			const brearerToken = brearer[1]
			
			// verify the token
			jwt.verify(brearerToken, config.secret, (err, decoded) => {
				if (err)
					return res.status(httpStatus.UNAUTHORIZED).json({Error : 'Unauthorized for the request!'})
				else {
					if (!roles.includes(decoded.role))
						return res.status(httpStatus.FORBIDDEN).json({Error : 'Forbidden for your user type!'})
					else 
						return next()
				}
			})

		} else {
			return res.status(httpStatus.FORBIDDEN).json({Error : 'Authentication Failed!'})
		}
	}
	catch(err) {
		return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: "could not create the user!"})
	}
	
}
