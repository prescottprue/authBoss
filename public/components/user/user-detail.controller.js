angular.module('authBoss')
.controller('UserDetailController', ['$scope', '$http', '$stateParams', 'userService', 'rolesService', function($scope, $http, $stateParams, userService, rolesService){
		$scope.data = {
			loading:false,
			error:null,
			editing:false
		};
		if($stateParams.id){
			$scope.data.loading = true;
			console.log('userId:', $stateParams.id)
			userService.get($stateParams.id)
			.then(function (userData){
				console.log('User Detail Ctrl: user data loaded:', userData);
				$scope.user = userData;
			}).catch(function (err){
				console.error('User Detail Ctrl: Error loading user with id:' + $stateParams.id, err);
				$scope.data.error = err;
			}).finally(function(){
				$scope.data.loading = false;
			});
		} else {
			console.error('User Detail Ctrl: Invalid user id state param');
			$scope.data.error = 'User Id is required to load user data';
		}
		$scope.getRoles = function(){
			return rolesService.get().then(function(rolesList){
				$scope.rolesList = rolesList;
			});
		};
		$scope.update = function(){
			$scope.data.editing = false;
			$scope.data.loading = true;
			var userData = $scope.user;
			userService.update($stateParams.id, userData)
			.then(function (updatedUserData){
				console.log('User Detail Ctrl: User data loaded:', updatedUserData);
				// $scope.user = apiRes.data;
			}).catch(function (err){
				console.error('Error loading users', err);
				$scope.data.error = err;
			}).finally(function(){
				$scope.data.loading = false;
			});
		};
		
}])