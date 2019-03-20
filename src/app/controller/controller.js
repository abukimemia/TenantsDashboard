const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
const Role = db.role;
const Tenant = db.tenant;
// const uuid = require('uuidv4');

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// Post a User
exports.signup = (req, res) => {
  // Save User to Database
  console.log("<------------Processing func -> SignUp--------------->");

  var user;
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(createdUser => {
    Role.findAll({
      where: {
        name: {
          [Op.or]: req.body.roles
        }
      }
    }).then(roles => {
      createdUser.setRoles(roles)
    }).catch(err => {
      res.status(500).send({
        reason: err.message
      });
    });

    // Send created user to client
    user = createdUser;

    return Tenant.create({
      SSN: req.body.SSN,
      nationality: req.body.nationality,
      birthDate: req.body.birthDate,
      occupation: req.body.occupation,
      contact: req.body.contact,
      emergencyContact: req.body.emergencyContact,
      postalAddress: req.body.postalAddress,
      House_No: req.body.House_No,
      ApartmentName: req.body.ApartmentName,
      rentBalance: req.body.rentBalance
    })
  }).then(tenant => {
    user.setTenant(tenant)
    res.send({
      message: 'User registered successfully!'
    });
  }).catch(err => {
    res.status(500).send({
      reason: err.message
    });
  })
};

exports.signin = (req, res) => {
  console.log("<--------------Sign-In------------->");

  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({
        reason: 'User Not Found.'
      });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        accessToken: null,
        reason: 'Invalid Password!'
      });
    }

    let token = jwt.sign({
      id: user.uuid
    }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    let authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push('ROLE_' + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        auth: true,
        accessToken: token,
        username: user.username,
        authorities: authorities
      });
    })
  }).catch(err => {
    res.status(500).send({
      reason: err.message
    });
  });
}

exports.userContent = (req, res) => {
  User.findOne({
    where: {
      uuid: req.userId
    },
    attributes: ['uuid', 'firstname', 'lastname', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }],
    include: [{
      model: Tenant,
      where: {
       // fk_uuid: db.Sequelize.col('users.uuid')
      },
      attributes: [ ['id', 'tenantId'], 'SSN', 'nationality', 'birthDate', 'occupation', 'contact', 'emergencyContact', 'postalAddress', 'House_No', 'ApartmentName', 'rentBalance'
      ]
    }]
  }).then(user => {
    res.status(200).send({
      'description': 'User Content Page',
      'user': user
    });
  }).catch(err => {
    res.status(500).send({
      'description': 'Can not access User Page',
      'error': err
    });
  })
}

// FETCH all Users include TenantInfo
exports.findAll = (req, res) => {
  User.findAll({
    attributes: [
      ['uuid', 'UserId'], 'firstname', 'lastname'
    ],
    include: [{
      model: Tenant,
      where: {
        // fk_uuid: db.Sequelize.col('users.uuid')
      },
      attributes: [['id', 'tenantId'], 'SSN', 'nationality', 'birthDate', 'occupation', 'contact', 'emergencyContact', 'postalAddress', 'House_No', 'ApartmentName', 'rentBalance']
    }]
  }).then(customers => {
    res.status(200).send(customers);
  }).catch(err => {
    res.status(500).send({
      'description': 'Can not access users',
      'error': err
    });
  })
}

exports.adminBoard = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    },
    attributes: ['firstname', 'lastname', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).send({
      'description': 'Admin Board',
      'user': user
    });
  }).catch(err => {
    res.status(500).send({
      'description': 'Can not access Admin Board',
      'error': err
    });
  })
}

exports.managementBoard = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    },
    attributes: ['firstname', 'lastname', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).send({
      'description': 'Project Management Board',
      'user': user
    });
  }).catch(err => {
    res.status(500).send({
      'description': 'Can not access Management Board',
      'error': err
    });
  })
}
