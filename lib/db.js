// database handler
var conf = require('../config/default');
var mongoose = require('mongoose');

var authBoss = mongoose.createConnection(conf.config.db.url + conf.config.db.name.authBoss);
authBoss.on('error',function (err) {
	console.error('Mongoose error');
});
authBoss.on('connected', function () {
	console.error('Connected to DB');

});
authBoss.on('disconnected', function () {
	console.error('Disconnected from DB');
});

exports.authBoss = authBoss;


