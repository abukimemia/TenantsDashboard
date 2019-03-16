const db = require('../config/db.config.js');
const Customer = db.customers;
const TenantDetails = db.tenant;

// Post a Customer
exports.create = (req, res) => {
  // Save to MySQL database

  var customer;
  Customer.create({
    //customerid: db.sequelize.Utils.generateUUID(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }).then(createdCustomer => {
    // Send created customer to client
    customer = createdCustomer;

    return TenantDetails.create({
      nationalID: req.body.nationalID,
      msisdn: req.body.msisdn,
      date_of_birth: req.body.date_of_birth,
      nationality: req.body.nationality,
      emergencyContact: req.body.emergencyContact,
      postalAddress: req.body.postalAddress,
      rentBalance: req.body.rentBalance,
      House_No: req.body.House_No,
      ApartmentName: req.body.ApartmentName,
      occupation: req.body.occupation,
    })
  }).then(tenant => {
    customer.setAddress(tenant)
    res.send('OK');
  })
};

// FETCH all Customers include Addresses
exports.findAll = (req, res) => {
  Customer.findAll({
    attributes: [
      ['uuid', 'customerId'],
      ['firstname', 'name'], 'age'
    ],
    include: [{
      model: Address,
      where: {
        fk_customerid: db.Sequelize.col('customer.uuid')
      },
      attributes: ['street', 'phone']
    }]
  }).then(customers => {
    res.send(customers);
  });

};
