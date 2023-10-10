const mongoose = require('mongoose');
const ConnectionSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, "Must enter a first name."],
        minLength: [2, "First name must contain at least 2 characters."]
    },
    lastName: { 
        type: String, 
        required: [true, "Must enter a last name."],
        minLength: [2, "Last name must contain at least 2 characters."]
    },
    birthday: {
        type: String,
        validate: {
            validator: function(date) {
                return /^\d{4}-\d{2}-\d{2}$/.test(date);
            },
            message: "Please enter correct format 'yyyy-MM-DD'"
        }
    },
    contactInfo:{
        type: String,
    },
    allergies: {
        type: String,
    },
    // profilePic: {
    //     // File upload
    // },
    giftIdeas: {
        type: String,
    },
    notes: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required:[true],
        default: null,
        validate: {
            validator: function(value) {
                return value !== null;
            }, 
            message: "Please select a Category for your connection."
        }
    }
}, { timestamps: true });

// ConnectionSchema.pre('save', function(next){
//     if(this.category === null){
//         const err = new Error("Please select a category for your connection.");
//         next(err);
//     }else{
//         next();
//     }
// });

module.exports = mongoose.model('Connection', ConnectionSchema);