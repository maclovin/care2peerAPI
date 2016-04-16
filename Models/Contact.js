var Sequelize = require('sequelize');
var db = require('../Modules/Database');

var User = db.define('contact', {
  owner: {
    type: Sequelize.FLOAT,
    field: 'owner'
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  email: {
    type: Sequelize.STRING(500),
    field: 'email'
  },
  phone: {
    type: Sequelize.FLOAT(15),
    field: 'phone'
  }
}, {
  freezeTableName: true
});

module.exports = User;
