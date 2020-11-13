const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const roles = [
  'superAdmin', 'admin','users'
]

const userSchema = new Schema({
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
    role: {
      type: String,
      default: 'user',
      enum: roles
    }
  }, {
    timestamps: true
  })
  

const User = mongoose.model('User',userSchema);
module.exports = User;