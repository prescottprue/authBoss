var db = require('./../lib/db');
var mongoose = require('mongoose');
var q = require('q');
var RoleSchema = new mongoose.Schema({
	name:{type:String, default:'', unique:true},
	accounts:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
	applications:[{type:mongoose.Schema.Types.ObjectId, ref:'Application'}],
	createdAt: { type: Date, default: Date.now, index: true},
	updatedAt: { type: Date, default: Date.now, index: true}
});
/*
 * Set collection name
 */
RoleSchema.set('collection', 'roles');
/*
 * Setup schema methods
 */
RoleSchema.methods = {
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
	},
	addAccount:function(){
		//TODO: Handle adding an account to the Role
	},

};
/*
 * Construct `Role` model from `UserSchema`
 */
db.authBoss.model('Role', RoleSchema);

/*
 * Make model accessible from controllers
 */
var Role = db.authBoss.model('Role');
Role.collectionName = RoleSchema.get('collection');

exports.Role = db.authBoss.model('Role');