module.exports = {
	vendor:[
		'/bower/angular/angular.js',
		'/bower/angular-animate/angular-animate.min.js',
		'/bower/angular-aria/angular-aria.min.js',
		'/bower/ui-router/release/angular-ui-router.min.js',
		'/bower/angular-material/angular-material.min.js',
		'/bower/ngstorage/ngStorage.min.js',
		'/bower/angular-jwt/dist/angular-jwt.min.js',
		'/bower/underscore/underscore-min.js'

	],
	app:[
		'/app.js',
		'/app.controller.js',

		'/components/auth/auth.module.js',
		'/components/auth/auth.service.js',
		'/components/auth/auth.config.js',
		'/components/auth/auth.directive.js',
		'/components/auth/auth-session.service.js',

		'/user/user.service.js',
		'/user/user-list.controller.js',
		'/user/user-detail.controller.js',

		'/application/application.service.js',
		'/application/application-list.controller.js',
		'/application/application-detail.controller.js',

		'/roles/roles.module.js',
		'/roles/roles.service.js',
		'/roles/roles.controller.js',
		'/roles/role.controller.js',

		'/account/account.controller.js'
	]
}