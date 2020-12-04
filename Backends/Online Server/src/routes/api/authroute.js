const express = require('express')
const { validate, ValidationError, Joi } = require('express-validation')
const router = express.Router()

//Imporying controllers
const userController = require('../../controllers/userController')
const cardController = require('../../controllers/cardController')
const centerController = require('../../controllers/centerController')
const nodeController = require('../../controllers/nodeController')
const nodeUsageController = require('../../controllers/nodeUsageController')
const cardIssueLogController = require('../../controllers/cardIssueLogController')


//Importing validators
const userValidation = require('../../validations/userValidation')
const { validateBody, schemas } = require('../../validations/userValidation')

//route to reister and login users
router.post('/register',validateBody(schemas.registerSchema),userController.userRegister);
router.post('/login',validateBody(schemas.loginSchema),userController.userLogin);

//routes about cards
router.post('/addCards',cardController.addCards);

//routes about Center
router.post('/addCenter',centerController.addCenter);

//routes about Node
router.post('/addNodes',nodeController.addNodes);

//routes to update the log
router.post('/addNodeUsage',nodeUsageController.addNodeUsage);
router.post('/addCardIssueLog',cardIssueLogController.addCardIssueLog)

module.exports = router