
const express = require("express");
const rootRouter = require("./routes/index");//All the requests comming will go to root router. In root router we have seperated diff routs
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
app.use(cors());


app.use("/", rootRouter);
app.use(express.json());

// const router = express.Router(); This line creates a router. In this file we don't need to create a router. 
//We just want to send our request to different routes, which we have defined in routs directory. Hence, we will just use those

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
