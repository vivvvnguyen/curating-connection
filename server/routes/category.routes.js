const categoryController = require("../controllers/category.controllers");
const { authenticate } = require('../config/jwt');

module.exports = app => {
    app.get('/api/categories', categoryController.findAll);
    app.post('/api/categories', categoryController.create);
    app.get('/api/categories/:id', categoryController.findOne);
    app.delete('/api/categories/:id', categoryController.delete);
}