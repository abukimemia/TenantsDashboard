module.exports = (sequelize, Sequelize) => {
  const Support = sequelize.define('support', {
    tckPriority: {
      type: Sequelize.STRING
    },
    tckStatus: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    ApartmentName: {
      type: Sequelize.STRING
    },
    House_No: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    }
  });

  return Support;
}
