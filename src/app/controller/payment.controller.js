const db = require('../config/db.config.js');
const Payment = db.payments;
const User = db.user;
const Tenant = db.tenant;

exports.create = (req, res) => {
  // Save to PostgreSQL database
  Payment.create({
    "id": req.body.id,
    "payment_method": req.body.payment_method,
    "state": req.body.state,
    "total": req.body.total,
    "create_time": req.body.create_time,
    "fk_uuid": req.body.fk_uuid,
    "fk_tenantId": req.body.fk_tenantId
  }).then(data => {
    // Send created data to client
    res.json(data);
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
};

// FETCH All Payments
exports.findAll = (req, res) => {
  Payment.findAll({
    attributes: ['id', 'payment_method', 'state', 'total', 'create_time'],
    include: [{
      model: Tenant,
      where: {
        // uuid: db.Sequelize.col('support.fk_uuid')
      },
      attributes: ['contact', 'House_No', 'ApartmentName'],
      include: [{
        model: User,
        where: {
          // fk_uuid: req.userId
        },
        attributes: ['firstname', 'lastname']
      }]
    }],
  }).then(payments => {
    // Send All Payments to Client
    res.json(payments.sort(function (c1, c2) {
      return c1.id - c2.id
    }));
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
};

// FETCH payments for user
exports.findAllPerUser = (req, res) => {
  Payment.findAll({
    where: {
      fk_uuid: req.userId
    },
    attributes: ['id', 'payment_method', 'state', 'total', 'create_time'],
    include: [{
      model: Tenant,
      where: {
        // uuid: db.Sequelize.col('support.fk_uuid')
      },
      attributes: ['contact', 'House_No', 'ApartmentName'],
      include: [{
        model: User,
        where: {
          // fk_uuid: req.userId
        },
        attributes: ['firstname', 'lastname']
      }]
    }],
  }).then(payments => {
    // Send All Payments for user to Client
    res.json(payments.sort(function (c1, c2) {
      return c1.id - c2.id
    }));
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
};

