angular.module('authBoss')
.controller('GroupDetailController', ['$scope', '$http', '$stateParams', 'groupService', function($scope, $http, $stateParams, groupService){
		$scope.data = {
			loading:false,
			error:null,
			editing:false
		};

		if($stateParams.name){
			$scope.data.loading = true;
			console.log('groupName:', $stateParams.name)
			groupService.get($stateParams.name)
			.then(function (groupData){
				console.log('group Detail Ctrl: group data loaded:', groupData);
				$scope.group = groupData;
			}).catch(function (err){
				console.error('group Detail Ctrl: Error loading group with id:' + $stateParams.id, err);
				$scope.data.error = err;
			}).finally(function(){
				$scope.data.loading = false;
			});
		} else {
			console.error('group Detail Ctrl: Invalid group id state param');
			$scope.data.error = 'group Id is required to load group data';
		}

		$scope.update = function(){
			$scope.data.editing = false;
			$scope.data.loading = true;
			groupService.update($stateParams.name, $scope.group)
			.then(function (updatedgroupData){
				console.log('group Detail Ctrl: group data loaded:', updatedgroupData);
				// $scope.group = apiRes.data;
			}).catch(function (err){
				console.error('Error loading groups', err);
				$scope.data.error = err;
			}).finally(function(){
				$scope.data.loading = false;
			});
		};
		
}])