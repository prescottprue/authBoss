var db = require('./../lib/db');
var mongoose = require('mongoose');
var _ = require('underscore');
var sessionCtrls = require('../controllers/session');
var Session = require('./session').Session;
var Q = require('q');
//Schema Object
//collection name
//model name

var UserSchema = new mongoose.Schema(
	{
		name:{type: String, default:''},
		email:{type: String, default:'', index:true},
		title:{type: String, default:''},
		password:{type: String, default:''},
		role:{type: String, default:''},
		sessionId:{type:String},
		createdAt: { type: Date, default: Date.now, index: true},
		updatedAt: { type: Date, default: Date.now, index: true}
	},
	{
		toJSON:{virtuals:true}
	}
);
/*
 * Set collection name to 'user'
 */
UserSchema.set('collection', 'user');


UserSchema.virtual('id')
.get(function (){
	return this._id;
})
.set(function (id){
	return this._id = id;
})
UserSchema.methods = {
	//Remove values that should not be sent
	strip: function(){
		return _.omit(this.toJSON(), ["password", "__v", "_id", '$$hashKey']);
	},
	tokenData: function(){
		var data = _.pick(this.toJSON(), ["email", "role"]);
		data.userId = this.toJSON().id;
		return data;
	},
	startSession: function(){
		//Create new session
		/** New Session Function
		 * @description Create a new session and return a promise
		 * @params {String} email - Email of Session
		 */
		//Session does not already exist
		var deferred = Q.defer();
		var session = new Session({userId:this._id});
		session.save(function (err, result) {
			if (err) { deferred.reject(err); }
			if (!result) {
				deferred.reject(new Error('Session could not be added.'));
			}
			deferred.resolve(result);
		});
		return deferred.promise;
	},
	endSession: function(){
		//Find current session and mark it as ended
		//Set active to false
		console.log('ending session with id:', this.sessionId);
		/** End Session Function
		 * @description Create a new session and return a promise
		 * @params {String} email - Email of Session
		 */
		var deferred = Q.defer();
		//Find session by userId and update with active false
		Session.update({_id:this.sessionId, active:true}, {active:false, endedAt:Date.now()}, {upsert:false}, function (err, affect, result) {
			console.log('session update:', err, affect, result);
			if (err) { deferred.reject(err); }
			if (!result) {
				deferred.reject(new Error('Session could not be added.'));
			}
			if(affect.nModified != 1){
				console.log('Multiple sessions were ended', affect);
			}
			deferred.resolve(result);
		});
		return deferred.promise;
	}
};
UserSchema.methods = {
	//Wrap query in promise
	saveNew:function(){
		var d = q.defer();
		console.log('this:', this);
		this.save(function (err, result){
			if(err) { d.reject(err);}
			if(!result){
				d.reject(new Error('New User could not be saved'));
			}
			d.resolve(result);
		});
		return d.promise;
	}
};
/*
 * Construct `User` model from `UserSchema`
 */
db.authBoss.model('User', UserSchema);
/*
 * Make model accessible from controllers
 */
var User = db.authBoss.model('User');
User.collectionName = UserSchema.get('collection');

exports.User = db.authBoss.model('User');
