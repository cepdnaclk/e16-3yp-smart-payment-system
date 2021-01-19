const { required } = require('joi');
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const Node = require('../models/Node');
const Center = require('../models/Center');

const status = [
    'using', 'damaged','removed'
  ]
const nodeUsageScema = new Schema({
     
     center_id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: Center,
         required : true
     },
     node_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Node,
        required : true
     }
     
  },{
    timestamps: true,
  })

var NodeUsage = mongoose.model('NodeUsage',nodeUsageScema);
module.exports = NodeUsage;