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


router.post('/register',authController.register)
router.post('/login', authController.login)

router.post('/addCard',cardValidation.validateBody(cardValidation.schemas.cardAddSchema),cardController.addCard);
router.post('/issueCard',cardValidation.validateBody(cardValidation.schemas.cardIssueSchema),cardController.issueCard);

router.post('/scanCard',cardValidation.validateBody(cardValidation.schemas.cardScanSchema),cardController.scanCard);
router.post('/returnCard',cardValidation.validateBody(cardValidation.schemas.cardAddorReturnSchema),cardController.returnCard);
router.post('/refundCard',cardValidation.validateBody(cardValidation.schemas.cardRefundSchema),cardController.refundCard);


module.exports = router