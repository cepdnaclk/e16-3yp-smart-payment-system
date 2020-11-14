const { required } = require('joi');
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const User = require("../models/User")

const status = [
    'using', 'damaged','removed'
  ]
const centerScema = new Schema({
     
     name:{
        type:  String,
        required :true
        
     },
     address:
        {
        type:  String,
        required :true
        
     },
     user_id:
        [{
            type: mongoose.Schema.Types.ObjectId,
            //ref:User,
            required:true
        }
      ]
   },{   

     timestamps: true,
    
})

const Center = mongoose.model('Center',centerScema);
module.exports = Center;