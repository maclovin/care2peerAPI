var crypto = require('crypto');

var Encrypt = function(content) {
  var hash =  crypto.createHash("md5").update(content).digest('hex');
  return hash;
};

module.exports = Encrypt;
