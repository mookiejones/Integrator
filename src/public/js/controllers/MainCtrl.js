
var _links = ["Applications","Files","OLP","Nerds","Decoders"];

angular.module('MainCtrl', ['ngMaterial']).controller('MainController', function($scope) {
	$scope.menuitems=_links.map(function(link,idx,arr){

		return {title:link,link:link.toLowerCase()};
	});


	$scope.tagline = 'To the moon and back!';	
	$scope.goto=function(){
		debugger;
	}

});