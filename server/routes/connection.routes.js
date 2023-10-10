const connectionController = require("../controllers/connection.controllers");
const { authenticate } = require('../config/jwt');

module.exports = app => {
    app.get('/api/connections', connectionController.findAll);
    app.get('/api/connections/:id',connectionController.findOne);
    app.post('/api/connections', connectionController.create);
    app.delete('/api/connections/:id', connectionController.delete);
    app.patch('/api/connections/:id', connectionController.update);
}