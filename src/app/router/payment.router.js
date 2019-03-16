'use strict';
module.exports = function(app) {
 
    const payment = require('../controller/payment.controller.js');
 
    // Create a new support
    app.post('/api/payment', payment.create);
 
    // Retrieve all supports
    app.get('/api/payment', payment.findAll);

}