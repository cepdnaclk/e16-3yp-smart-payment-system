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
//const { validateBody, schemas } = require('../../validations/userValidation')
const nodeValidation = require('../../validations/NodeValidation')
const centerValidation = require('../../validations/CenterValidations')
const cardValidation = require('../../validations/CardValidation')
const logValidation = require('../../validations/logValidation')
const isAuth = require("../../middlewares/authorization")


//route to reister and login users
router.post('/register',userValidation.validateBody(userValidation.schemas.registerSchema),userController.userRegister);
router.post('/login',userValidation.validateBody(userValidation.schemas.loginSchema),userController.userLogin);

//routes about cards
router.post('/addCards',cardValidation.validateBody(cardValidation.schemas.cardAddSchema),cardController.addCards);

//routes about Center
router.post('/addCenter',centerValidation.validateBody(centerValidation.schemas.centerAddSchema),isAuth(["user","superAdmin"]),centerController.addCenter);

//routes about Node
router.post('/addNodes',nodeValidation.validateBody(nodeValidation.schemas.NodeAddSchema),nodeController.addNodes);

//routes to update the log
router.post('/addNodeUsage',logValidation.validateBody(logValidation.schemas.nodeUsageSchema),nodeUsageController.addNodeUsage);
router.post('/addCardIssueLog',logValidation.validateBody(logValidation.schemas.cardIssueSchema),cardIssueLogController.addCardIssueLog)

module.exports = router