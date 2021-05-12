'use strict'

const app = require('./services/express')
const mysql = require('./services/mysql')

///////////////////////// TESTING AREA START ///////////////////

// const user = require('./models/user.model')
// const center = require('./models/center.model')

///////////////////////////TESTING AREA OVER ///////////////////




// Start app and connect it to the database
app.start()
mysql.connect()


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