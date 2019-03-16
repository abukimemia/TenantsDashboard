const db = require('../config/db.config.js');
const Payment = db.payments;

exports.create = (req, res) => {
  // Save to PostgreSQL database
  Payment.create({
    "id": req.body.id,
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "middle_name": req.body.middle_name,
    "payment_method": req.body.payment_method,
    "status": req.body.status,
    "create_time": req.body.create_time,
    "currency": req.body.currency,
    "total": req.body.total
  }).then(data => {
    // Send created data to client
    res.json(data);
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
};

// FETCH All Supports
exports.findAll = (req, res) => {
  Payment.findAll().then(data => {
    // Send All Supports to Client
    res.json(data.sort(function (c1, c2) {
      return c1.id - c2.id
    }));
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
};
