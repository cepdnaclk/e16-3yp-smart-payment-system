const config = require('../config')
const mongoose = require('mongoose')

const connectionParams={
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true 
    }
    exports.connect =()=>{
        mongoose.connect(config.mongo.uri,connectionParams)
        .then( () => {
            console.log('Connected to database ')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })
    }
  