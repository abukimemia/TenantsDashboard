'use strict';
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {
 
    const support = require('../controller/support.controller.js');

    app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});
 
    // Create a new support
    app.post('/api/supports', support.create);
 
    // Retrieve all supports
    app.get('/api/supports', support.findAll);

    // Retrieve all supports for individual user
    app.get('/api/user/supports', [authJwt.verifyToken], support.findAllPerUser);
}