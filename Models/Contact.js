var Sequelize = require('sequelize');
var db = require('../Modules/Database');

var Contact = db.define('contact', {
  owner: {
    type: Sequelize.INTEGER,
    field: 'owner'
  },
  fullName: {
    type: Sequelize.STRING,
    field: 'full_name'
  },
  phone: {
    type: Sequelize.STRING(20),
    field: 'phone'
  }
}, {
  freezeTableName: true
});

module.exports = Contact;
