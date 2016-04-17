var _config = require('../configuration');
var twilio = require('twilio');
var client = new twilio.RestClient(_config.twilio.sid, _config.twilio.token);

var Sms = function(to, content) {
  to.forEach(function(number) {
    client.sendMessage({
      to: number,
      from: '+19803656573',
      body: content,
    });
  });
};

module.exports = Sms;
