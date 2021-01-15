const express = require('express')
const router = express.Router()
const {OAuth2Client} = require("google-auth-library")
const client = new OAuth2Client(process.env.CLIENT_ID) 
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');


const User = require('../models/User')


router.post("/google",async (req,res) =>{
    const {tokenId} = req.body
    const verified = await client.verifyIdToken({idToken:tokenId,audience:process.env.CLIENT_ID})
    console.log(verified)
    const {email_verified,name,email} = verified.payload

    if(email_verified){
      const user = await User.findOne({email:email})
      console.log(user)
      if(user){
          const token = await jwt.sign({ id: user._id }, config.get('jwtSecret'), {
              expiresIn: 3600
            })
            return res.status(200).json({
                token,
                user:{
                    id:user._id,
                    username:user.username,
                    email:user.email
                }
            })

        }else{
            let password = email
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            if (!salt) throw Error('Something went wrong with bcrypt');
            if (!hash) throw Error('Something went wrong hashing the password');

            let newUser = new User({
                    username:name,
                    email:email,
                    password:hash,
                })
        
                const createdUser = await newUser.save()
                console.log(createdUser)
                if(!createdUser){
                    res.status(400).json({message:"Something went wrong while saving the user"})
                }else{
                    const token = await jwt.sign({ id: createdUser._id }, config.get('jwtSecret'), {
                        expiresIn: 3600
                      })
        
                    res.status(200).json({
                        token,
                        user:{
                            id:createdUser._id,
                            username:createdUser.username,
                            email:createdUser.email
                        }
                    })
                }
            
        }
    }

    // .then(response =>{
    //     const {email_verified,name,email} = response.payload

    //     if(email_verified){
    //         User.findOne({email}).exec((err,user) => {
    //             if(err){
    //                 return res.status(400).json({message:"Something went wrong..."})
    //             }else{
    //                 if(user){
    //                     const token = await jwt.sign({ id: user._id }, config.get('jwtSecret'), {
    //                         expiresIn: 3600
    //                     })
    //                     console.log(user)
    //                     return res.status(200).json({token})
    //                 }else{
    //                     let password = "ifthgvbkuyzsxdcfghvkj"
    //                     let newUser = new User({
    //                         username:name,
    //                         email:email,
    //                         password:password,
    //                     })
    //                     newUser.save((err,data) =>{
    //                         if(err){
    //                             return res.json(400).json({message:"Something went wrong..."})

    //                         }else{
    //                             ///send token in the front
    //                             return res.status(200).json({token:"987654sdfghjukytfghjhkghf45678"}) 
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     }
    // })

})


module.exports = router



