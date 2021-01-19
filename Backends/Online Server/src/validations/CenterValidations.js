
//const { string } = require('joi');
const Joi = require('joi')

module.exports = {

    schemas : {
      centerAddSchema : Joi.object().keys({
        name :Joi.string()
            .required(),
        address :Joi.string()
            .required(),  
        user_id : Joi.array()
            .items(Joi.string()
            .min(20))
            .required()
            .min(1)
      
      }),
      
    },
   
    validateBody : (schema) => {
      return (req, res, next) => {
      
        const result = schema.validate(req.body);
       
        if( result.error ) {
          return res.status(400).json({
            message : result.error.details
          })
        }else {
          if(!req.value) {
            req.value = {}
          }
          req.value['body'] = result.value;
          next();
        }
      }
    }  
  }