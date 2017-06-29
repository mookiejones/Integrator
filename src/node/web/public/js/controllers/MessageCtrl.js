// public/js/controllers/MainCtrl.js

var software=[];
var softwareCount=[];
var timeline_data=[];
var timeline_labels=[];

var options = {
      animation: {
        duration: 0
      },
      elements: {
        line: {
          borderWidth: 0.5
        },
        point: {
          radius: 0
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }],
        gridLines: {
          display: false
        }
      },
      tooltips: {
        enabled: false
      }
    };
angular.module('MessageCtrl', ['MessageService',"chart.js"]).controller('MessageController',['$scope',"Messages","$interval", function($scope,Messages,$interval) {

    $scope.tagline = 'Messages go here!';   

    $scope.messages = [];

    $scope.timeline_data=[];
    $scope.timeline_labels=[];
    $scope.users=[];
    $scope.labels = [];
    $scope.data=[];
 
    $scope.statistics=[];
    $scope.options = options;
   
   $scope.userClicked=function(evt,args){
     evt.preventDefault();
     var text=evt.target.innerText;   
     var name=text.substring(0,text.indexOf(" "));
     getUserInfo(name);
   }
    $scope.software=software;
    $scope.softwareCount=softwareCount;

      $interval(function () {
      getLiveChartData();
       }, 40);





    function getUserInfo(name){
     
      Messages.getUserMessages(name)
        .then(function(data){
          if(data.status==200){
            data.data.forEach(function(doc){
              software.push(doc._id);
              softwareCount.push(doc.count);
            });
          }
          
        })
        .catch(function(err){
          debugger;

        });

    }

    function getLiveChartData () {
        $scope.timeline=timeline_data;
        $scope.software=software;
        $scope.softwareCount=softwareCount;
    }
  $scope.onClick = function (points, evt) {
    // alert("points: "+points+" event "+ evt);

  };


  $scope.pieClick=function(points,evt){
    var pt = points[0];
    var lbl=points[0]._model.label;
    software=[];
    softwareCount=[];

   
      getUserInfo(lbl);
   
  }
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        } 
      ]
    }
  };

   $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

   $scope.doughnutOverride = {
    hoverBackgroundColor: ['#45b7cd', '#ff6384', '#ff8e72'],
    hoverBorderColor: ['#45b7cd', '#ff6384', '#ff8e72']
  };
    $scope.mixedOverride=[
              {
                label:"Bar Chart",
                borderWidth:1,
                type:'bar'
              },{
                  label:'Line Chart',
                  borderWidth:3,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      type: 'line'
              }
            ];
    Messages.getTimeline()
      .then(function(items){
        var data =items.data;
        
        items.data.forEach(function(item){
            $scope.timeline_labels.push(item._id);
//            $scope.data.push(item.items);
            timeline_data.push(item.items);
        });
      })
      .catch(function(error){

      });
    Messages.userCount()
      .then(function(items){
        var data = items.data;
        items.data.forEach(function(item){          
          $scope.labels.push(item._id);
          $scope.data.push(item.count);
          software.push(item._id);
          softwareCount.push(item.count);
        });
 
        console.log('got user items');
      })
      .catch(function(err){
        console.log('error');
      });
    var getUsers= function(){
    	Messages.getUsers().then(function(results){
    	var users = [];
    	results.data.forEach(function(user){	    	 
	    		users.push(user);
	    	});
    	$scope.users=users;
    });
    }

    var getMessages= function(){
    	 Messages.getMessages()
			.then(function(messages){
				var items = [];
				messages.data.forEach(function(message){
					items.push(message);
				});

				$scope.messages=items;
			})
			.catch(function(error){
				console.error(error);
			});
    }

    var getStatistics=function(){
      Messages.getStatistics()
        .then(function(statistics){
          var items=[];
          statistics.data.forEach(function(statistic){
            items.push(item);
          });
          $scope.statistics=items;
        })
        .catch(function(error){
          console.error(error);
        });
    }
    var refresh = function(){
    	getUsers();
    	getMessages();
      getStatistics();

    }

    $scope.deleteMessage = function(e,s){
  
    	var id = e.srcElement.id;
    	 
    	Messages.delete(id)
    	.then(function(result){
    		var idx = -1;
    		for(var i=0;i<$scope.messages.length;i++){
    			if($scope.messages[i]._id==id){
    				idx=i;
    				break;
    			}
    		}
    		console.log('removing item '+ idx );
    		$scope.messages.splice(idx,1);
    		console.log(result);
    	});
    };

    $scope.refresh = refresh;
  	refresh();
 

}]);