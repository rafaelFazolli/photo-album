const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');

const authMiddlewatre = require('./middlewares/auth');

routes.post('/register', UserController.register);
routes.post('/login', UserController.login);

routes.use(authMiddlewatre);
routes.get('/test', ProjectController.testToken);

module.exports = routes;