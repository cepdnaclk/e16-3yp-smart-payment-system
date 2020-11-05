'use strict'

const config = require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('../routes/api')
const port = (config.port) ? config.port : 4000
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors())

// Route of the app will be done in here
app.use('/', api)

// module export to use
exports.start = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }

    console.log(`${config.app} is running on port ${port}`)
  })
}

exports.app = app