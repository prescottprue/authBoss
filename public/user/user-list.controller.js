angular.module('authBoss')
.controller('UserListController', ['$scope', '$http', 'userService', 'USER_ROLES', function($scope, $http, userService, USER_ROLES){
		$scope.data = {
			loading:true,
			error:null
		};
		$scope.rolesWithDelete = [USER_ROLES.admin, USER_ROLES.user];
		userService.get().then(function (usersList){
			$scope.data.loading = false;
			console.log('users list loaded:', usersList);
			$scope.users = usersList;
		}, function (err){
			console.error('Error loading users', err);
			$scope.data.loading = false;
			$scope.data.error = err;
		});
		$scope.delete = function(ind){
			$scope.data.loading = true;
			var userId = $scope.users[ind]._id;
			console.log('calling delete with id:', userId);
			userService.delete(userId).then(function(response){
				console.log('user deleted successfully');
			}, function(err){
				console.error('Error loading users', err);
				$scope.data.loading = false;
				$scope.data.error = err;
			});
		};
}])