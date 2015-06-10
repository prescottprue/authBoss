angular.module('authBoss.roles')
.controller('RoleController', ['$scope', '$stateParams', 'rolesService', function($scope, $stateParams, rolesService){
		$scope.data = {
			loading:false,
			error:null,
			editing:false
		};

		if($stateParams.name){
			$scope.data.loading = true;
			console.log('role name:', $stateParams.name)
			rolesService.get($stateParams.name)
			.then(function (userData){
				console.log('User Detail Ctrl: user data loaded:', userData);
				$scope.user = userData;
			}).catch(function (err){
				console.error('User Detail Ctrl: Error loading user with id:' + $stateParams.name, err);
				$scope.data.error = err;
			}).finally(function(){
				$scope.data.loading = false;
			});
		} else {
			console.error('User Detail Ctrl: Invalid user id state param');
			$scope.data.error = 'User Id is required to load user data';
		}

		$scope.update = function(){
			$scope.data.editing = false;
			$scope.data.loading = true;
			rolesService.update($stateParams.name, $scope.user)
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