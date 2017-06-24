// public/js/controllers/MainCtrl.js
angular.module('UserCtrl', ['UserService'])
    .controller('UserController',['$scope',"User", function($scope,User) {

    $scope.tagline = 'Messages go here!';   

    $scope.messages = [];
    $scope.users=[];

   debugger;
 //  
 

}]);