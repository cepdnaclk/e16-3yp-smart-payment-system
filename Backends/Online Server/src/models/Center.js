const { required } = require('joi');
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const status = [
    'using', 'damaged','removed'
  ]
const centerScema = new Schema({
     
     center_id:{
         type: Number,
         required : true
     },
     name:{
        type:  String,
        required :true
        
     },
     Address:{
        type:  String,
        required :true
        
     },

     timestamps: true,
    
})

var Center = mongoose.model('Center',centerScema);
module.exports = Center;