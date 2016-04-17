var Sequelize = require('sequelize');
var db = require('../Modules/Database');

var User = db.define('user', {
  fullName: {
    type: Sequelize.STRING,
    field: 'full_name'
  },
  email: {
    type: Sequelize.STRING(500),
    field: 'email'
  },
  phone: {
    type: Sequelize.STRING(20),
    field: 'phone'
  },
  birthdate: {
    type: Sequelize.DATE(),
    field: 'birthdate'
  },
  password: {
    type: Sequelize.STRING,
    field: 'password'
  },
  buzzword: {
    type: Sequelize.STRING,
    field: 'buzzword'
  },
  lastAddress: {
    type: Sequelize.STRING(1234),
    field: 'last_address'
  }
}, {
  freezeTableName: true
});

module.exports = User;
