const { required } = require('joi');
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const status = [
    'using', 'damaged','removed'
  ]
const cardScema = new Schema({
     
     center_id:{
         type: Number,
         required : true
     },
     status:{
        type:  String,
        default : 'using',
        enum: status
        
     },

     timestamps: true,
    
})

var Card = mongoose.model('Card',cardScema);
module.exports = Card;