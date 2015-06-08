var User = require('../models/user').User;
var Session = require('../models/session').Session;

var mongoose = require('mongoose');
var url = require('url');
var jwt = require('jsonwebtoken');
var _ = require('underscore');
var bcrypt = require('bcrypt');

var config = require('../config/default').config;

/**
 * @description Authentication controller functions
 */
/** Login Ctrl
 * @description Log an existing user in
 * @params {String} email - Email of user
 * @params {String} password - Password of user
 */
exports.login = function(req, res, next){
	console.log('[AuthCtrl.login] Login request with :', req.body);
	var query = User.findOne({email:req.body.email});
	//TODO:Create a new session
	query.exec(function (err, result){
		if(err) { console.error('login error:', err);
			return next(err);}
		if(!result){
			console.error('user not found');
			return next (new Error('User could not be found'));
		}
		var currentUser = result;
		//Check password against db
		console.log('[AuthCtrl.login] User found:', currentUser);
		bcrypt.compare(req.body.password, currentUser.password, function(err, passwordsMatch){
			console.log("[AuthCtrl.login] Compare returned:", passwordsMatch);
			if(err){return next(err);}
			if(!passwordsMatch){
				return next (new Error('Invalid authentication credentials'));
			}
			currentUser.startSession().then(function (session){
				//Encode a JWT with user info
				var tokenData = currentUser.tokenData();
				tokenData.sessionId = session._id;
				var token = jwt.sign(tokenData, config.jwtSecret);
				res.send({token:token, user:result.strip()});
			}, function(err){
				console.error('error creating session');
				return next (new Error('Invalid authentication credentials'))
			});

			//TODO: Add session info to token
		});
	});
};

// start session and create token with userData/session info
// function startSession(userData){

// 	var token = jwt.sign(userData, config.jwtSecret, {expiresInMinutes:10080});//Expire in 7 days

// }
/** Signup Ctrl
 * @description Allow new user to signup
 * @params {String} name - Name of new user
 * @params {String} email - Email of new user
 * @params {String} password - Password of new user
 */
exports.signup = function(req, res, next){
	//TODO:Check that user doesn't already exist
	//TODO:Create a new user with provided info
	// TODO: Start a session with new user
	// TODO: Handle no email provided
	console.log('Signup request with :', req.body);
	var query = User.findOne({"email":req.body.email}); // find using email field
	query.exec(function (qErr, qResult){
		if (qErr) { return next(qErr); }
		if(qResult){ //Matching user already exists
			// TODO: Respond with a specific error code
			return next(new Error('User with this information already exists.'));
		}
		//user does not already exist
		//Build user data from request
		var userData = _.pick(req.body, ["_id", "email", "name", "role", "title", "createdAt"]);
		//Encrypt password
		bcrypt.genSalt(10, function(err, salt) {
		  bcrypt.hash(req.body.password, salt, function(err, hash) {
				//Add hash to userData
				userData.password = hash;
				var user = new User(userData);
				user.save(function (err, result) {
					if (err) { 
						console.error('error creating user:', err);
						return next(err); }
					if (!result) {
						return next(new Error('user could not be added.'));
					}
					res.json(result);
				});
			});
		});
	});
};

/** Logout Ctrl
 * @description Log a current user out and invalidate token
 * @params {String} email - Email of user
 */
exports.logout = function(req, res, next){
	//TODO:Invalidate token
	var user = new User(req.user);
	console.log('ending users session:', user);
	user.endSession().then(function(){
		console.log('successfully ended session');
		res.status(200).send({message:'Logout Successful'});
	}, function(){
		console.log('Error ending session');
		res.send({message:'Error ending session'});
	});
};

/** Verify Ctrl
 * @description Verify that a token is valid and return user data
 * @params {String} email - Email of user
 */
exports.verify = function(req, res, next){
	//TODO:Return user info
	console.log('verify request:', req.user);
	var query = User.findById(req.user.userId);
	query.exec(function (err, result){
		console.log('verify returned:', result, err);
		if (err) { return next(err); }
		if(!result){ //Matching user already exists
			// TODO: Respond with a specific error code
			return next(new Error('User with this information does not exist.'));
		}

		res.json(result);
	});
};