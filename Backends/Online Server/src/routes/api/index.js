const express = require('express')
const router = express.Router()
const authRouter = require('./authroute')

router.get('/', (req, res) => { res.send({homepage: 'OK'}) }) // api status

router.use('/user', authRouter) // mount auth paths

module.exports = router