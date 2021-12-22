// This middleware can be used to validate the field required for the customers
//For JOI Docs refer to ==>


const Joi = require("joi");
        
let adminSchema = Joi.object().keys({
    userName : Joi.string().required(),

    email : Joi.string().required().email(),
    

    role : Joi.string().required(),
    
    fullName : Joi.string().required(),
    
    contactNumber : Joi.string().required(),
});




module.exports.customerValidation = (data) =>{

    const schema = Joi.object({

        
        companyName : Joi.string(),
        
        country : Joi.string(),

        licenseCode   :  Joi.string(),
       
        mailingAddress   :  Joi.string(),
        
        gstNumber   :  Joi.string(),
        
        PAN   :  Joi.string().regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/),
        
        currency   :  Joi.string(),
        
        bankName   :  Joi.string(),
        
        bankAccountNumber   :  Joi.string(),
        
        IFSC   :  Joi.string(),
        
        SWIFT   :  Joi.string(),

        pEmail :Joi.string(),

        pContactNumber:Joi.string(),
        
        password : Joi.string(),
         
        

    }).concat(adminSchema);

    
    //Validate before making the customer
    return schema.validate(data);
    
}
module.exports.customerBankDetailsValidation = (data) =>{

    const schema = Joi.object({
        
        gstNumber   :  Joi.string().required(),
        
        PAN   :  Joi.string().regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/).required(),
        
        currency   :  Joi.string().required(),
        
        bankName   :  Joi.string().required(),
        
        bankAccountNumber   :  Joi.string().required(),
        
        IFSC   :  Joi.string().required(),
        
        SWIFT   :  Joi.string().required(),
    });
    
    //Validate before making the customer
    return schema.validate(data);   
}

module.exports.techExpertValidation = (data) =>{

    const schema = Joi.object({

        
        domainName : Joi.string(),
        
        PAN: Joi.string().regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/),
        
        bankName: Joi.string(),
        
        bankAccountNumber: Joi.string(),
        
        IFSC : Joi.string(),

        password : Joi.string(),
        
        
        
    }).concat(adminSchema);

    
    //Validate before making the customer
    return schema.validate(data);
    
}

module.exports.moderatorValidation = (data) =>{

    const schema = Joi.object({
        domainName : Joi.string(),
        password : Joi.string(),
    }).concat(adminSchema);

    
    //Validate before making the customer
    return schema.validate(data);
    
}

module.exports.adminValidation = (data) =>{
    return adminSchema.validate(data);
}

module.exports.loginValidation = (data) =>{

    const schema = Joi.object({
        email : Joi.string()
                    .required(), 

        password : Joi.string()
                    .required(),
    });

    
    //Validate before making the user
    return schema.validate(data);
    
}

