const models = require('../models');
const Promise = require('bluebird');
const session = require('../models/session.js');
var Sessions = require('../models/model.js');
Sessions = new Sessions('sessions');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    session.create().then(value => {
      Sessions.getAll({id: value.insertId}).then(hash => {
        req.session = {};
        req.session.hash = hash[0].hash;
        next();
      });
    });
  } else {
    next();
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

