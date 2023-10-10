const Connection = require('../models/connection.model');
const Category = require('../models/category.model');
module.exports = {
// FIND 
    findAll: (req, res) => {
        Connection.find()
            .then(allConnections => res.json(allConnections))
            .catch(err => res.status(400).json(err));
    },
// FIND ONE
    findOne: (req, res) => {
        Connection.findById(req.params.id)
            .then(oneConnection => {
                // if (!oneConnection){
                //     return res.status(404).json({error: "Connection not found"});
                // }
                res.json(oneConnection);
            })
            .catch(err => res.status(400).json(err));
},

// CREATE ---------------------------------------------
    // Create new Connection
    create: (req, res) => {
        Connection.create(req.body)
            .then(connection => {
                const categoryId = req.body.category;
                Category.findById(categoryId)
                .then(category => {
                    category.connections.push(connection._id);
                    category.save()
                        .then(res.json({ msg: "success!", connection: connection}))
                        .catch(err => res.status(400).json(err));
                })
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },

// UPDATE ---------------------------------------------
    update: (req, res) => {
        const connectionId = req.params.id;
        const updatedData = req.body;
        Connection.findById(connectionId)
            .then(originalConnection => {
                // Find original connection to get old category ID
                const originalCategoryId = originalConnection.category;
                // Update Connection with new data
                Connection.findByIdAndUpdate(connectionId, updatedData,{new:true, runValidators:true})
                    .then(updatedConnection => {
                        // If the category ID has changed, update parent categories (array of connections should be updated)
                        if (updatedData.category !== undefined && updatedData.category !== originalCategoryId){
                            Category.findByIdAndUpdate(
                                originalCategoryId, // Old Category
                                {$pull: {connections: updatedConnection._id}},
                                {new: true}
                            ).exec();
                            Category.findByIdAndUpdate(
                                updatedData.category, // New Category
                                {$push: {connections: updatedConnection._id}},
                                {new: true}
                            ).exec();
                        }
                        res.json(updatedConnection);
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },

// DELETE ---------------------------------------------
    delete : (req, res) => {
        Connection.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err));
    }
}