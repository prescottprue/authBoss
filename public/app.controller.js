angular.module('authBoss')

.controller('RootCtrl', ['$scope', '$mdToast', function($scope, $mdToast){
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
}])