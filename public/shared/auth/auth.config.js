angular.module('authBoss.auth')
//Enable Auth Interceptor
.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})
//Stop route changes that are not authorized and emit auth events
.run(function ($rootScope, AUTH_EVENTS, AuthService) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if(next.authorizedRoles){
      var authorizedRoles = next.authorizedRoles;
        if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (AuthService.isAuthenticated()) {
          // user is not allowed
          console.info('user not allowed');
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          // user is not logged in
          console.info('user not logged in');
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }
    }
  });
})
//Intercept $http requests and responses
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS, Session) {
  return {
    //Set auth header on request if it is available
    request: function (config) {
    	//Only if session exists or it is an outward request (not a template request)
      if (Session.exists() && config.url.splice("/")[0] == "http:") {
        config.headers.Authorization = "Bearer " + Session.token();
        config.cache = true;
        console.log("token["+Session.token()+"], config.headers: ", config.headers);
      }
      return config || $q.when(config);
    },
    //Broadcast auth error events
    responseError: function (response) { 
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  };
})