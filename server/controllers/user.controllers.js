const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {secret} = require('../config/jwt');

module.exports = {
    findAll: (req, res) => {
        User.find()
            .then(allUsers => res.json(allUsers))
            .catch(err => res.status(400).json(err));
    },
    findOne: (req, res) => {
        User.findById(req.params.id)
            .then(oneUser => {
                res.json(oneUser)
            })
            .catch(err => res.status(400).json(err));
    },
// REGISTER ---------------------------------------------
    // Create new User Account
    create: async (req, res) => {
        User.create(req.body)
            .then(user => {
                const payload = {id: user._id};
                const userToken = jwt.sign(payload, process.env.SECRET_KEY);
                res
                    .cookie("usertoken", userToken, {
                        httpOnly: true
                    })
                    .json({ msg: "success!", user: user });
            })
            .catch(err => res.status(400).json(err));
    },
// LOGIN ------------------------------------------------
    login: async (req, res) => {
        // Find by Email to confirm that account exists 
        const user = await User.findOne({ email: req.body.email });
        if (user === null) {
            // if email not found in users collection
            return res.status(400).json({errors: "User/Password invalid"});
        }
        // Compare the inputted password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        // If password was incorrect: 
        if (!correctPassword) {
            return res.status(400).json({errors: "User/Password invalid"});
        }
        // If password was correct: 
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    },
// LOGOUT ------------------------------------------------
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },
    delete : (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err));
    }
}