'use strict'

const express = require('express')
const router = express.Router()
const authRouter = require('./authRoute')
const Embedded_Project = require('../../public/introduction')

// will send little introduction about the API
router.get('/', (req, res) => {
	res.status(200).send(Embedded_Project)
})

// adding authentication routes for the application
router.use('/api', authRouter)

module.exports = router