// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        })

        .when('/statistics',{
            templateUrl:'views/statistics.html',
            controller:'MessageController'
        })
        .when('/messages', {
            templateUrl: 'views/messages.html',
            controller: 'MessageController'
        })

        .when('/user',{
            templateUrl:'views/user.html',
            controller:'UserController'
        })
        .when('/robot',{
            templateUrl:'views/robot.html',
            controller:'RobotController'
        })
        .when('/files',{
            templateUrl:'views/files.html',
            controller:'FileController'
        })
        .when('/user/*',{
            templateUrl:'views/user.html',
            controller:'UserController'
        });

   

    $locationProvider.html5Mode(true);

}]);