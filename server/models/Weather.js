const mongoose = require("mongoose")
const Schema = mongoose.Schema


const WeatherSchema = new Schema({

    city:{
        type:String,
        required:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
})

module.exports = mongoose.model("Weather",WeatherSchema)

