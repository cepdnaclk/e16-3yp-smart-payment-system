'use strict'

const express = require('express')
const router = express.Router()
const { validate, ValidationError, Joi } = require('express-validation')
const userValidation = require('../../validations/employee.validation')
const authController = require('../../controllers/auth.controller')
const cardController = require('../../controllers/card.controller')
const auth = require('../../middlewares/authorization')

const cardValidation = require('../../validations/CardValidation')
const nodeValidation = require('../../validations/NodeValidation')                                                                                                                                                                                                                                  
const isAuth = require("../../middlewares/authorization")


//router.post('/register',userValidation.validateBody(userValidation.schemas.up,authController.register)
router.post('/login',userValidation.validateBody(userValidation.schemas.loginSchema), authController.login)
router.post('/updatePassword',userValidation.validateBody(userValidation.schemas.updatePasswordSchema), authController.updatePassword)

router.post('/addCard',cardValidation.validateBody(cardValidation.schemas.cardAddorReturnSchema),cardController.addCard);
router.post('/issueCard',cardValidation.validateBody(cardValidation.schemas.cardIssueSchema),cardController.issueCard);

router.post('/scanCard',cardController.scanCard);
router.post('/returnCard',cardValidation.validateBody(cardValidation.schemas.cardAddorReturnSchema),cardController.returnCard);
router.post('/rechargeCard',cardValidation.validateBody(cardValidation.schemas.cardRechargeSchema),cardController.rechargeCard);
router.post('/deleteCard',cardController.deleteCard);


module.exports = router