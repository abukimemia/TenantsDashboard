const db = require('../config/db.config.js');
const Support = db.support;
const User = db.user;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Save to PostgreSQL database
  Support.create({
    "tckPriority": req.body.tckPriority,
    "tckStatus": req.body.tckStatus,
    "phone": req.body.phone,
    "description": req.body.description,
    "ApartmentName": req.body.ApartmentName,
    "House_No": req.body.House_No,
    "fk_uuid": req.body.fk_uuid
  }).then(support => {
    // Send created data to client
    res.json(support);
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
};

// FETCH All Supports
exports.findAll = (req, res) => {
  User.findAll({
    attributes: [
      ['uuid', 'UserId'], 'lastname', 'email'
    ],
    include: [{
      model: Support,
      where: {
       // fk_uuid: db.Sequelize.col('users.uuid') <--THIS IS WHAT WAS CAUSING THE SEQUELIZE DATABASE ERROR-->
      },
      attributes: ['tckPriority', 'description', 'ApartmentName', 'phone', 'createdAt']
    }]
  }).then(supports => {
    // Send All Supports to Client
    res.json(supports.sort(function (c1, c2) {
      return c1.id - c2.id
    }));
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
};
