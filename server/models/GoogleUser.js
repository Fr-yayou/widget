const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userGoogleSchema = new Schema({

    username:String,
    googleId:String,
    token:String,
    refresh_token:String
})

const GoogleUser = mongoose.model("google-user",userGoogleSchema)

module.exports = GoogleUser
