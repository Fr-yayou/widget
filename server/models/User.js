const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:4,
        max:255
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:4,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:4,
        max:1000
    },
},  {
    timestamps: true,
});

module.exports = mongoose.model("User",UserSchema)