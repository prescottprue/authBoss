angular.module('authBoss')
.controller('ApplicationDetailController', ['$scope', '$http', '$stateParams', 'applicationService', function($scope, $http, $stateParams, applicationService){
		$scope.data = {
			loading:false,
			error:null,
			editing:false
		};

		if($stateParams.name){
			$scope.data.loading = true;
			console.log('applicationName:', $stateParams.name)
			applicationService.get($stateParams.name)
			.then(function (applicationData){
				console.log('application Detail Ctrl: application data loaded:', applicationData);
				$scope.application = applicationData;
			}).catch(function (err){
				console.error('application Detail Ctrl: Error loading application with id:' + $stateParams.name, err);
				$scope.data.error = err;
			}).finally(function(){
				$scope.data.loading = false;
			});
		} else {
			console.error('application Detail Ctrl: Invalid application id state param');
			$scope.data.error = 'application Id is required to load application data';
		}

		$scope.update = function(){
			$scope.data.editing = false;
			$scope.data.loading = true;
			applicationService.update($stateParams.name, $scope.application)
			.then(function (updatedapplicationData){
				console.log('application Detail Ctrl: application data loaded:', updatedapplicationData);
				// $scope.application = apiRes.data;
			}).catch(function (err){
				console.error('Error loading applications', err);
				$scope.data.error = err;
			}).finally(function(){
				$scope.data.loading = false;
			});
		};
		
}])