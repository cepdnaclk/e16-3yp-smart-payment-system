
const Joi = require('joi')

module.exports = {

    schemas : {
     cardIssueSchema :Joi.array().items({
        
        center_id : Joi.string()
            .required()
            .min(20),
        card_id : Joi.string()
            .required()
            .min(20), 
        employee_id : Joi.string()
            .required()
            .min(20),       
        
      }),
      nodeUsageSchema :Joi.array().items({
        
        center_id : Joi.string()
            .required()
            .min(20),
        node_id : Joi.string()
            .required()
            .min(20)  
        
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