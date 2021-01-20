'use strict'

const express = require('express')
const router = express.Router()
const { validate, ValidationError, Joi } = require('express-validation')
const userValidation = require('../../validations/employee.validation')
const authController = require('../../controllers/auth.controller')
const auth = require('../../middlewares/authorization')


const keyValidation = require('../../validations/key.validation')
const keyController = require('../../controllers/key.controller')
// const buildingValidation = require('../../validations/building.validation')
// const buildingController = require('../../controllers/building.controller')
// const borrowerValidation = require('../../validations/borrower.validation')
// const borrowerController = require('../../controllers/borrower.controller')
// const borrowsController = require('../../controllers/borrows.controller')

router.post('/register', validate(userValidation.register, {}, {}), authController.register)
router.post('/login', validate(userValidation.login, {}, {}), authController.login)
router.get('/user', auth.sendUser, authController.getuser)
router.delete('/logout', authController.logout)


router.post('/rfidcard/register', validate(keyValidation.register, {}, {}), keyController.register)
router.post('/rfidcard/update', validate(keyValidation.register, {}, {}), keyController.update)
router.post('/rfidcard/getkey', validate(keyValidation.getkey, {}, {}), keyController.getkey)

module.exports = router