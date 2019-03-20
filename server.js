const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const cors = require('cors')
const corsOptions = {
  origin: ['http://localhost:4206', 'http://localhost:4200'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
 
require('./src/app/router/router.js')(app);
require('./src/app/router/support.router.js')(app);
require('./src/app/router/payment.router')(app);

const db = require('./src/app/config/db.config.js');

const Role = db.role;
  
// force: true will drop the table if it already exists
/* db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
}); */
 
// Create a Server
var server = app.listen(8000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})


function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});
	
	Role.create({
		id: 2,
		name: "ADMIN"
	});
	
	Role.create({
		id: 3,
		name: "PM"
	});
}