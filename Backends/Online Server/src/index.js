'use strict'

const config = require('./config')
// const app = require('./services/express')
const mysql = require('./services/mysql')


const express = require('express')
const bodyParser = require('body-parser')
const errorHandler = require('./middlewares/error-handler')
const cors = require('cors')
const api = require('./routes/api')
const port = (config.port) ? config.port : 4000
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors())

// Route of the app will be done in here
app.use('/', api)
app.use(errorHandler.handleNotFound)
app.use(errorHandler.handleError)

///////////////////////// TESTING AREA START ///////////////////

// const user = require('./models/user.model')
// const center = require('./models/center.model')

///////////////////////////TESTING AREA OVER ///////////////////




// Start app and connect it to the database
// app.start()
mysql.connect()

app.listen(port, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }

    console.log(`${config.app} is running on port ${port}`)
});

/////////////////////// TESTING AREA START /////////////////////////

// user.findEmployee(123, 'abc@gmail.com', (err, result) => {
//     if(err)
//         console.error(err)
//     else {
//         console.log(result)
//     }
// })

// center.createCenterTables(123, (err) => {
//     if (err)
//         console.error(err)
// })

// center.changeCenterActivation({'activation': true, id: 123}, (err) => {
//     if(err)
//         console.error(err)
// })

// center.changeCenterName({'name': 'new name provided', 'id': 123}, (err) => {
//     if(err)
//         console.error(err)
// })

// center.registerCenter({'ownerid': '100', 'name': 'variable type is dosen matter'}, (err) => {
//     if (err)
//         console.error(err)
// })

// center.findCenter("8", (err, result) => {

//     if (err)
//         console.error(err)
//     else
//         console.log(result)
// })

///////////////////////// TESTING AREA OVER //////////////////////


module.exports = app