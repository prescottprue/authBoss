var express = require('express');
var indexCtrls = require('../controllers/index');
var authCtrls = require('../controllers/auth');
var usersCtrls = require('../controllers/users');


module.exports =  {
	//login(get token)
	//logout (revoke token)
	//signup
	index:[
		{
			type:'GET',
			endpoint:'/',
			controller: indexCtrls.main
		}
	],
	auth:[
		{
			type:'POST',
			endpoint:'/logout',
			controller: authCtrls.logout
		},
		{
			type:'POST',
			endpoint:'/signup',
			controller: authCtrls.signup
		},
		{
			type:'PUT',
			endpoint:'/login',
			controller: authCtrls.login
		}
	],
	users:[
		{
			type:'GET',
			endpoint: '/users'
		}
	]
};
