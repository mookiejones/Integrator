// var tfs = require('./src/TFS');
const vm = require('vso-node-api');
const ta = require('vso-node-api').TaskAgentApi;
const ti = require('vso-node-api').TaskAgentInterfaces;


const API_KEY="maso4j4a6lketok2btjklanprnek7ndlcvr4rdu5u2udpbbi73na";
const SERVER_URL="https://kukasim.visualstudio.com";
var authHandler = vm.getPersonalAccessTokenHandler(API_KEY);
console.log(authHandler);
var vsts=new vm.WebApi(SERVER_URL,authHandler);
vsts.connect()
    .then(data=>{
        console.log();

        var api = vsts.getProfileApi(SERVER_URL);
        api.getProfile(data.authenticatedUser.id)
        .then(profile=>{
console.log('');
        })
        .catch(err=>{
            console.log()
        })

        // vsts.getWorkItemTrackingApi
    })
    .catch(err=>{

    });