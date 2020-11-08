const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const roles = [
  'user', 'admin'
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
    role: {
      type: String,
      default: 'user',
      enum: roles
    }
  }, {
    timestamps: true
  })
  

var User = mongoose.model('User',userSchema);
module.exports = User;