const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

//Import User model//
const User = require('../models/User')

//@route post localhost:5001/users
//@desc Register new user
//access Public 

router.post("/", async (req, res) => {
    //Destructure object newUser
    const { username, email, password } = new User(req.body)
    const userUsername = await User.findOne({ username: username })
    const userEmail = await User.findOne({ email: email })
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }
    if (!salt) throw Error('Something went wrong with bcrypt');

    if (!hash) throw Error('Something went wrong hashing the password');

    if (userUsername) {
        return res.status(400).json({ message: `User already register with this username:${username}` })
    }
    if (userEmail) {
        return res.status(400).json({ message: `User already register with this email:${email}` })
    }
    if (username.length < 4) {
        return res.status(400).json({ message: `Username should be more than 4 characters` })
    } else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return res.status(400).json({ message: `${email} is not a valid email` })
    }

    try {
        const newUser = new User({
            username,
            email,
            password: hash
        });

        const savedUser = await newUser.save()
        if (!savedUser) throw Error("Something went wrong while saving the user")
        const token = await jwt.sign({ id: savedUser._id }, config.get('jwtSecret'), {
            expiresIn: 3600
        });
        res.status(200).json({
            token,
            user: {
                id: savedUser.id,
                username: savedUser.name,
                email: savedUser.email
            }
        });
    } catch (err) {
        res.status(400).json({ msg: err })
    }
})


//@route post localhost:5001/users/auth
//@desc User Authentication 
//access Public 

router.post("/auth", async (req, res) => {
    //Destructure object newUser
    const { email, password } = new User(req.body)
    const user = await User.findOne({ email })
    const userEmail = await User.findOne({ email: email })

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    if (!userEmail) {
        return res.status(400).json({ message: `User with this email:${email} does not exist` })
    }

    // Validate password
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = await jwt.sign({ id: user._id }, config.get('jwtSecret'), {
            expiresIn: 3600
        });
        res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    }
})

//@route delete localhost:5001/users
//@desc Delete User for admin
//access Private 

router.delete("/:id", auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) throw Error("No user found")

        res.status(200).json({ message: "User was successfully deleted" })
    } catch (err) {

        res.status(400).json({ msg: err })
    }
})

//@route User get all user//
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' * err));
});

//@route User get one user//
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error:' * err));
});


router.get("/auth/info", auth, async (req, res) => {
    await User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

router.post("/update/:id", auth, async (req, res) => {

    await User.findById(req.params.id)

    let updateUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    const { email, username } = updateUser

    const userUsername = await User.findOne({ username: username })
    const userEmail = await User.findOne({ email: email })
    if (userUsername) {
        return res.status(400).json({ message: `User already register with this username:${username}` })
    }
    if (userEmail) {
        return res.status(400).json({ message: `User already register with this email:${email}` })
    }
    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return res.status(400).json({ message: `${email} is not a valid email` })
    } else if (username.length < 4) {
        return res.status(400).json({ message: `Username should be more than 4 characters` })
    }

    try {
        await updateUser.save()
        res.status(200).json('User updated')
    } catch (err) {
        return res.status(400).json({ message: err })
    }

})

module.exports = router
