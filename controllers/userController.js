const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        console.log('inside try')
        const { name, email, mobile, password } = req.body;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            console.log('inside if, user already exist')
            return res.status(400).json({
                message: 'user already exist! Please login',
                error: true
            })
        } else {
            const user = await User.create({ name, email, mobile, password })
            if (user) {
                console.log('inside then')
                return res.status(200).json({
                    message: "User Created Successfully",
                    data: user,
                    error: null,
                })
            } else {
                console.log('inside catch')
                return res.status(400).json({
                    message: 'Something went wrong',
                    error: err,
                })
            }
        }
    } catch (error) {
        console.log('inside try catch')
        return res.status(401).json({
            message: 'Some error occured',
            error: error,
        })
    }
}


const loginAuth = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const match = await bcrypt.compare(password, user.password);

        if (user && match) {
            return res.status(200).json({
                message: 'Logged in successfully',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                },
                error: null
            })
        } else {
            return res.status(400).json({
                message: 'User not found or password is incorrect',
                error: true,
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Something went wrong',
            error: error,
        })
    }
}

module.exports = { registerUser, loginAuth };
