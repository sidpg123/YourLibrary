const express = require('express');
const zod = require('zod')
const { User, Books, BookRequest } = require("../models/db");
const jwt = require('jsonwebtoken');
const router = express.Router();
const {JWT_SECRET} = require('../config');
const { authMiddleware } = require('../middlewares/middleware')
const { roleAuthMiddleware } = require('../middlewares/roleAuth')

//Librarian can accept the books from user. Once user submit a book, librarian will remove that book from users data.
//Librarian will add books and can change their count.
//Librarian can see the requests made by users. These requests are stored in bookRequest table. 

//Librarian will not have signUp route because only admin can assign librarians

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
 
        if(!isValidUser || isValidUser.isLibrarian == false){
            res.status(411).json({
                message: "Librarian Not found"
            })
        }else{            
            const userId = isValidUser._id;
            const token0 = jwt.sign({
                userId
            }, JWT_SECRET)
            const token = `Bearer ${token0}`;
            // console.log(token0);

            res.json({
                message: "User successfully signed-in",
                token : token
            })
        }
    }
})

router.get("/requests", authMiddleware,roleAuthMiddleware, async (req, res) =>{
    try {
        const requests = await BookRequest.find({});
        if(requests){
            res.json({
                requests: requests
            })
        }else{
            console.log("no requests");
            res.json({message: 'no requests available'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
})

//In this route librarian will add new books 
let responseSent = false; // Flag to track if response has been sent

router.post("/addBook", authMiddleware, async (req, res) => {
    try {
        console.log("Inside the addBook block");
        console.log("Request Body:", req.body);

        const addedBook = await Books.create({
            title: req.body.title,
            author: req.body.author,
            count: req.body.count,
            isAvailable: true
        });

        console.log('Book added successfully:', addedBook);

        // Check if response has been sent before sending it again
        if (!responseSent) {
            responseSent = true;
            res.json({ message: 'Book added successfully' });
        }
    } catch (error) {
        console.error(error);

        // Check if response has been sent before sending it again
        if (!responseSent) {
            responseSent = true;
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});


//Librarian will only approve a request when user visits the library inperson
//When librarian approve a request, it updates the database of user
// router.post("/accept")

router.post("/accept",authMiddleware, async (req, res) => {
    const requestId = req.body.requestId;
    try {
        // const request = await BookRequest.findById(requestId);
        const request = await BookRequest.updateOne({_id: requestId}, { $set: { status: "accepted" } },)
        if(request) {
            console.log("req accepted")
            res.status(200).json({message: 'request accepted'})
        }else{
            console.log("not found")
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})


router.post("/reject",authMiddleware, async (req, res) => {
    const requestId = req.body.requestId;
    try {
        // const request = await BookRequest.findById(requestId);
        const request = await BookRequest.updateOne({_id: requestId}, { $set: { status: "reject" } },)
        if(request) {
            console.log("req accepted")
            res.status(200).json({message: 'request rejected'})
        }else{
            console.log("not found")
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = router; 