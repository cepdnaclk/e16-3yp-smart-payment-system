'use strict'

const httpStatus = require('http-status')

// when the path is not valid
exports.handleNotFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND)
  res.json({
    message: 'Requested resource not found'
  })
  res.end()
}

// If the error has occured
exports.handleError = (err, req, res, next) => {
	res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
	res.json({
    	errors: {
    		name: err.name,
    		message: err.message,
    		statusCode: err.statusCode,
    		error: err.error,
    		details: {
    			message: err.details.body[0].message,
    			path: err.details.body[0].path,
    			type: err.details.body[0].type
    		}
    	}
	})
	res.end()
}