var Joi = require('Joi');

var schemas = {
  user: Joi.object().keys({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    birthdate: Joi.date().required(),
    password: Joi.string().required(),
    buzzword: Joi.string().required()
  }),
  contact: Joi.object().keys({
    owner: Joi.number().required(),
    fullName: Joi.string().required(),
    phone: Joi.string().required()
  }),
  testmonial: Joi.object().keys({
    owner: Joi.number().required(),
    testmonial: Joi.string().required(),
    category: Joi.number().required(),
    latLon: Joi.string().required(),
    where: Joi.string().required(),
    when: Joi.date().required()
  })
};

module.exports = schemas;
