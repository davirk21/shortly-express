const models = require('../models');
const Promise = require('bluebird');
const session = require('../models/session.js');

var SessionsTable = require('../models/model.js');
SessionsTable = new SessionsTable('sessions');

var UsersTable = require('../models/model.js');
UsersTable = new UsersTable('users');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) { //if no cookies 
    session.create().then(value => {  //creat a session
      SessionsTable.getAll({id: value.insertId}).then(hash => {  //get all session table (value.id is id)
        hash = hash[0].hash;
        req.session = {};
        req.session.hash = hash;
        res.cookies.shortlyid = {};
        res.cookies.shortlyid.value = hash;
        next();
      }).catch(err => {
        console.log('ERROR:', err);
      });
    });
  } else {
    var cookieId = req.cookies.shortlyid;
    SessionsTable.getAll({hash: cookieId}).then((results) => {
      if (results.length > 0) {
        req.session = {};
        req.session.hash = req.cookies.shortlyid;
        var shortlyid = req.cookies.shortlyid;
        var userId = results[0].userId;
        var username;
        UsersTable.getAll({id: userId}).then((results) => {
          username = results[0].username;
          req.session.user = {};
          req.session.user.username = username;
          req.session.userId = userId;
          next();
        }).catch(err => {
          next();
        });
      }
    });
  }
};


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
