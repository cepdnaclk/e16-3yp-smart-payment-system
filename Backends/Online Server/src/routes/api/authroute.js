const express = require('express')
const { validate, ValidationError, Joi } = require('express-validation')
const router = express.Router()
const userController = require('../../controllers/userController')
const userValidation = require('../../validations/userValidation')

//route to reister users
router.post('/register',validate(userValidation.register,{}),userController.userRegister)

module.exports = router