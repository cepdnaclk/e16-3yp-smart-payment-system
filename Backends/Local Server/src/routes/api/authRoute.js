'use strict'

const express = require('express')
const router = express.Router()
// const { validate, ValidationError, Joi } = require('express-validation')
// const userValidation = require('../../validations/user.validation')
// const authController = require('../../controllers/auth.controller')
// const keyValidation = require('../../validations/key.validation')
// const keyController = require('../../controllers/key.controller')
// const buildingValidation = require('../../validations/building.validation')
// const buildingController = require('../../controllers/building.controller')
// const borrowerValidation = require('../../validations/borrower.validation')
// const borrowerController = require('../../controllers/borrower.controller')
// const borrowsController = require('../../controllers/borrows.controller')
// const auth = require('../../middlewares/authorization')

router.get('/', (req, res, next) => {
    res.send('<h1>Auth derectory. Every routes will go through here. Yet to implement</h1>')
});


// router.post('/register', validate(userValidation.register, {}, {}), authController.register)
// router.post('/login', validate(userValidation.login, {}, {}), authController.login)
// router.get('/user', auth.sendUser, authController.getuser)
// router.delete('/logout', authController.logout)


// router.post('/key/register', validate(keyValidation.register, {}, {}), keyController.register)
// router.post('/key/update', validate(keyValidation.register, {}, {}), keyController.update)
// router.post('/key/getkey', validate(keyValidation.getkey, {}, {}), keyController.getkey)



// router.post('/building/register', validate(buildingValidation.register, {}, {}), buildingController.register)
// router.post('/building/update', validate(buildingValidation.register, {}, {}), buildingController.update)
// router.post('/building/getbyid', validate(buildingValidation.getbyid, {}, {}), buildingController.getbyid)
// router.post('/building/getbyname', buildingController.getbyname)

// router.post('/borrower/register', validate(borrowerValidation.register, {}, {}), borrowerController.register)
// router.post('/borrower/update', validate(borrowerValidation.update, {}, {}), borrowerController.update)
// router.post('/borrower/getborrower', validate(borrowerValidation.getbyid, {}, {}), borrowerController.getborrower)


// router.post('/borrows/setlog', borrowsController.setlog)


module.exports = router