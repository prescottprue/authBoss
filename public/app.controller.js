angular.module('authBoss')

.controller('RootCtrl', ['$rootScope', '$scope', '$state', '$mdToast', 'AuthService',  function($rootScope, $scope, $state, $mdToast, AuthService){
	$scope.toastPosition = {
    left: false,
    right: true,
    bottom: true,
    top: false
  };
	$scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition).filter(function(pos) { return $scope.toastPosition[pos]; }).join(' ');
  };
  $scope.showToast = function(toastMessage) {
    $mdToast.show(
    	$mdToast.simple().content(toastMessage)
      .position($scope.getToastPosition())
      .hideDelay(3000)
    );
  };
  $scope.logout = function(){
    AuthService.logout().then(function(){
      $scope.showToast("Logout Successful");

    }, function(err){
      console.error('Error logging out:', err);
    });
  };
}])