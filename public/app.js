angular.module('authBoss', ['ui.router', 'ngMaterial', 'ngStorage', 'angular-jwt', 'authBoss.auth'])
.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, USER_ROLES) {
  $stateProvider
    .state('app', {
      templateUrl:'layout/layout-main.html'
    })
    .state('nav', {
      parent:'app',
      abstract:true,
      views:{
        'topnav':{
          templateUrl:'layout/topnav.html',
          // controller:'SessionController'
        },
        'main':{
          template:'<div ui-view></div>'
        }
      }
    })
    .state('home', {
      parent:'nav',
      url:'/',
      templateUrl:'components/home/home-index.html',
      // controller:'HomeController'
    })
    .state('users', {
      parent:'nav',
      url:'/users',
      templateUrl:'components/user/user-list.html',
      controller:'UserListController'
    })
    .state('user', {
      parent:'nav',
      url:'/user/:id',
      // authorizedRoles:[USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.user],
      templateUrl:'components/user/user-detail.html',
      controller:'UserDetailController'
    })
    .state('signup', {
      parent:'nav',
      url:'/signup',
      templateUrl:'components/account/account-signup.html',
      controller:'AccountController'
    })
    .state('login', {
      parent:'nav',
      url:'/login',
      templateUrl:'components/account/account-login.html',
      controller:'AccountController'
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('grey')
  $mdThemingProvider.theme('docs-dark', 'default').dark();
});