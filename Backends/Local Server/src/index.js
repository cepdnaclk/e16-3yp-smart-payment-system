'use strict'

const app = require('./services/express')
const mysql = require('./services/mysql')

// Start app and connect it to the database
app.start()
mysql.connect()

module.exports = app