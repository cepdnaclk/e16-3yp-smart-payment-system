const { required } = require('joi');
const mongoose = require('mongoose');

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const Employee = require('../models/Employees');

const Card = require('../models/Card');
const Center = require('../models/Center');

const status = [
    'using', 'damaged','removed'
  ]
const cardIssueScema = new Schema({
     
     center_id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: Center,
         required : true
     },
     card_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Card,
        required : true
     },

     employee_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Employee,
        required : true
     }
     
   },{
      timestamps: true,
 })

var CardIssue = mongoose.model('CardIssue',cardIssueScema);
module.exports = CardIssue;