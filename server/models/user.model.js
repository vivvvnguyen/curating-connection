const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;

const UserSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, "Must enter a first name."],
        minLength: [2, "User first name must contain at least 2 characters."]
    },
    lastName: { 
        type: String, 
        required: [true, "Must enter a last name."],
        minLength: [2, "User last name must contain at least 2 characters."]
    },
    email: {
        type: String,
        required: [true, "Must enter a valid email."],
        // Need email format validator
        match: [emailRegex, "Please enter a valid email address"],
            // 2nd Method: Validate email format 
            // validate: {
            //     validator: val => emailRegex.test(val),
            //     message: "Please enter a valid email address."
            // },
        // Check for unique email
        validate: [
            {
                validator: async function(val){
                    // Check if email exists in database
                    const user = await mongoose.model('User').findOne({email: val});
                    // If user is found, then return false because an email is already in use
                    if (user !== null){
                        return false
                    }
                },
                message: "This email is already in use."
            }
        ]
    },
    password: {
        type: String,
        required: [true, "Must enter a password."],
        minLength: [8, "Password must contain at least 8 characters."]
        // Need to hash password when storing
    },
}, { timestamps: true });

// Create virtual object for confirmPW since we don't want to save it into the database
UserSchema.virtual('confirmPW')
    .get(function (){
        return this._confirmPW;
        // _ denotes virtual field
    })
    .set(function(value) {
        this._confirmPW = value;
    });

// Check for matching passwords (use Middleware to add another validation)
UserSchema.pre('validate', function(next){
    // "pre" hook to run before validations
    // console.log(password);
    // console.log(this.confirmPW);
    if (this.password !== this.confirmPW){
        this.invalidate('confirmPW', "Passwords must match!")
    }
    next(); // when middleware has finished, call next() to have next middleware/next function(the validations) run
});

// Hashing Password with Bcrypt before saving/storing data
UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10) // 10 = number of salt rounds
        .then(hash => {
            this.password = hash;
            next();
        })
})

// i think this is in the wrong place/file
// function isEmailUnique(email){
//     const exisitingUser = User.findOneByEmail({email});
//     console.log(exisitingUser);
//     if(exisitingUser != null){
//         return false;
//     }else{
//         return true;
//     }
// }

// const User = mongoose.model('User', UserSchema);

// module.exports = {User, isEmailUnique};

module.exports = mongoose.model('User', UserSchema);