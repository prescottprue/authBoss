var express = require('express');
var indexCtrls = require('../controllers/index');
var authCtrls = require('../controllers/auth');
var userCtrls = require('../controllers/users');


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
			endpoint: '/user',
			controller:authCtrls.verify
		},
		{
			type:'GET',
			endpoint: '/users',
			controller:userCtrls.get
		},
		{
			type:'GET',
			endpoint: '/users/:id',
			controller:userCtrls.get
		},
		{
			type:'POST',
			endpoint: '/users',
			controller:userCtrls.add
		},
		{
			type:'PUT',
			endpoint: '/users',
			controller:userCtrls.update
		},
		{
			type:'DELETE',
			endpoint: '/users/:id',
			controller:userCtrls['delete']
		}
	]
};
