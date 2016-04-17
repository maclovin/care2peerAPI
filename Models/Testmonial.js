var Sequelize = require('sequelize');
var db = require('../Modules/Database');

var Testmonial = db.define('testmonial', {
  owner: {
    type: Sequelize.INTEGER,
    field: 'owner'
  },
  testmonial: {
    type: Sequelize.TEXT,
    field: 'testmonial'
  },
  category: {
    type: Sequelize.INTEGER,
    field: 'category'
  },
  latLon: {
    type: Sequelize.STRING(500),
    field: 'latLon'
  },
  where: {
    type: Sequelize.STRING(1234),
    field: 'where'
  },
  when: {
    type: Sequelize.DATE(),
    field: 'when'
  }
}, {
  freezeTableName: true
});

module.exports = Testmonial;
