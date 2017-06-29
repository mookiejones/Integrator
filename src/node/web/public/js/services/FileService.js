// public/js/services/NerdService.js
angular.module('FileService', []).factory('Files', ['$http', function($http) {

    return {

        send:function(fileData){
            return $http.post('/api/files',fileData);
        },
        // call to get all nerds
        get : function() {
            return $http.get('/api/files');
        },

        a:2,


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(fileData) {
            return $http.post('/api/files', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/files/' + id);
        }
    }       

}]);