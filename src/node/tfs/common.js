let btoa=require('btoa');
let rp=require('request-promise');
const API_KEY="maso4j4a6lketok2btjklanprnek7ndlcvr4rdu5u2udpbbi73na";
const SERVER_URL="https://kukasim.visualstudio.com/DefaultCollection";

var common = function(){

}
common.prototype.request=function(url){

    var options = this.createOptions(url);
    return rp(options)
        .then(result=>{
            return JSON.parse(result);
        });

}

common.prototype.createOptions = function(url){


    var result={
            url: SERVER_URL+url,
            dataType: 'json',
            headers: {
                'Authorization': 'Basic ' + btoa("" + ":" +API_KEY)
            }
        };
        return result;
    
}

common.prototype.options = function(){
    var result={
            url: SERVER_URL+"/_apis/projects?api-version=1.0",
            dataType: 'json',
            headers: {
                'Authorization': 'Basic ' + btoa("" + ":" +API_KEY)
            }
        };
        return result;

}

module.exports=new common();