angular.module('DataCtrl', []).controller('DataController', function($scope,$http,Data) {
	$scope.controllers=[];
	$scope.applications=[];

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
	$scope.selectedTemplate = function(pTemplate) {
		//Your logic
		alert('Template Url is : '+pTemplate);
	}
	

	$scope.controllerChanged=function(){
		var id = this.selectedController.ContNum;
		Data.getApplications(id)
			.then(function(data){		
				$scope.applications=data.data;
			})
			.catch(function(data){
				console.log('error '+data);
			});					
	}

	$scope.applicationChanged=function(){
		if(!this.selectedApplication)
			{
				$scope.appPaths=[];
				return;
			}
		var id = this.selectedApplication.CAppNum;
		Data.getAppPaths(id)
			.then(function(data){
				$scope.appPaths=data.data
			});
	}

		Data.getControllers()
			.then(function(data){		
				$scope.controllers=data.data;
			})
			.catch(function(data){
				console.log('error '+data);
			});

});