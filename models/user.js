var db = require('./../lib/db');
var mongoose = require('mongoose');
//Schema Object
//collection name
//model name

var UserSchema = new mongoose.Schema({
	name:{type: String, default:''},
	email:{type: String, default:''},
	title:{type: String, default:''},
	password:{type: String, default:''},
	role:{type: String, default:''},
	createdAt: { type: Date, default: Date.now, index: true},
	updatedAt: { type: Date, default: Date.now, index: true}
});
/*
 * Set collection name to 'user'
 */
UserSchema.set('collection', 'user');
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