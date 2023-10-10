const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Connection',
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);