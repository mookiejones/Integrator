
let vs=require('vsts-api');
let rp=require('request-promise');
let btoa=require('btoa');
let common=require('./common');
let tfs=require('./tfs');
const API_KEY="maso4j4a6lketok2btjklanprnek7ndlcvr4rdu5u2udpbbi73na";
const SERVER_URL="https://kukasim.visualstudio.com/DefaultCollection";

var options = common.createOptions("/_apis/projects?api-version=1.0");


tfs.bug.listBugs();




