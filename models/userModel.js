const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Should have atleast 3 characters!'],
    },
    email: {
        type: String,
        required: [true, 'Phone number is required'],
        lowercase: true,
        validate: {
            validator: function (v) {
                return v.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
            },
            message: 'Invalid Email Address!'
        }
    },
    mobile: {
        type: Number,
        required: [true, 'User phone number required']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        validate: {
            validator: function (v) {
                return v.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            },
            message: 'Password should be minimum 8 characters long must contain Uppercase, Lowercase, Numbers and Special Character'
        }
    }

})

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        console.log(error)
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;