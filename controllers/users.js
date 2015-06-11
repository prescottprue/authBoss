/**
 * @description User controller functions
 */
var mongoose = require('mongoose');
var url = require('url');
var _ = require('underscore');
var w = require('../lib/mongoPromise');

var User = require('../models/user').User;

/**
 * @api {get} /users Request Users list
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Object} userData Object containing users data.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "title": "Doe",
 *     	 "role":"admin",
 *     }
 *
 * @apiUse UserNotFoundError
 */
exports.get = function(req, res, next){
	var isList = true;
	var query = User.find({}).populate({path:'role', select:'name'});
	if(req.params.id){ //Get data for a specific user
		console.log('user request with id:', req.params.id);
		query = User.findById(req.params.id).populate({path:'role', select:'name'});
		isList = false;
	}
	w.runQuery(query).then(function(userData){
		//Remove sensitiveuser data from user
		if(!isList){
			userData = userData.strip();
		}
		res.send(userData);
	}, function(err){
		res.status(500).send('User(s) Query error:', err);
	});
};
/**
 * @api {post} /users Add a new user
 * @apiName AddUser
 * @apiGroup User
 *
 * @apiParam {String} email Email of user
 * @apiParam {String} password Password of user
 * @apiParam {String} name Name of user
 * @apiParam {String} title Title of user
 * @apiParam {Boolean} tempPassword Whether or not to set a temporary password (Also set if there is no password param)
 *
 * @apiSuccess {Object} userData Object containing newly created users data.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "title": "Doe",
 *     	 "role":"admin",
 *     }
 *
 */
exports.add = function(req, res, next){
	//Query for existing user with same _id
	var query = User.findOne({"email":req.body.email}); // find using email field
	w.runQuery(query).then(function(addedUser){
		var user = new User(req.body);
		user.saveNew().then(function(newUser){
			res.json(newUser);
		}, function(err){
			console.error('error creating new user:', err);
			res.status(500).send('user could not be added');
		});
	}, function(err){
		//next() //Pass error on
		console.error('error creating new user:', err);
		res.status(500).send({message:'User could not be added.'});
	});
};
/**
 * @api {put} /users Update a user
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiParam {String} email Email of user
 * @apiParam {String} password Password of user
 * @apiParam {String} name Name of user
 * @apiParam {String} title Title of user
 * @apiParam {String} role Role of user (admin, user)
 *
 * @apiSuccess {Object} userData Object containing updated users data.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "title": "Doe",
 *     	 "role":"admin",
 *     }
 *
 */
exports.update = function(req, res, next){
	if(req.params.id){
		User.update({_id:req.params.id}, req.body, {upsert:true}, function (err, numberAffected, result) {
			if (err) { return next(err); }
			// if (!result) {
			// 	return next(new Error('user could not be added.'));
			// }
			//TODO: respond with updated data instead of passing through req.body
			res.json(req.body);
		});
	} else {
		res.status(400).send({message:'User id required'});
	}
};
/**
 * @api {delete} /user/:id Delete a user
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {String} email Email of user
 *
 * @apiSuccess {Object} userData Object containing deleted users data.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "title": "Doe",
 *     	 "role":"admin",
 *     }
 *
 */
exports.delete = function(req, res, next){
	var urlParams = url.parse(req.url, true).query;
	var query = User.findOneAndRemove({'_id':req.params.id}); // find and delete using id field
	w.runQuery(query).then(function(){
		res.json(result);
	}, function(err){
		console.error('User could not be deleted:', err);
		res.status(500).send({message:'User cound not be deleted'});
	});
};