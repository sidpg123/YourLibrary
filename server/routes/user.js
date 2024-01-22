const express = require('express');
const zod = require('zod')
const { User } = require("../models/db");
const router = express.Router(); //Here we create router which we will exprot to index
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../confing');
const { authMiddleware } = require('../middleware')
const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.String()
})


router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const alreadyUser = await User.findOne({username: req.body.username});

    if(alreadyUser){
        res.status(411).json({
            message: "User exists"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
    })

    res.json({
        message: "user created sussefully"
    })
})

const signinBody = zod.object({
    username: zod.String().email(),
    password: zod.String()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    
    if(!success){
        res.status(411).json({
            message: "Invalid inputs"
        })
    }

    const isValidUser = await User.findOne({
        username: req.body.username,
        password: res.body.password
    })

    if(!isValidUser){
        res.status(411).json({
            message: "User Not found"
        })
    }

    const userId = isValidUser._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User successfully signed-in",
        token : token
    })
})


router.get("/issued", async (req, res) => {
    
})