const env = require('../config/env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tenant = require('../model/tenant.model')(sequelize, Sequelize);
db.support = require('../model/support.model.js')(sequelize, Sequelize);
db.payments = require('../model/payment.model')(sequelize, Sequelize);

db.user = require('../model/user.model')(sequelize, Sequelize);
db.role = require('../model/role.model')(sequelize, Sequelize);

// Many-to-Many relationship (N:M)
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

// One-to-One relationship (1:1)
db.tenant.belongsTo(db.user, {foreignKey: 'fk_uuid', targetKey: 'uuid'});
db.user.hasOne(db.tenant, {foreignKey: 'fk_uuid', targetKey: 'uuid'});

// One-to-Many relationship (1:M)
db.user.hasMany(db.support, {foreignKey: 'fk_uuid', sourceKey: 'uuid'});
db.support.belongsTo(db.user, {foreignKey: 'fk_uuid', targetKey: 'uuid'});
db.support.belongsTo(db.tenant, {foreignKey: 'fk_tenantId', targetKey: 'id'});

// One-to-Many relationship (1:M)
db.user.hasMany(db.payments, {foreignKey: 'fk_uuid', sourceKey: 'uuid'});
db.payments.belongsTo(db.user, {foreignKey: 'fk_uuid', targetKey: 'uuid'});
db.payments.belongsTo(db.tenant, {foreignKey: 'fk_tenantId', targetKey: 'id'});

// db.address.belongsTo(db.customers, {foreignKey: 'fk_customerid', targetKey: 'uuid'});
// db.customers.hasOne(db.address, {foreignKey: 'fk_customerid', targetKey: 'uuid'});

// Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'});
// City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode'});

// Company.hasMany(Product, {foreignKey: 'fk_companyid', sourceKey: 'uuid'});
// Product.belongsTo(Company, {foreignKey: 'fk_companyid', targetKey: 'uuid'});



module.exports = db;