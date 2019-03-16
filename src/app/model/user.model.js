module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, // Use UUIDV1 or UUIDV4 to make sequelize generate the ids automatically
      primaryKey: true
    },
    firstname: {
      type: Sequelize.STRING
		},
		lastname: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
}
