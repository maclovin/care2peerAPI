var Sequelize = require('sequelize');
var _config = require('../configuration.js');

var sequelize = new Sequelize(_config.mysql.database, _config.mysql.user, _config.mysql.password, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
