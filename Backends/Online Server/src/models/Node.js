const { required } = require('joi');
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const Center = require("../models/Center");

const status = [
    'using', 'damaged','removed'
  ]
const nodeScema = new Schema({
     
     center_id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: Center,
         required : true
     },
     status:{
        type:  String,
        enum: status,
        required:true
        
     }
   
}, {
  timestamps: true,
 })

var Node = mongoose.model('Node',nodeScema);
module.exports = Node;