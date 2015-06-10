var Application = require('../models/application').Application;
var mongoose = require('mongoose');
var url = require('url');
var _ = require('underscore');
/**
 * @description Application controller functions
 */
/** Get Ctrl
 * @description Log an existing application in
 * @params {String} email - Email of application
 * @params {String} password - Password of application
 */
exports.get = function(req, res, next){
	var isList = true;
	var query = Application.find({}).populate({path:'owner', select:'name title email'});
	if(req.params.name){ //Get data for a specific application
		console.log('application request with id:', req.params.name);
		query = Application.findOne({name:req.params.name});
		isList = false;
	}
	query.exec(function (err, result){
		if(err) { return next(err);}
		if(!result){
			return next (new Error('Application could not be found'));
		}
		res.send(result);
	});
};

/** Add Ctrl
 * @description Add an application
 * @params {String} name - Name of application
 * @params {String} owner - ID of account that created the application
 */
exports.add = function(req, res, next){
	//Query for existing application with same _id
	console.log('add request with name: ' + req.params.name + ' with body:', req.body);
	var query = Application.findOne({"name":req.params.name}); // find using name field
	query.exec(function (qErr, qResult){
		if (qErr) { return next(qErr); }
		if(qResult){ //Matching application already exists
			return next(new Error('Application with this information already exists.'));
		}
		//application does not already exist
		var application = new Application(req.body);
		Application.save(function (err, result) {
			if (err) { return next(err); }
			if (!result) {
				return next(new Error('application could not be added.'));
			}
			res.json(result);
		});
	});
};
/** Update Ctrl
 * @description Update an application
 * @params {String} name - Name of application
 * @params {String} title - Title of application
 */
exports.update = function(req, res, next){
	console.log('app update request with name: ' + req.params.name + ' with body:', req.body);
	if(req.params.name){
		Application.update({name:req.params.name}, req.body, {upsert:true}, function (err, numberAffected, result) {
			if (err) { return next(err); }
			//TODO: respond with updated data instead of passing through req.body
			res.json(req.body);
		});
	} else {
		res.status(400).send({message:'Application id required'});
	}
};
/** Delete Ctrl
 * @description Delete an application
 * @params {Route Param} id - Id of application
 */
exports.delete = function(req, res, next){
	var urlParams = url.parse(req.url, true).query;
	var query = Application.findOneAndRemove({'name':req.params.name}); // find and delete using id field
	query.exec(function (err, result){
		if (err) { return next(err); }
		if (!result) {
			return next(new Error('Application could not be deleted.'));
		}
		res.json(result);
	});
};