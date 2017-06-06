
const api=require('./api')



api.getApplicationNames(2)
    .then(result=>{
        debugger;
    })

/*
var rp = new RobotProgramming();
rp.getControllerNames()
.then(function(result){
        console.log(result);
    })
    .catch(function(err){
        console.log(err);
    });
*/