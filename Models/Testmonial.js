var Sequelize = require('sequelize');
var db = require('../Modules/Database');

var Testmonial = db.define('contact', {
  owner: {
    type: Sequelize.INTEGER,
    field: 'owner'
  },
  content: {
    type: Sequelize.TEXT,
    field: 'content'
  },
  category: {
    type: Sequelize.INTEGER,
    field: 'category'
  },
  where: {
    type: Sequelize.STRING(1234),
    field: 'phone'
  },
  when: {
    type: Sequelize.DATE(),
    field: 'when'
  }
}, {
  freezeTableName: true
});

module.exports = Testmonial;
