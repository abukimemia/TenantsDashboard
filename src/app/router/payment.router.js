'use strict';
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {
 
    const payment = require('../controller/payment.controller.js');

    app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		next();
	});
 
    // Create a new payment
    app.post('/api/payment', payment.create);
 
    // Retrieve all payments 
    app.get('/api/payment', payment.findAll);

    // Retrieve all payments per user
    app.get('/api/user/payment', [authJwt.verifyToken], payment.findAllPerUser);

}