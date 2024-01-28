const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message: 'Token not found'});
    }

    const token = authHeader.split(' ')[1];

    try {  
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded){
            const userId = decoded.userId;
            req.userId = userId;
            // console.log("inside the middleware");
            next();
        }else{
            return res.status(403).json({});    
        }

        next();
    } catch (err) {
        console.log("inside the middleware");
        return res.status(403).json({});

    }
};

module.exports = {
    authMiddleware
}