angular.module('authBoss.auth')
.service('Session', ['$sessionStorage', '$rootScope','jwtHelper',  function ($sessionStorage, $rootScope, jwtHelper) {
  this.exists = function(){
    return angular.isDefined($sessionStorage.token);
  };
  this.getRole = function(){
    if(this.role) return this.role.name; //Not available if refresh has occured
    if(this.exists()){
      return jwtHelper.decodeToken($sessionStorage.token).role;
    } else {
      return "guest";
    }
  }
  this.token = function(){
    return angular.isDefined($sessionStorage.token) ? $sessionStorage.token : null;
  };
  this.create = function (token) {
    console.log('Session Service: New session started.', $sessionStorage);
    $sessionStorage.token = token;
    this.tokenData = jwtHelper.decodeToken(token);
    this.role = this.tokenData.role;
    console.log('role set:', this.role);
    // this.id = sessionId;
  };
  this.destroy = function () {
    //TODO: Revoke token on server?
    $rootScope.currentUser = null;
    this.tokenData = null;
    this.role = "guest";
    delete $sessionStorage.token;
    // this.id = null;
  };
}]);