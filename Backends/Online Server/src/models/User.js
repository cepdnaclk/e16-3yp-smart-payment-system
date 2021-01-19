//const { function } = require('joi');
const mongoose = require('mongoose');
const config = require('../config')
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const Center = require("../models/Center")
const jwt = require('jsonwebtoken')


const roles = [
  'superAdmin', 'admin','user'
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
    },
    center:[{
      type: mongoose.Schema.Types.ObjectId,
      ref : Center
    }]
  }, {
    timestamps: true
  })
  
  userSchema.methods.generateToken = function () {
    const user_details = {
      id : this._id,
      role : this.role,
      name: `${this.fName} ${this.lName}` 
    }
    const token = jwt.sign(user_details, config.secret)
    return token;
  }

  userSchema.statics = {
    roles,
  
    checkDuplicateEmailError (err) {
      if (err.code === 11000) {
        let error = new Error('Email already taken')
        error.errors = [{
          field: 'email',
          location: 'body',
          messages: ['Email already taken']
        }]
        error.status = 400
        return error.json({   
          "message" : error.message,
          success : false
      })
      }
  
      return err
    },
  
    // async findAndGenerateToken (payload) {
    //   const { email, password } = payload
    //   if (!email) throw new APIError('Email must be provided for login')
  
    //   const user = await this.findOne({ email }).exec()
    //   if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND)
  
    //   const passwordOK = await user.passwordMatches(password)
  
    //   if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED)
  
    //   if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED)
  
    //   return user
    // }
  }


const User = mongoose.model('User',userSchema);
module.exports = User;