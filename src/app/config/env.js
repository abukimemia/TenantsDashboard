const env = {
  database: 'test',
  username: 'postgres',
  password: 'gprs9708', // change to your postgres db password 
  host: 'localhost',
  dialect: 'postgres',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};
 
module.exports = env;
