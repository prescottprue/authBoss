var db = require('./../lib/db');
var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
	_id: {type: mongoose.Schema.Types.ObjectId, index:true},
	userId:{type: mongoose.Schema.Types.ObjectId},
	active:{type: Boolean, default:true},
	createdAt: { type: Date, default: Date.now, index: true},
	endedAt: { type: Date, default: Date.now, index: true},
	updatedAt: { type: Date, default: Date.now, index: true}
});

SessionSchema.set('collection', 'session');
/*
 * Construct `User` model from `UserSchema`
 */
db.authBoss.model('Session', SessionSchema);

/*
 * Make model accessible from controllers
 */
var Session = db.authBoss.model('Session');
User.collectionName = SessionSchema.get('collection');

exports.Session = db.authBoss.model('Session');