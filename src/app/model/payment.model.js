module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define('payments', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true

      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      middle_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_method: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      currency: {
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