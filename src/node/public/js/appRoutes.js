angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/decoders', {
			templateUrl: 'views/decoders.html',
			controller: 'NerdController'
		})
		.when('/olp', {
			templateUrl: 'views/olp.html',
			controller: 'NerdController'
		})
		
		.when('/applications', {
			templateUrl: 'views/applications.html',
			controller: 'DataController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		});

	$locationProvider.html5Mode(true);

}]);