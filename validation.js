const Joi = require('@hapi/joi')

//registervalidation

const registerVallidation = (data) => {
   
   
    const schema = Joi.object({
        name : Joi.string().min(6).required() , 
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
   
   
    const schema = Joi.object({
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    });

    return schema.validate(data);
}


module.exports.registerVallidation = registerVallidation;
module.exports.loginValidation = loginValidation;