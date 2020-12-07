const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;
const Center = require("../models/Center")


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
      default: 'users',
      enum: roles
    },
    center:[{
      type: mongoose.Schema.Types.ObjectId,
      ref : Center
    }]
  }, {
    timestamps: true
  })
  

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