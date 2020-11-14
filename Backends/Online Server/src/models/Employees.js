const { required } = require('joi');
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const status = [
    'active', 'suspended','resigned'
  ]
const employeeScema = new Schema({
     
     center_id:{
         type: Number,
         required : true
     },
     status:{
        type:  String,
        default : 'active',
        enum: status
        
     },
     email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 128
      },
      fname: {
        type: String,
        maxlength: 50
      },
      lname: {
        type: String,
        maxlength: 50
      },
      activationKey: {
        type: String,
        unique: true
      },
      active: { 
        type: Boolean,
        default: false
      },
      contactNumber: {
        type: Number,
        maxlength: 10
      },
    
}, {
  timestamps: true,
  })

const  Employee = mongoose.model('Employee',employeeScema);
module.exports = Employee;