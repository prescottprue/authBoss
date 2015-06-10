angular.module('authBoss.roles')
.factory('rolesService', ['$q', '$http', '$rootScope', function ($q, $http, $rootScope) {
	var roles = null;
	return {
		update:function(roleName, userData){
			var deferred = $q.defer();
			console.log('UserService: Updating user with id: ' + roleName, userData);
			$http.put('/roles/'+ roleName, userData)
			.then(function (apiRes){
				console.log('UserService: User data loaded:', apiRes.data);
				deferred.resolve(apiRes.data);
			})
			.catch(function (errRes){
				//TODO: Handle different error response codes
				console.error('Error loading user', errRes.data);
				deferred.reject(errRes.data);
			});
			return deferred.promise;
		},
		get:function(roleName){
			var deferred = $q.defer();
			// console.log('Loading user with ID:', roleName);
			var endpointUrl = "/roles";
			var isList = true;
			if(roleName){
				endpointUrl = endpointUrl + "/" + roleName;
				isList = false;
			}
			$http.get(endpointUrl)
			.then(function (apiRes){
				console.log('user data loaded:', apiRes.data);
				if(isList){
					roles = apiRes.data;
				} else {
					//TODO: Update user in list
				}
				deferred.resolve(apiRes.data);
			})
			.catch(function (errRes){
				//TODO: Handle different error response codes
				console.error('Error loading user data', errRes.data);
				deferred.reject(errRes.data);
			});
			return deferred.promise;
		},
		del:function(roleId){
			var deferred = $q.defer();
			// console.log('Loading user with ID:', roleId);
			if(roleId){
				endpointUrl =  "roles/" + roleId;
			}
			$http.delete(endpointUrl)
			.then(function (apiRes){
				console.log('user succesfully deleted:', apiRes.data);
				roles = apiRes.data;
				deferred.resolve(apiRes.data);
			})
			.catch(function (errRes){
				//TODO: Handle different error response codes
				console.error('Error deleting user', errRes.data);
				deferred.reject(errRes.data);
			});
			return deferred.promise;
		}
	};
}])