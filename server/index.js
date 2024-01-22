const express = require('express');
// const router = express.Router(); This line creates a router. In this file we don't need to create a router. 
//We just want to send our request to different routes, which we have defined in routs directory. Hence, we will just use those

const rootRoute = require("./routes/index"); //All the requests comming will go to root router. In root router we have seperated diff routs
