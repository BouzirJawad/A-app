const express = require('express')
const bcrybt = require('bcrypt')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const router = express.Router()
const secretKey = "30b50136e000496c4e0ef82d6b789e6964c77ed757f99ed508844fc18cec8b9a"

router.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            email: req.body.email,
            password: await bcrybt.hash(req.body.password, 10)
        })

        await newUser.save()
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({error: 'Error registering user (email already used)'})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user) {
            res.send('User not found')
            return
        }
        const isMatched = await bcrybt.compare(password, user.password)
        if (!isMatched) {
            res.send("Wrong password")
            return
        }
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '10min'})
        res.json({ token })
        res.send('Comming soon')
    } catch (error) {
        res.status(500).json({error: 'Error logging in'})
    }
})

router.get('/test', (req, res)=>{
    res.send("hello")
})

module.exports = router;