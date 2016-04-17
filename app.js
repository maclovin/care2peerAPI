
var express = require('express');
var session = require('express-session');
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var sqlinjection = require('sql-injection');
var Joi = require('joi');
var Encrypt = require('./Modules/Encrypt');
var Schemas = require('./Modules/Schemas');
var User = require('./Models/User');
var Contact = require('./Models/Contact');
var Testmonial = require('./Models/Testmonial');

app.use(session({secret: 'bololoHahaBololoHahahaha'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sess = {
  userId: null,
  email: null
};

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/user')
  .post(function(req, res) {
    Joi.validate({fullname: req.body.fullname, email: req.body.email, phone: req.body.phone, birthdate: req.body.birthdate, password: req.body.password, buzzword: req.body.buzzword}, Schemas.user, function(err, value) {
      if (!err) {
        User.create({
          fullName: value.fullname,
          email: value.email,
          phone: value.phone,
          birthdate: value.birthdate,
          password: Encrypt(value.password),
          buzzword: value.buzzword
        });

        res.json({message: 'OK'});
        return;
      }

      res.json({message: err.message});
    });
  })
  .put(function(req, res) {
    Joi.validate({fullname: req.body.fullname, email: req.body.email, phone: req.body.phone, birthdate: req.body.birthdate, password: req.body.password, buzzword: req.body.buzzword}, Schemas.user, function(err, value) {
      if (!err && sess.userId) {
        User.update({
          fullName: value.fullname,
          email: value.email,
          phone: value.phone,
          birthdate: value.birthdate,
          password: Encrypt(value.password),
          buzzword: value.buzzword
        }, {
          fields: ['fullname', 'email', 'phone', 'birthdate', 'password', 'buzzword'],
          where: {id: sess.userId}
        });

        res.json({message: 'OK'});
        return;
      }

      res.json({message: err.message});
    });
  })
  .get(function(req, res) {
    if (sess.userId && sess.email) {
      User.findOne({where: {id: sess.userId}}).then(function(currentUser) {
        res.json({message: 'OK',
          data: {
            fullName: currentUser.fullname,
            email: currentUser.email,
            phone: currentUser.phone,
            birthdate: currentUser.birthdate,
            buzzword: currentUser.buzzword,
            lastAddress: currentUser.lastAddress
          }
        });
      });
      return;
    }

    res.json({message: 'Not logged in'});
  });

router.route('/contact')
  .post(function(req,res) {
    Joi.validate({owner: sess.userId, fullName: req.body.fullName, phone: req.body.phone}, Schemas.contact, function(err, value) {
      if (!err) {
        Contact.create({
          owner: value.owner,
          fullName: value.fullName,
          phone: value.phone
        });

        res.json({message: 'OK'});
        return;
      }

      res.json({message: err.message});
    });
  })
  .put(function(req, res) {
    Joi.validate({owner: sess.userId, fullName: req.body.fullName, phone: req.body.phone}, Schemas.contact, function(err, value) {
      if (!err && sess.userId) {
        Contact.update({
          owner: value.owner,
          fullName: value.fullName,
          phone: value.phone
        }, {
          fields: ['owner', 'fullName', 'phone'],
          where: {id: req.body.id}
        });

        res.json({message: 'OK'});
        return;
      }

      res.json({message: err.message});
    });
  })
  .delete(function(req, res) {
    if (req.body.id) {
      Contact.findOne({where: {id: req.body.id }}).then(function(currentContact) {
        res.json({message: 'OK'});
        if (currentContact.owner == sess.userId) {
          currentContact.destroy();
        }
      });
      return;
    } else {
      res.json({message: 'Impossible'});
    }
  })
  .get(function(req, res) {
    if (req.body.id) {
      Contact.findOne({where: {id: req.body.id}}).then(function(currentContact) {
        if (currentContact.owner == sess.userId) {
          res.json({message: 'OK',
            data: {
              id: currentContact.id,
              fullName: currentContact.fullName,
              phone: currentContact.phone
            }
          });
        }
        return;
      });
    } else {
      res.json({message: 'Not exist'});
    }
  });

router.route('/contacts')
  .get(function(req,res) {
    if (sess.userId) {
      Contact.findAll({where: {owner: sess.userId}}).then(function(contacts) {
        console.log(contacts);
        res.json({message: 'OK',
          data: contacts
        })
      });
    } else {
      res.json({message: 'Not logged'});
    }
  });

router.route('/help')
  .get(function(req,res) {
    res.json({message: 'OK'});
  });

router.route('/login')
  .post(function(req, res) {

    if (req.body.email && req.body.password) {
      User.findOne({where: {email: req.body.email, password: Encrypt(req.body.password)}}).then(function(currentUser) {
        if (currentUser) {
          sess = req.session;
          sess.email = currentUser.email;
          sess.userId = currentUser.id;
          res.json({message: 'Logged In'});
          return;
        }

        res.json({message: 'Not logged In'});
      });
    }

  });

router.route('/logout')
  .get(function(req, res) {
      sess.email = null;
      sess.userId = null;
      res.json({message: 'BYE'});
  });

app.use('/api', router);

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});
