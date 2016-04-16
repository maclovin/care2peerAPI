
var express = require('express');

// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var Joi = require('joi');
var Encrypt = require('./Modules/Encrypt');
var User = require('./Models/User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/user')
  .post(function(req, res) {
    var schema = Joi.object().keys({
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.number().min(8).required(),
      birthdate: Joi.date().required(),
      password: Joi.string().required(),
      buzzword: Joi.string().required()
    });

    Joi.validate({fullname: req.body.fullname, email: req.body.email, phone: req.body.phone, birthdate: req.body.birthdate, password: req.body.password, buzzword: req.body.buzzword}, schema, function(err, value) {
      if (!err) {
        User.sync({force: true}).then(function () {
          return User.create({
            fullName: value.fullname,
            email: value.email,
            phone: value.phone,
            birthdate: value.birthdate,
            password: Encrypt(value.password),
            buzzword: value.buzzword
          });
        });
        res.json({message: 'OK'});
        return;
      }

      res.json({message: err.message});
    });
  });

app.use('/api', router);

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});
