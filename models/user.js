const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String || Number,
        required:true
    }
})

userSchema.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();

    return rest;
}

const User = model("user",userSchema);

module.exports = User;