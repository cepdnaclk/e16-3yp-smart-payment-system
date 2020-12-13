const config = require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const apistatus = require('../routes/api/status')
const apiIndex = require('../routes/api/index')
const errorHandler = require('../middlewares/error-handler')


const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Middle where to add headers to the comming request to avoid cors errors
app.use((req,res,next)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,PATCH,DELETE');
	res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
	next();
});

app.use(apistatus)
app.use(apiIndex)
app.use(errorHandler.handleNotFound)
app.use(errorHandler.handleError)


exports.start = () => {
    app.listen(config.port, (err) => {
      if (err) {
        console.log(`Error : ${err}`)
        process.exit(-1)
      }
  
      console.log(`${config.app} is running on ${config.port}`)
    })
  }
  

exports.app = app