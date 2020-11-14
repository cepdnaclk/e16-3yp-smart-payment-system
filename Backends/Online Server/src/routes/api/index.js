const express = require('express')
const router = express.Router()
const authRouter = require('./authroute')

router.get('/', (req, res) => { res.send({homepage: 'OK'}) }) // api status

router.use('/auth', authRouter) // mount auth paths
//router.use('/api', authRouter) // mount auth paths

module.exports = router