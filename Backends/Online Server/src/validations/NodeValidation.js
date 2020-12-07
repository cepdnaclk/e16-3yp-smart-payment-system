
const Joi = require('joi')

module.exports = {

    schemas : {
      NodeAddSchema : Joi.array().items({
        
        center_id : Joi.string()
            .required()
            .min(20),
        status : Joi.string()
            .required()
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