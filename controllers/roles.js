/** Roles Ctrl
 * @description Handler functions for roles routes
 */

var mongoose = require('mongoose');
var url = require('url');
var _ = require('underscore');

var Role = require('../models/role').Role;

/** Get Roles list
 * @description Log an existing Role in
 * @params {String} email - Email of Role
 * @params {String} password - Password of Role
 */
exports.getList = function(req, res, next){
	var query = Role.find({}).populate({path:"accounts", select:"username"});
	query.exec(function (err, result){
		if(err) { return next(err);}
		if(!result){
			return next (new Error('Role could not be found'));
		}
		res.send(result);
	});
};
/** Get Role
 * @description Get a specific role's data based on name
 * @params {String} email - Email of Role
 * @params {String} password - Password of Role
 */
exports.get = function(req, res, next){
	console.log('roles get request:', req.params.name, req.body);
	if(req.params.name){ //Get data for a specific Role
		console.log('Role request:', req.params.name);
		var query = Role.findOne({name:req.params.name}).populate('accounts');
	}
	query.exec(function (err, result){
		if(err) { return next(err);}
		if(!result){
			return next (new Error('Role could not be found'));
		}
		var role = result;
		role.findAccounts().then(function(roleAccounts){
			res.send(result);
		}, function(err){
			res.status(500).send('Error finding accounts for roles');
		});
	});
};

/** Add Role
 * @description Add a new Role
 * @params {String} name - Name of Role 'Required'
 * @params {Array|String} accounts - Array or list of accounts to add to this role
 */
exports.add = function(req, res, next){
	//Role does not already exist
	console.log('role request with:', req.body);
	if(req.body && _.has(req.body, "name")){
		//TODO: Handle array of accounts
		var query = Role.findOne({"name":req.body.name}); // find using email field
		query.exec(function (err, role){
			if(err) { return next(err);}
			if(role){
				res.status(400).send('A role with this name already exists');
			} else {
				var role = new Role(req.body);
				console.log('before saveNew:', role);
				role.saveNew().then(function(newRole){
					res.json(newRole);
				}, function(err){
					res.status(500).send('New role could not be added:', err);
				});
			}
		});
	} else {
		res.status(500).send('Role name required');
	}
};
/** Update Ctrl
 * @description Update a Role
 * @params {String} name - Name of Role
 * @params {Array|String} accounts - Accounts with this role
 */
exports.update = function(req, res, next){
	Role.update({_id:req.id}, req.body, {upsert:true}, function (err, numberAffected, result) {
		if (err) { return next(err); }
		if (!result) {
			return next(new Error('Role could not be added.'));
		}
		res.json(result);
	});
};
/** Delete Ctrl
 * @description Delete a Role
 * @params {String} email - Email of Role
 */
exports.delete = function(req, res, next){
	var urlParams = url.parse(req.url, true).query;
	var query = Role.findOneAndRemove({'_id':req.params.id}); // find and delete using id field
	query.exec(function (err, result){
		if (err) { return next(err); }
		if (!result) {
			return next(new Error('Translation could not be deleted.'));
		}
		res.json(result);
	});
};
