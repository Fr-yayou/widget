const express = require('express');
const router = express.Router();


//Import Weather model//
const Weather = require('../models/Weather')
const User = require("../models/User")


//@route to post new city//
router.post("/post",async (req,res) =>{
    const {city,user} = new Weather(req.body)
    const checkUserId = await User.findById(user)

    if(!checkUserId){
       return res.status(400).json({message:"User is incorrect"})
    }
    try{
        const newCity = new Weather({
            user,
            city
        })
        await newCity.save()
        res.status(200).json({message:"New city added"})
    }catch(err){
        res.status(400).json({message:err})
    }

})

//@Get all the city//

router.get("/",async (req,res) => {
    try{
        const weather = await Weather.find()
        res.status(200).json(weather)
    }
    catch(err){
        res.status(400).json({message : err})    }
})

//@Get one city//
router.get("/:id",async (req,res) => {
    try{
        const weather = await Weather.findById(req.params.id)
        res.status(200).json(weather)
    }
    catch(err){
        res.status(400).json({message : err})
    }
})

//@Delete city
router.delete("delete/:id", async (req,res) => {
    try{
        const city = await Weather.findByIdAndDelete(req.params.id)
        if(!city) throw Error("No city found")

        res.status(400).json({message:"The city was deleted successfully"})
    }
    catch(err){
        res.status(400).json({message:err})
    }
})


module.exports = router