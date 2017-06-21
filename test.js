var api=require('./src/KukaSql')
var test=require('assert')
var ContNum=2;
var CAppNum=2;

console.log('test me');
// api.getControllerNames(function(result){
//     debugger;
// })

api.getControllerNames()
    .then(result =>{
        test.equal(result.length,14);
    });

api.getApplicationNames(ContNum)
    .then(result=>{
   //     debugger;
    })

api.getAppPaths(CAppNum)
    .then(result=>{
        debugger;
    })