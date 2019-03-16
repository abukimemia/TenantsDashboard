'use strict';

module.exports = (sequelize, Sequelize) => {
  const Tenant = sequelize.define('tenant', {
    SSN: {
      type: Sequelize.STRING
    },
    nationality: {
      type: Sequelize.STRING
    },
    occupation: {
      type: Sequelize.STRING
    },
    birthDate: {
      type: Sequelize.DATE
    },
    contact: {
      type: Sequelize.STRING
    },
    emergencyContact: {
      type: Sequelize.STRING
    },
    postalAddress: {
      type: Sequelize.STRING
    },
    House_No: {
      type: Sequelize.STRING
    },
    ApartmentName: {
      type: Sequelize.STRING
    },
    rentBalance: {
      type: Sequelize.INTEGER
    },
  });

  return Tenant;
}
