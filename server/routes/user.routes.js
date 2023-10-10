const userController = require("../controllers/user.controllers");
const { authenticate } = require('../config/jwt');

module.exports = app => {
    app.post('/api/register', userController.create);
    app.post('/api/login', userController.login);
    // issue with authenticate (postman: "verified: false")
    app.get('/api/users', 
    // authenticate, 
    userController.findAll);
    app.get('/api/users/:id', userController.findOne);
    app.delete('/api/users/:id', userController.delete);
    app.post('/api/logout', userController.logout);
}