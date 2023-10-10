const Category = require('../models/category.model');
module.exports = {
// FIND ALL ---------------------------------------------
    findAll: (req, res) => {
        Category.find()
            .populate('connections') // populate the 'connections' field with actual Connection objects
            .then(allCategories => res.json(allCategories))
            .catch(err => res.status(400).json(err));
    },
// FIND ONE ---------------------------------------------
    findOne: (req, res) => {
        const categoryId = req.params.id;
        Category.findById(categoryId)
            .then(category => {
                if (!category){
                    return res.status(404).json({error: "Category not found"});
                }
                res.json({category});
            })
            .catch(err => res.status(400).json(err));
    },
// CREATE ---------------------------------------------
    // Create new Category
    create: (req, res) => {
        Category.create(req.body)
            .then(category => {
                res.json({ msg: "success!", category: category});
            })
            .catch(err => res.status(400).json(err));
    },

// DELETE ---------------------------------------------
    delete : (req, res) => {
        Category.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err));
    }
}