var express = require('express');
var indexCtrl = require('../controllers/index');
module.exports =  {
	//login(get token)
	//logout (revoke token)
	//signup
	index:[
		{
			type:'GET',
			endpoint:'/',
			controller: indexCtrl.main
		}
	],
	auth:[
		{
			type:'POST',
			endpoint:'/logout'
		}
	],
	user:[
		{
			type:'GET',
			endpoint: '/users'
		}
	]
};
