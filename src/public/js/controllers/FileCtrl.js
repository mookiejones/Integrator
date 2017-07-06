
var files =function(){
	var result=[];
	for(var i=0;i<15;i++){
		result.push({name:"file"+i,enabled:true});
	}
	return result;
}
angular.module('FileCtrl', ['ngMaterial'])

.controller('FileController', function($scope,$timeout, $mdDialog,$mdToast) {
	$scope.filename="";
	$scope.files=files();

	var imagePath = 'img/list/60.jpeg';
	
	$scope.tagline = 'Nothing beats a pocket protector!';

	$scope.cancel=function(){
		$mdDialog.cancel();
	}
	$scope.showAdvanced = function(ev) {
		 $mdDialog.show({
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
	};
	$scope.fileSelected=function(file){
		this.selectedFile=file;
	}
	$scope.showToast=function(){
		$mdToast.show($mdToast.simple().textContent('Hello!'));
    // Could also do $mdToast.showSimple('Hello');
	}

	$scope.addFile=function(){
		debugger;
		for(var i=0;i<this.files.length,i++;)
			if(this.files[i]==this.selectedFile.name)
				return;

		var newvalue={name:this.selectedFile.name,enabled:true};

		this.files.push(newvalue);
		this.selectedFile=newvalue;
		
		this.filename=null;

	}

function DialogController($scope, $mdDialog,$mdToast) {

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
}).directive('apsUploadFile', apsUploadFile);

function apsUploadFile() {
  var directive = {
    restrict: 'E',
	template:function(elem,attr){

		var result='<input id="fileInput" type="file" class="ng-hide"';
		if (attr.accept)
			result+=' accept="'+attr.accept+'"';
		result+='>';
		result+=' <md-button id="uploadButton" class="md-raised md-primary" aria-label="attach_file">    Choose file </md-button><md-input-container  md-no-float>    <input id="textInput" ng-model="fileName" type="text" placeholder="No file chosen" ng-readonly="true"></md-input-container>';
		return result;

	},
//    template: '<input id="fileInput" type="file" class="ng-hide"> <md-button id="uploadButton" class="md-raised md-primary" aria-label="attach_file">    Choose file </md-button><md-input-container  md-no-float>    <input id="textInput" ng-model="fileName" type="text" placeholder="No file chosen" ng-readonly="true"></md-input-container>',
    link: apsUploadFileLink
  };
  return directive;
}

function apsUploadFileLink(scope, element, attrs) {
	var el = element[0];

  var input = $(element[0].querySelector('#fileInput'));
  var button = $(element[0].querySelector('#uploadButton'));
  var textInput = $(element[0].querySelector('#textInput'));

  if (input.length && button.length && textInput.length) {
    button.click(function(e) {
      input.click();
    });
    textInput.click(function(e) {
      input.click();
    });
  }

  input.on('change', function(e) {
    var files = e.target.files;
    if (files[0]) {
      scope.fileName = files[0].name;
    } else {
      scope.fileName = null;
    }
    scope.$apply();
  });
  
}