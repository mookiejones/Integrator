angular.module('FileService', [])

	// super simple service
	// each function returns a promise object 
	.factory('File', function($http) {

        	return {
			// Controllers
			submitFile:function(info){
                debugger;
				return $http.post('/api/files')
			}
			}
    });


