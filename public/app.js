angular.module('authBoss', ['ui.router', 'ngMaterial'])
.run(function(){
	console.log('angular is running');
})
.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $stateProvider
    // .state('app', {
    //   templateUrl:relativePath +'layout/layout-main.html'
    // })
    // .state('nav', {
    //   parent:'app',
    //   abstract:true,
    //   views:{
    //     'topnav':{
    //       templateUrl:relativePath +'layout/topnav.html',
    //       controller:'SessionController'
    //     },
    //     'main':{
    //       template:'<div ui-view></div>'
    //     },
    //     'footer':{
    //       templateUrl:relativePath + 'layout/footer.html'
    //     }
    //   }
    // })
    .state('home', {
      // parent:'nav',
      url:'/',
      templateUrl:'home/home-index.html',
      // controller:'HomeController'
    })
    // .state('users', {
    //   parent:'nav',
    //   url:'/users',
    //   templateUrl:relativePath +'components/user/user-list.html',
    //   controller:'UserListController'
    // })
    // .state('user', {
    //   parent:'nav',
    //   url:'/user/:id',
    //   authorizedRoles:[USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user],
    //   templateUrl:relativePath +'components/user/user-detail.html',
    //   controller:'UserDetailController'
    // })
    // .state('signup', {
    //   parent:'nav',
    //   url:'/signup',
    //   templateUrl:relativePath +'components/user/user-signup.html',
    //   controller:'SessionController'
    // })
    // .state('login', {
    //   parent:'nav',
    //   url:'/login',
    //   templateUrl:relativePath +'components/user/user-login.html',
    //   controller:'SessionController'
    // })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('grey')
  $mdThemingProvider.theme('docs-dark', 'default').dark();
});