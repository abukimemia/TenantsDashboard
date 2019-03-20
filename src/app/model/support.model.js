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
    }
    
  });

  return Support;
}
