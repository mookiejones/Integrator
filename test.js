const test=require('assert');
const fpt = require ('./out/src/node/FanucProcess/test')

const assist = require('./out/src/node/Assistant/Assistant');
const fs = require('fs');

let file = './src/Connections.json';
 var text=fs.readFileSync(file);
 console.log(text);
var token = JSON.parse(text).assistant_client_token;

var a = new assist.Assistant(token);

test.equal('failed','failed')

// var api=require('./src/KukaSql')
// var test=require('assert')
// var ContNum=2;
// var CAppNum=2;

// console.log('test me');
// // api.getControllerNames(function(result){
// //     debugger;
// // })

// api.getControllerNames()
//     .then(result =>{
//         test.equal(result.length,14);
//     });

// api.getApplicationNames(ContNum)
//     .then(result=>{
//    //     debugger;
//     })

// api.getAppPaths(CAppNum)
//     .then(result=>{
//         debugger;
//     })