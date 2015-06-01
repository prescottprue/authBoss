var User = require('../models/user').User;
var mongoose = require('mongoose');
var url = require('url');
/**
 * @description User controller functions
 */
/** User Ctrl
 * @description Log an existing user in
 * @params {String} email - Email of user
 * @params {String} password - Password of user
 */
exports.get = function(req, res, next){
	var urlParams = url.parse(req.url, true).query;
	
	if(urlParams.id){ //Get data for a specific user
		var query = User.findOne({});
	} else {
		var query = User.find({});
	}
	query.exec(function (err, result){
		if(err) { return next(err);}
		if(!result){
			return next (new Error('User could not be found'));
		}
		res.send(result);
	});
};

/** Add Ctrl
 * @description Add a user
 * @params {String} email - Email of user
 * @params {String} password - Password of user
 * @params {String} name - Name of user
 * @params {String} title - Title of user

 * @params {Boolean} tempPassword - Whether or not to set a temporary password (Also set if there is no password param)
 */
exports.add = function(req, res, next){
	//Query for existing user with same _id
	var query = User.findOne({"email":req.email}); // find using email field
	query.exec(function (qErr, qResult){
		if (qErr) { return next(qErr); }
		if(qResult){ //Matching user already exists
			return next(new Error('User with this information already exists.'));
		}
		//user does not already exist
		var user = new User(req.body);
		User.save(function (err, result) {
			if (err) { return next(err); }
			if (!result) {

				return next(new Error('user could not be added.'));
			}
			res.json(result);
		});
	});
};
/** Update Ctrl
 * @description Update a user
 * @params {String} email - Email of user
 * @params {String} username - Username of user
 * @params {String} password - Password of user
 * @params {String} name - Name of user
 * @params {String} title - Title of user
 */
exports.update = function(req, res, next){
	User.update({id:req.id}, req.body, {upsert:true}, function (err, numberAffected, result) {
		if (err) { return next(err); }
		if (!result) {

			return next(new Error('user could not be added.'));
		}
		res.json(result);
	});
};
/** Delete Ctrl
 * @description Delete a user
 * @params {String} email - Email of user
 */
exports.delete = function(req, res, next){
	var urlParams = url.parse(req.url, true).query;
	var query = User.findOneAndRemove({'id':urlParams.id}); // find and delete using id field
	query.exec(function (err, result){
		if (err) { return next(err); }
		if (!result) {
			return next(new Error('Translation could not be deleted.'));
		}
		res.json(result);
	});
};