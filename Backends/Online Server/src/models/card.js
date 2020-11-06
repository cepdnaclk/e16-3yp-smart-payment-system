const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const cardScema = new Schema({
     tag: {
         type: String,
         required: true,
         unique: true
     },
     amount:{
         type: Currency,
         required :true 
     },
     timestamps: false,
     isIssued:{
         type: Boolean,
         required:true
     }
})

var Dishes = mongoose.model('Dish',dishScema);
module.exports = Dishes;