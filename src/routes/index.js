const  routes = require('express').Router();

routes.use('/api/auth', require('./auth.routes'));
routes.use('/api/mascotas', require('./mascotas.routes'));

module.exports = routes;