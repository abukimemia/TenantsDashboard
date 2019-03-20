const db = require('../config/db.config.js');
const Support = db.support;
const User = db.user;
const Tenant = db.tenant;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Save to PostgreSQL database
  Support.create({
    "tckPriority": req.body.tckPriority,
    "tckStatus": req.body.tckStatus,
    "description": req.body.description,
    "fk_uuid": req.body.fk_uuid,
    "fk_tenantId": req.body.fk_tenantId
  }).then(support => {
    // Send created data to client
    res.json(support);
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
};

// FETCH All Supports
/* exports.findAll = (req, res) => {
  User.findAll({
    attributes: [
      ['uuid', 'UserId'], 'firstname', 'lastname', 'email'
    ],
    include: [{
      model: Support,
      where: {
        // fk_uuid: db.Sequelize.col('users.uuid') <--THIS IS WHAT WAS CAUSING THE SEQUELIZE DATABASE ERROR-->
      },
      attributes: ['tckPriority', 'tckStatus', 'description', 'createdAt']
    }],
    include: [{
      model: Tenant,
      where: {
        fk_uuid: req.userId
      },
      attributes: ['contact', 'House_No', 'ApartmentName']
    }],
  }).then(supports => {
    // Send All Supports to Client
    res.json(supports.sort(function (c1, c2) {
      return c1.id - c2.id
    }));
  }).catch(err => {
    console.log(err);
    res.status(500).send('Internal Server Error');
  });
}; */

exports.findAll = (req, res) => {
  Support.findAll({
    attributes: ['tckPriority', 'tckStatus', 'description', 'createdAt'],
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

exports.findAllPerUser = (req, res) => {
  Support.findAll({
    where: {
      fk_uuid: req.userId
    },
    attributes: ['tckPriority', 'tckStatus', 'description', 'createdAt'],
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
