var db = require('./../lib/db');
var mongoose = require('mongoose');
var _ = require('underscore');
//Schema Object
//collection name
//model name

var UserSchema = new mongoose.Schema({
	name:{type: String, default:''},
	email:{type: String, default:'', index:true},
	title:{type: String, default:''},
	password:{type: String, default:''},
	role:{type: String, default:''},
	createdAt: { type: Date, default: Date.now, index: true},
	updatedAt: { type: Date, default: Date.now, index: true}
},
{
	toJSON:{virtuals:true}
});
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
	strip: function(){
		return _.omit(this.toJSON(), ["password", "__v", "_id"]);
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