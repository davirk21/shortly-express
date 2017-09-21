const models = require('../models');
const Promise = require('bluebird');
const session = require('../models/session.js');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    req.session = {hash: 1};
    console.log('REQ SESH:', req.session);
    session.create();
    next();
  } else {
    next();
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

