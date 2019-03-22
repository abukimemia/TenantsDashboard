module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define('payments', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      payment_method: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.INTEGER
      },
      // Timestamps
      create_time: Sequelize.DATE,
    });
  
    return Payment;
  }