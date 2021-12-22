// This keeps track of all the users irrespective of the roles
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    password  : {
        type : String,
        required : true
    },
    date_of_birth  : {
        type : String,
        required : true
    },
    first_name  : {
        type : String,
        required : true
    },
    last_name  : {
        type : String,
        required : true
    },
    username  : {
        type : String,
        required : true
    },
    
},{timestamps: true} );

module.exports = mongoose.model("User",userSchema);
