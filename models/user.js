var db = require('./../lib/db');
var mongoose = require('mongoose');
var _ = require('underscore');
var sessionCtrls = require('../controllers/session');
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
		return sessionCtrls.startSession(this._id);
	},
	endSession: function(){
		//Find current session and mark it as ended
		//Set active to false
		console.log('ending session with id:', this.sessionId);
		return sessionCtrls.endSession(this.sessionId);
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