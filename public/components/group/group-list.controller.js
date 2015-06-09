angular.module('authBoss')
.controller('GroupListController', ['$scope', '$http', 'groupService', function($scope, $http, groupService){
		$scope.data = {
			loading:true,
			error:null
		};
		console.log('groupListController');
		groupService.get().then(function (groupsList){
			$scope.data.loading = false;
			console.log('groups list loaded:', groupsList);
			$scope.groups = groupsList;
		}, function (err){
			console.error('Error loading groups', err);
			$scope.data.loading = false;
			$scope.data.error = err;
		});
		$scope.delete = function(ind){
			$scope.data.loading = true;
			var groupId = $scope.groups[ind]._id;
			console.log('calling delete with id:', groupId);
			groupService.delete(groupId).then(function(response){
				console.log('group deleted successfully');
			}, function(err){
				console.error('Error loading groups', err);
				$scope.data.loading = false;
				$scope.data.error = err;
			});
		};
}])