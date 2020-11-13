const { required } = require('joi');
const mongoose = require('mongoose');
const Employee = require('./Employees');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const Card = require('../models/Card');
const Employee = require('../models/Employees');

const Card = require('../models/Card');
const Employee = require('../models/Employees');

const status = [
    'using', 'damaged','removed'
  ]
const nodeScema = new Schema({
     
     center_id:{
         type: Number,
         required : true
     },
     card:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Card,
        required : true
     },

     employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Employee,
        required : true
     },

     timestamps: true,
    
})

var Node = mongoose.model('Node',nodeScema);
module.exports = Node;