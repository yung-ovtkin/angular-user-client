const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

// Hash Password before saving
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// sign access token
userSchema.methods.SignAccessToken = function () {
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN, {
        expiresIn: process.env.TOKEN_EXPIRE,
    });
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;