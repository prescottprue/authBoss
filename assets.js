module.exports = {
	vendor:[
		'/lib/angular/angular.js',
		'/lib/angular-animate/angular-animate.min.js',
		'/lib/angular-aria/angular-aria.min.js',
		'/lib/ui-router/release/angular-ui-router.min.js',
		'/lib/angular-material/angular-material.min.js',
		'/lib/ngstorage/ngStorage.min.js',
		'/lib/angular-jwt/dist/angular-jwt.min.js',
		'/lib/underscore/underscore-min.js'

	],
	app:[
		'/app.js',
		'/app.controller.js',

		'/shared/auth/auth.module.js',
		'/shared/auth/auth.service.js',
		'/shared/auth/auth.config.js',
		'/shared/auth/auth.directive.js',
		'/shared/auth/auth-session.service.js',

		'/components/user/user.service.js',
		'/components/user/user-list.controller.js',
		'/components/user/user-detail.controller.js',

		'/components/application/application.service.js',
		'/components/application/application-list.controller.js',
		'/components/application/application-detail.controller.js',

		'/components/roles/roles.module.js',
		'/components/roles/roles.service.js',
		'/components/roles/roles.controller.js',
		'/components/roles/role.controller.js',

		'/components/account/account.controller.js'
	]
}