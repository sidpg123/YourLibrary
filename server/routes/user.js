const express = require('express');
const zod = require('zod')
const { User, Books, BookRequest } = require("../models/db");
const router = express.Router();//Here we create router which we will exprot to index
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const { authMiddleware } = require('../middleware')


const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string()
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
    }else{

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
        })
        const userId = user._id;
        const token = `Bearer ${jwt.sign({
            userId
        }, JWT_SECRET)}`;


        res.json({
            message: "user created sussefully",
            token: token
        })
    }
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    
    if(!success){
        res.status(411).json({
            message: "Invalid inputs"
        })
    }else{
        const isValidUser = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })

        if(!isValidUser){
            res.status(411).json({
                message: "User Not found"
            })
        }else{
            
            const userId = isValidUser._id;
            const token0 = jwt.sign({
                userId
            }, JWT_SECRET)
            const token = `Bearer ${token0}`;
            console.log(token0);

            res.json({
                message: "User successfully signed-in",
                token : token
            })
        }
    }
})

//There will be three tables. One is for user, one is for librarian and one is for Books
//Issued books will be stored in an array in users table

//On this route user will see available books
router.get("/bulk", authMiddleware, async (req, res)=>{
    const book = req.query.book || "";

    const books = await Books.find({
        $or: [{
            title: {
                "$regex": book
            }
        }, {
            author: {
                "$regex": book
            }
        }]
    });
    
    res.json({
        Books: books.map(book => ({
            title: book.title,
            author: book.author,
            available: book.isAvailable
        }))
        // Books: books
    })
})

//On this route user will request for a book. If book is available then that book will be assigned to user.
//But status will be not collected. Once he visit the library and get the physical book, librarian will change the satus to collected
router.post("/requestbook", authMiddleware, async (req, res) => {
    const bookName = req.body.bookName;
    const book = await Books.findOne({
        _id: bookName 
    })

    const userId = req.userId; //THis is given by middleware
    if(book.isAvailable){
        const requset = await BookRequest.create({
            userId: userId,
            bookId: book._id,
            status: "pending"
        }) 
        res.json({
            message: "Request sent successfully."
        })

    }else{ //here we should give an alert 
        res.json({
            message: "Book is currantly unavailable"
        })
    }
})

//On this route user can see which books he has
router.get("/issued", authMiddleware, async (req, res) => {
    try{
        const user = await User.findOne({
            _id: req.userId
        })

        const books = await Books.find({
            _id : {
                "$in" : user.issuedBooks
            }
        })
        
        res.json({
            books: books
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


module.exports = router; 