'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req,res,next)=>{
	console.log("succcess");
	res.status(200).json({"msg":"ok"})
})

app.post('/Id', (req,res,next)=>{
	console.log(req.body);
	res.status(200).json({"msg":"Access Granted"})
})


//const app = require('./services/express')
//const mysql = require('./services/mysql')

// Start app and connect it to the database
app.listen(3000, (err) => {
    if (err) {
      console.log(`Error : ${err}`)
      process.exit(-1)
    }

    console.log(`app is running on port 3000`)
  })

module.exports = app