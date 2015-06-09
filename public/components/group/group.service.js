angular.module('authBoss')
.factory('groupService', ['$q', '$http', function ($q, $http) {
	var groups = null;
	return {
		update:function(groupId, groupData){
			var deferred = $q.defer();
			console.log('groupService: Updating group with id: ' + groupId, groupData);
			$http.put('/groups/'+ groupId, groupData)
			.then(function (apiRes){
				console.log('groupService: group data loaded:', apiRes.data);
				deferred.resolve(apiRes.data);
			})
			.catch(function (errRes){
				//TODO: Handle different error response codes
				console.error('Error loading group', errRes.data);
				deferred.reject(errRes.data);
			});
			return deferred.promise;
		},
		get:function(groupName){
			var deferred = $q.defer();
			// console.log('Loading group with ID:', groupName);
			var endpointUrl = "/groups";
			var isList = true;
			if(groupName){
				endpointUrl = endpointUrl + "/" + groupName;
				isList = false;
			}
			$http.get(endpointUrl)
			.then(function (apiRes){
				console.log('group data loaded:', apiRes.data);
				if(isList){
					groups = apiRes.data;
				} else {
					//TODO: Update group in list
				}
				deferred.resolve(apiRes.data);
			})
			.catch(function (errRes){
				//TODO: Handle different error response codes
				console.error('Error loading group data', errRes.data);
				deferred.reject(errRes.data);
			});
			return deferred.promise;
		},
		del:function(groupId){
			var deferred = $q.defer();
			// console.log('Loading group with ID:', groupId);
			if(groupId){
				endpointUrl =  "groups/" + groupId;
			}
			$http.delete(endpointUrl)
			.then(function (apiRes){
				console.log('group succesfully deleted:', apiRes.data);
				groups = apiRes.data;
				deferred.resolve(apiRes.data);
			})
			.catch(function (errRes){
				//TODO: Handle different error response codes
				console.error('Error deleting group', errRes.data);
				deferred.reject(errRes.data);
			});
			return deferred.promise;
		}
	};
}])