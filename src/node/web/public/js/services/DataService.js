angular.module('DataService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Data', function($http) {
		return {
			// Controllers
			getControllers:function(){
				return $http.get('/api/controllers')
			},



			create : function(todoData) {
				return $http.post('/api/controllers', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/controllers/' + id);
			},


			// Applications
			getApplications:function(id){
				return $http.get('/api/applications?id='+id);
			},

			getAppPaths:function(id){
				return $http.get('/api/apppaths?id='+id);
			}
			
		}
	});
