'use strict';
module.exports = function(app) {
 
    const support = require('../controller/support.controller.js');
 
    // Create a new support
    app.post('/api/supports', support.create);
 
    // Retrieve all supports
    app.get('/api/supports', support.findAll);

}