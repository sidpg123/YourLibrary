const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const app = express();

// Use middleware to parse the request body before routing
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Use the root router for requests starting with "/api/v1"
app.use("/api/v1", rootRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

