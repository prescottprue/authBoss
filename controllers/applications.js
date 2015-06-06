var User = require('../models/user').User;
var Application = require('../models/application').Application;

var mongoose = require('mongoose');
var url = require('url');
var _ = require('underscore');
/**
 * @description User controller functions
 */
/** User Ctrl
 * @description Log an existing user in
 * @params {String} email - Email of user
 * @params {String} password - Password of user
 */
exports.get = function(req, res, next){
	var isList = true;
	var query = Application.find({}).populate({path:'owner', select:'name title email'});
	if(req.params.id){ //Get data for a specific user
		console.log('user request with id:', req.params.id);
		query = User.findById(req.params.id);
		isList = false;
	}
	query.exec(function (err, result){
		if(err) { return next(err);}
		if(!result){
			return next (new Error('User could not be found'));
		}
		var resData = result;
		if(!isList){
			resData = result.strip();
		}
		res.send(resData);
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
	var query = Application.findOne({"name":req.name}); // find using email field
	query.exec(function (qErr, qResult){
		if (qErr) { return next(qErr); }
		if(qResult){ //Matching user already exists
			return next(new Error('User with this information already exists.'));
		}
		//user does not already exist
		var user = new User(req.body);
		Application.save(function (err, result) {
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
	if(req.params.id){
		Application.update({_id:req.params.id}, req.body, {upsert:true}, function (err, numberAffected, result) {
			if (err) { return next(err); }
			// if (!result) {
			// 	return next(new Error('user could not be added.'));
			// }
			//TODO: respond with updated data instead of passing through req.body
			res.json(req.body);
		});
	} else {
		res.status(400).send({message:'Application id required'});
	}
};
/** Delete Ctrl
 * @description Delete a user
 * @params {String} email - Email of user
 */
exports.delete = function(req, res, next){
	var urlParams = url.parse(req.url, true).query;
	var query = Application.findOneAndRemove({'_id':req.params.id}); // find and delete using id field
	query.exec(function (err, result){
		if (err) { return next(err); }
		if (!result) {
			return next(new Error('Application could not be deleted.'));
		}
		res.json(result);
	});
};