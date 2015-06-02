angular.module('authBoss')
.factory('userService', ['$q', '$http', '$rootScope','$sessionStorage', function ($q, $http, $rootScope, $sessionStorage) {
	var users = null;
	return {
		update:function(userId, userData){
			var deferred = $q.defer();
			console.log('UserService: Updating user with id: ' + userId, userData);
			$http.put('/user/'+ userId, userData)
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
		get:function(userId){
			var deferred = $q.defer();
			// console.log('Loading user with ID:', userId);
			var endpointUrl = "/users";
			var isList = true;
			if(userId){
				endpointUrl = endpointUrl + "/" + userId;
				isList = false;
			}
			$http.get(endpointUrl)
			.then(function (apiRes){
				console.log('user data loaded:', apiRes.data);
				if(isList){
					users = apiRes.data;
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
		del:function(userId){
			var deferred = $q.defer();
			// console.log('Loading user with ID:', userId);
			if(userId){
				endpointUrl =  "users/" + userId;
			}
			$http.delete(endpointUrl)
			.then(function (apiRes){
				console.log('user succesfully deleted:', apiRes.data);
				users = apiRes.data;
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