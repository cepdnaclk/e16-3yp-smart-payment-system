const { required } = require('joi');
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const Node = require('../models/Node');

const status = [
    'using', 'damaged','removed'
  ]
const nodeUsageScema = new Schema({
     
     center_id:{
         type: Number,
         required : true
     },
     Node:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Node
     }
     ,
     timestamps: true,
    
})

var NodeUsage = mongoose.model('NodeUsage',nodeUsageScema);
module.exports = NodeUsage;