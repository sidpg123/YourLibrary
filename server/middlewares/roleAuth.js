// Assuming you have a User model defined using Mongoose
const { User, Books, BookRequest } = require("../models/db");
// Your middleware function
const roleAuthMiddleware = (requiredRole) => async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let userRole;
        if(user.isLibrarian){
            userRole = 'librarian';
        }else if (user.isAdmin) {
            userRole = 'admin';
        } else {
            userRole = 'user';
        }

        // Assuming your user model has a 'role' property

        // Perform role-based authorization logic here
        if (userRole === requiredRole) {
            next(); // User has the required role, allow access
        } else {
            res.status(403).json({ message: 'Unauthorized access' });
        }
    } catch (error) {
        console.error('Error in roleAuthMiddleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    roleAuthMiddleware
};
