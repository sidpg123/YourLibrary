const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const librarianRoute = require('./librarian');;

router.use("/user", userRoute);
router.use("/librarian", librarianRoute);

module.exports = router;
