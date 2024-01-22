const mongoose = require('mongoose');
// const zod = require('zod');

require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    isAdmin: {
        type:Boolean , 
        default:false
    },
    isLibrarian: {
        type:Boolean, 
        default:false
    },
    issuedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    }]
})

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
});
  
// Pre-save middleware to update isAvailable based on count
bookSchema.pre('save', function (next) {
    this.isAvailable = this.count > 0;
    next();
});


const bookRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    },
    status: { 
        type: String, default: 'Pending' 
    },
})

const Books = mongoose.model("Books", bookSchema);
const User = mongoose.model("User", userSchema);

const BookRequest  = mongoose.model("BookRequest", bookRequestSchema);

module.exports = {
    User,
    Books,
    BookRequest
}
