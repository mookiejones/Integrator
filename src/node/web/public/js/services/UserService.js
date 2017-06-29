// public/js/services/NerdService.js


angular.module('UserService', []).factory('User',  function($q,$http) {
    var getDeferred=function(path){
        var deferred = $q.defer(),
        httpPromise=$http.get(path)
            .then(function(result){
                deferred.resolve(result);
            })
            .catch(function(error){
                console.error('Error: '+error);
            });
            return deferred.promise;
    }

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/messages');
        },

        // getUsers:function(){
        //       var deferred = $q.defer(),
        //         httpPromise=
        // },

      

        getUsers:function(){
            return getDeferred('/api/messageUsers');
        },

        getMessages:function(){
            return getDeferred('/api/messages');
            
        },

        getUserMessages(id){
            console.log('getting info for '+ id);
            return getDeferred('/users/'+ id );
        },



                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/messages', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            var path = '/api/messages/'+ id;
            console.log('deleting path: ' + path);
            return $http.delete(path);
        }
    }       

});