
const Joi = require('joi')

module.exports = {

    schemas : {
      cardAddorReturnSchema : Joi.object().keys({
        
        card_id : Joi.string()
            .required()
            .min(4)
      }),
      cardRechargeSchema : Joi.object().keys({  
        card_id : Joi.string()
            .required()
            .min(4),
        refund_amount :Joi.number()
            .required()
            .min(0)    
      }),
      cardIssueSchema : Joi.object().keys({  
        card_id : Joi.string()
            .required()
            .min(4),
        amount :Joi.number()
            .required()
            .min(0),
        is_issued : Joi.boolean()
            .required(),
        employee_id : Joi.string()
            .required(),
        customer_name: Joi.string()
            .required(),
        time: Joi.string(),
        date: Joi.date(),
        tag:Joi.string().required()

      }),
      cardScanSchema : Joi.object().keys({  
        card_id : Joi.string()
            .required()
            .min(4),
        node_id :Joi.string()
            .required()
            .min(0),
        // tag : Joi.string(),

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